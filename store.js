import express from 'express';
import connectDB from './db/connect.js';
import dotenv from 'dotenv';
dotenv.config();
import errorHanderMiddleware from './middlewares/not-found.js';
import errorMiddleware from './middlewares/error-handler.js';
import productsRouter from './routes/products.js';
import expressAsyncErrors from 'express-async-errors';
const app = express();
// express middleware
app.use(express.json());
app.use(errorHanderMiddleware);
app.use(errorMiddleware);
// BASE PATH
app.use('/api/v1/products', productsRouter);
const PORT  = process.env.PORT || 5000;
const starter = async () => {
 try {
  return await connectDB(process.env.CONNECTIONSTRING_MOUNGO_URL),
  app.listen(PORT,() => {
   console.log(`Server is listening on ${PORT}... `);
  });
 } catch(error) {
  console.log({msg:error});
 }
}
starter();
