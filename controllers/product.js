import { StatusCodes } from "http-status-codes"
import storeItems from '../models/product.js';
export const getAllProductsStatic = async(req, res) => {
  const search = 'ab';
 const products = await storeItems.find({name:{$regex:search,$options:'i'},
}).select('name price').limit(4);
 res.status(StatusCodes.OK).json({products});
}

export const getAllProducts = async(req, res) => {
 // let our users filter our data using specific info e.g featured, company, name, rating among others.
 const { featured, company, name, price, rating, createdAt, sort, feilds, numericFilters } = req.query;
 const queryObject = {};
 // handling the featured property from the api
 if(featured) {
  queryObject.featured = featured === 'true' ? true : false;
 }
 // handle the company property from the api.
 if(company) {
  queryObject.company = company;
 }
 // name functionality
 if(name) {
  queryObject.name = {$regex:name,$options:'i'};
 }
 // filter by name
 if(price)  {
  queryObject.price = price;
 }
 // filter by rating
 if(rating) {
  queryObject.rating = rating;
 }
 // filter by createdAt;
 if(createdAt) {
  queryObject.createdAt = createdAt;
 }
  // sort();
 // Let's sort out our application;
 let result = storeItems.find(queryObject);
 if(sort) {
  const sortList = sort.split(',').join(' ');
  result = result.sort(sortList);
 } else {
  result = result.sort('createdAt');
 }

 // feilds
 if(feilds) {
  const feildsList = feilds.split(',').join(' ');
  result = result.select(feildsList);
 }
 // setting up the pagination using limit() and skip();
 const page = Number(req.query.page) || 1;
 const limit = Number(req.query.limit) || 10;
 const skip = (page - 1) * limit;
 result = result.skip(skip).limit(limit);
 // 23
 // numericFilters 
 if(numericFilters) {
  const operatorMap = {
   '>': '$gt',
   '>=': '$gte',
   '=': '$eq',
   '<': '$lt',
   '<=': '$lte',
  }
  const regEx = /\b(<|>|>=|=|<|<=)\b/g;
  let filters = numericFilters.replace(
    regEx,
    (match) => `-${operatorMap[match]}-`
  );
  const options = ['price', 'rating'];
  filters = filters.split(',').forEach((item) => {
   const [feild, operator, value] = item.split('-');
   if(options.includes(feild)) {
    queryObject[feild] = {[operator]:Number(value)}
   }
  })
 }
 const products = await storeItems.find(queryObject);
 res.status(StatusCodes.OK).json({products,nbHits:products.length});
};