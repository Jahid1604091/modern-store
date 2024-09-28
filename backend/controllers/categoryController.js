import asyncHandler from "../middleware/asyncHandler.js";
import Category from "../models/categoryModel.js";
import slugify from 'slugify';
import ErrorResponse from "../utils/errorresponse.js";

//@route    /api/categories/admin
//@desc     POST: create a new category
//@access   protected by admin
export const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const slug = slugify(name, '-');
    const category = new Category({ name, slug });
    const newCategory = await category.save();
    return res.status(200).json({
        success: true,
        message: "Category created successfully!",
        data: newCategory
    });
})


//@route    /api/categories
//@desc     GET:fetch all categories
//@access   public
export const getCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.find({}).select('_id name slug');
    if (!categories) {
        return next(new ErrorResponse('No Category Found!', 404));
    }
    return res.status(200).json({
        success: true,
        message: "Category fetched successfully!",
        data: categories
    });
})


//@route    /api/categories/admin/:id
//@desc     DELETE: delete a category
//@access   protected by admin
export const deleteCategory = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const category = await Category.findById(id);

    if (!category) {
        return next(new ErrorResponse('No Category Found to Delete!', 404));
    }

    //update table
    category.isSoftDeleted = true;
    category.softDeletedAt = Date.now();
    category.deletedBy = req.user._id;

    await category.save();

    return res.status(200).json({
        success: true,
        message: "Category deleted successfully!",
        data: category
    });
})