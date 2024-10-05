import express from 'express';
import mongoose from 'mongoose';
import cron from 'node-cron';
import dotenv from 'dotenv';
import cors from 'cors';
import puppeteer from 'puppeteer'; // Import Puppeteer
import { MongoClient, ServerApiVersion } from 'mongodb'; // Corrected import

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Mongoose MongoDB connection (for handling reviews)
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Review Schema
const reviewSchema = new mongoose.Schema({
  name: String,
  text: String,
  rating: Number,
  date: String,
  photo: String,
});

const Review = mongoose.model('Review', reviewSchema);
const FallbackReview = mongoose.model('FallbackReview', reviewSchema); // Backup reviews

// MongoDB Client Integration (corrected to import)
const uri = "mongodb+srv://Artisan_Summykai:(vXWu%3F4njWBexWk1m7%5Dd@testimonialsdb.lfz9p.mongodb.net/?retryWrites=true&w=majority&appName=TestimonialsDB";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error("MongoClient connection error:", err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

// --- Existing Puppeteer and Scraping Logic --- //

// Function to initialize Puppeteer and launch the browser
async function initializeBrowser() {
  const browser = await puppeteer.launch({ headless: true }); // Set to false for debugging
  const page = await browser.newPage();
  return { browser, page };
}

// Function to extract review data using XPath
async function extractReviewData(page, reviewXPath) {
  try {
    const name = await page.$eval(
      `${reviewXPath}/div/div[2]/div/div[1]/span/a`,
      (el) => el.innerText
    ).catch(() => 'Anonymous');

    const reviewText = await page.$eval(
      `${reviewXPath}/div/div[3]/p/span`,
      (el) => el.innerText
    ).catch(() => 'No review text available.');

    const ratingHandle = await page.$x(
      `${reviewXPath}/div/div[2]/div/div[1]/span/div`
    );
    const rating = await ratingHandle[0]
      .evaluate((el) => el.getAttribute('aria-label'))
      .catch(() => 'No rating available.');

    const photoHandle = await page.$x(
      `${reviewXPath}/div/div[1]/div/div[1]/div/div/div[1]/div/a/img`
    );
    const photo = await photoHandle[0]
      .evaluate((el) => el.src)
      .catch(() => 'No photo available.');

    const dateHandle = await page.$x(
      `${reviewXPath}/div/div[2]/div/div[2]/span`
    );
    const date = await dateHandle[0]
      .evaluate((el) => el.innerText)
      .catch(() => 'No date available.');

    return {
      name,
      text: reviewText,
      rating: rating.match(/\d+/)[0], // Extract numeric rating from aria-label
      date,
      photo,
    };
  } catch (error) {
    console.error(`Error extracting data from XPath ${reviewXPath}:`, error);
    return null;
  }
}

// Main function to scrape reviews from Yelp
async function scrapeReviews() {
  const { browser, page } = await initializeBrowser();

  try {
    // Navigate to the Yelp reviews page (sorted by newest first)
    await page.goto(
      'https://www.yelp.com/biz/artisan-electrical-and-hvac-tracy-14?sort_by=date_desc#reviews'
    );

    // Wait for the first review to load
    await page.waitForXPath('//ul/li[1]', { timeout: 5000 });

    const reviews = [];
    for (let i = 1; i <= 3; i++) {
      const reviewXPath = `/html/body/yelp-react-root/div[1]/div[6]/div/div[1]/div[1]/main/div[4]/div/section/div[2]/ul/li[${i}]`;

      const reviewData = await extractReviewData(page, reviewXPath);
      if (reviewData) reviews.push(reviewData);
    }

    // Save scraped reviews to MongoDB and fallback collection
    await Review.deleteMany({}); // Clear existing reviews
    await Review.insertMany(reviews);

    // Also update the fallback reviews
    await FallbackReview.deleteMany({});
    await FallbackReview.insertMany(reviews);

    console.log('Reviews updated successfully');
  } catch (error) {
    console.error('Error during the scraping process:', error);
  } finally {
    await browser.close();
  }
}

// Function to fetch reviews (and fallback to backup if needed)
async function getReviews() {
  let reviews = await Review.find().limit(3);

  if (reviews.length < 3) {
    console.warn('Insufficient reviews, falling back to backup.');
    const fallbackReviews = await FallbackReview.find().limit(3);
    
    // Fill any gaps with fallback reviews
    reviews = [...reviews, ...fallbackReviews].slice(0, 3);
  }

  return reviews;
}

// API endpoint to get reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await getReviews();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews.' });
  }
});

// Schedule the scraping task to run every day at midnight
cron.schedule('0 0 * * *', () => {
  scrapeReviews().catch((error) =>
    console.error('Error during the scheduled scraping:', error)
  );
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Run initial scrape on server startup
scrapeReviews().catch((error) => console.error('Initial scrape error:', error));
