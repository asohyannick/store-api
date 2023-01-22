import dotenv from 'dotenv';
dotenv.config();
import connectDB from './db/connect.js';
import storeItems from './models/product.js';
import jsonProducts from './products.json' assert { type: "json" };
const start = async () => {
 try {
  await connectDB(process.env.CONNECTIONSTRING_MOUNGO_URL);
  await storeItems.create(jsonProducts);
  console.log('Successfully populated my DB...');
  // exist 0 means we are successful;
  process.exit(0);
 } catch(error) {
  console.log(error);
  // exist 1 means we got some bugs to fix.
  process.exit(1);
 }
}

start();