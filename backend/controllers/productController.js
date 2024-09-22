import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

//@route    /api/products?q='df'
//@desc     get all products
//@access   public
export const getAllProducts = asyncHandler(async (req, res) => {
    const per_page = 6;
    const page = Number(req.query.pageNumber) || 1;
    let query = '';
    query = req.query.q ? {
        name: {
            $regex: req.query.q,
            $options: 'i'
        }
    } : {};
    // const count = await Product.count({ ...query })
    const products = await Product.find({ ...query }).limit(per_page).skip(per_page * (page - 1));
    res.status(200).json({
        products,
        page,
        // pages: Math.ceil(count / per_page)
    })

});

