import slugify from 'slugify';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import path from 'path';
import fs from 'fs';
import Category from '../models/categoryModel.js';
import Brand from '../models/brandModel.js';
import ErrorResponse from '../utils/errorresponse.js';

//@route    /api/products?q='df'
//@desc     get all products
//@access   public
export const getAllProducts = asyncHandler(async (req, res) => {
  const per_page = 8; // Number of products per page
  const page = Number(req.query.page) || 1; // Current page number
  const searchTerm = req.query.q ? req.query.q.trim() : ''; // Search term from query parameter

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
      .populate('brand', 'name')
      .populate('category', 'name')
      .limit(per_page)
      .skip(per_page * (page - 1))
      .sort({ sales: -1, views: -1 });

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

//------------------- A D M I N------------------------
//@route    /api/products/admin
//@desc     POST: create a new product
//@access   protected by admin
export const createProduct = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No image file uploaded!',
    });
  }

  const { name, description, brand, category, price, countInStock } = req.body;

  // Check if the category exists and is not soft-deleted
  const existingCategory = await Category.findOne({ _id: category, isSoftDeleted: false });
  if (!existingCategory) {
    return res.status(404).json({
      success: false,
      message: 'Category not found or it has been soft-deleted!'
    });
  }

  // Check if the brand exists and is not soft-deleted
  const existingBrand = await Brand.findOne({ _id: brand, isSoftDeleted: false });
  if (!existingBrand) {
    return res.status(404).json({
      success: false,
      message: 'Brand not found or it has been soft-deleted!'
    });
  }

  const slug = slugify(name, '-');

  //check if brand or category exists or not softdeleted
  const product = new Product({
    name,
    slug,
    image: req.file.path,
    description,
    brand,
    category,
    price,
    countInStock
  });
  const newProduct = await product.save();
  return res.status(200).json({
    success: true,
    message: "Product created successfully!",
    data: newProduct
  });
})

//@route    /api/products/admin/:id
//@desc     DELETE: delete a product
//@access   protected by admin
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorResponse('No Product Found to Delete!', 404));
  }

  //if we need to delete permanently
  // Delete the product image from the server
  // const __dirname = path.resolve();
  // const imagePath = path.join(__dirname, product.image);

  // fs.unlink(imagePath, (err) => {
  //   if (err) {
  //     console.error(`Failed to delete image: ${imagePath}`, err);
  //     return next(new ErrorResponse('Failed to delete product image.', 500));
  //   }
  // });

  //update table
  product.isSoftDeleted = true;
  product.softDeletedAt = Date.now();
  product.deletedBy = req.user._id;


  await product.save();

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully!",
    data: product
  });
})