import express from 'express';
import mongoose from 'mongoose';
import cron from 'node-cron';
import dotenv from 'dotenv';
import cors from 'cors';
import puppeteerExtra from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteer from 'puppeteer';
import fs from 'fs';
import fsPromises from 'fs/promises';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sharp from 'sharp'; // Added sharp for image conversion

// Load environment variables
dotenv.config();

// Puppeteer stealth plugin setup to avoid detection by anti-bot systems
puppeteerExtra.use(StealthPlugin());

// Express app setup
const app = express();
app.use(cors());
app.use(express.json());

// Directory setup for saving review profile images
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const IMAGE_DIR = path.join(__dirname, 'review_profile_images');

// Utility function to save a screenshot of the page
async function saveScreenshot(page, name) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filePath = `debug-screenshots/${name}-${timestamp}.png`;
  await fsPromises.mkdir('debug-screenshots', { recursive: true });
  await page.screenshot({ path: filePath, fullPage: true });
  console.log(`Screenshot saved: ${filePath}`);
}

// Utility function to save the page's HTML for debugging
async function saveHTML(page, name) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filePath = `debug-html/${name}-${timestamp}.html`;
  await fsPromises.mkdir('debug-html', { recursive: true });
  const content = await page.content();
  await fsPromises.writeFile(filePath, content);
  console.log(`HTML saved: ${filePath}`);
}

// Initialize and configure Puppeteer browser with custom settings
async function initializeBrowser() {
  return await puppeteerExtra.launch({
    headless: process.env.HEADLESS_MODE === 'true', // Use headless mode based on environment variable
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--window-position=0,0',
      '--ignore-certificate-errors',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1920,1080',
      '--lang=en-US,en',
      '--enable-automation', // To mimic human browser
      '--disable-blink-features=AutomationControlled', // Remove automation features that indicate bot behavior
    ],
  });
}

// Setup the Puppeteer page with a custom viewport and headers
async function setupPage(browser) {
  const page = await browser.newPage();
  
  // Set browser window size
  await page.setViewport({ width: 1920, height: 1080 });

  // Modify browser properties to avoid detection as a bot
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false }); // Prevent detection by setting 'navigator.webdriver' to false
  });
  await page.evaluateOnNewDocument(() => {
    window.navigator.chrome = {
      runtime: {},
      // Mock other properties to mimic Chrome
    };
  });
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] }); // Set navigator.languages to mimic a real browser
  });
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] }); // Mimic Chrome's plugins to avoid detection
  });

  // Set user-agent and referrer to simulate real browsing behavior
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0',
    'Referer': 'https://www.yelp.com/'
  });
  
  // Disable caching to avoid stale content
  await page.setCacheEnabled(false);

  // Override user agent to mimic non-headless browser
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'userAgent', {
      get: () => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0',
    });
  });

  // Intercept network requests to monitor resource loading
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet' || req.resourceType() === 'font') {
      req.abort(); // Block unnecessary resources to improve speed and reduce detection
    } else {
      req.continue();
    }
  });

  return page;
}

// Function to scrape reviews
async function scrapeReviews() {
  let browser;
  try {
    // Initialize browser and setup page
    browser = await initializeBrowser();
    const page = await setupPage(browser);

    // Navigate to Yelp page and perform scraping
    await navigateToYelpPage(page);

    // Extract review data (dummy implementation for now)
    console.log('Scraping reviews...');
    // Your review extraction logic goes here

    console.log('Scraping completed successfully.');
  } catch (error) {
    console.error('Error during scraping:', error);
  } finally {
    if (browser) {
      await browser.close(); // Ensure the browser is closed even if an error occurs
    }
  }
}

// Navigate to the Yelp page and perform auto-scrolling to load lazy-loaded content
async function navigateToYelpPage(page) {
  try {
    console.log('Navigating to Yelp page...');
    await page.goto(
      'https://www.yelp.com/biz/artisan-electrical-and-hvac-tracy-14?sort_by=date_desc#reviews',
      { waitUntil: 'domcontentloaded', timeout: 30000 }
    );

    // Inject the Yelp review script to ensure all reviews are loaded
    await page.evaluate(() => {
      const script = document.createElement('script');
      script.src = 'https://s3-media0.fl.yelpcdn.com/assets/public/Reviews.yji-8ced2c27440e96a0f807.chunk.mjs';
      document.body.appendChild(script);
    });

    // Auto-scroll the page to trigger lazy-loading of elements
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;

          // Stop scrolling once all content is loaded or after a reasonable scroll length
          if (totalHeight >= document.documentElement.scrollHeight || totalHeight > 1500) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });

    // Save page screenshot and HTML after scrolling
    await saveScreenshot(page, 'post-auto-scroll');
    await saveHTML(page, 'post-auto-scroll');
  } catch (error) {
    console.error('Error navigating to Yelp page:', error);
    throw error;
  }
}

// Main execution function to start the server and schedule scraping
(async () => {
  try {
    // MongoDB connection setup
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully.");

    // Ensure the directory for saving images exists
    await fsPromises.mkdir(IMAGE_DIR, { recursive: true });

    // Start the server and initialize scraping
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    // Perform the initial scraping process
    await scrapeReviews().catch((error) => console.error('Initial scrape error:', error));

    // Schedule regular scraping to run daily at midnight
    cron.schedule('0 0 * * *', async () => {
      try {
        await scrapeReviews();
      } catch (error) {
        console.error('Error during scheduled scraping:', error.message);
      }
    });
  } catch (error) {
    console.error('Error during initialization:', error);
    process.exit(1);
  }
})();
