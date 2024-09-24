import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';


//@route    /api/products?q='df'
//@desc     get all products
//@access   public
export const getAllProducts = asyncHandler(async (req, res) => {
    const per_page = 8; // Number of products per page
    const page = Number(req.query.page) || 1; // Current page number
    const searchTerm = req.query.q.trim() || ''; // Search term from query parameter
  
    // Build the search query
    const query = searchTerm
      ? {
          name: {
            $regex: searchTerm,
            $options: 'i', // Case insensitive search
          },
        }
      : {};
  
    try {
      // Count total number of products matching the query
      const totalProducts = await Product.countDocuments({ ...query });
      
      // Find products with pagination
      const products = await Product.find({ ...query })
        .limit(per_page)
        .skip(per_page * (page - 1))
        .sort({sales:-1, views:-1});

      res.status(200).json({
        success: true,
        data: products,
        page,
        pages: Math.ceil(totalProducts / per_page), // Total number of pages
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching products.",
      });
    }
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

//@route    /api/products/:id/view
//@desc     PUT incremeentProductView
//@access   public
export const incremeentProductView = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    product.views = product.views + 1;
    await product.save();
    res.status(200).json({ success: true, msg: 'View count incremented' });
});
