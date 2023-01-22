import { StatusCodes } from "http-status-codes";
const errorMiddleware = async(err, req, res, next ) => {
 console.log(err);
 return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:'Something went wrong, Please try again.'})
}

export default errorMiddleware;