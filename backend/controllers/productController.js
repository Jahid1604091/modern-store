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
        success: true,
        data: products,
        page,
        // pages: Math.ceil(count / per_page)
    })

});

//@route    /api/products/:id
//@desc     get product
//@access   public
export const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
        success: true,
        data: product,
    })
});
