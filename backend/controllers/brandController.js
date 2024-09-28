import asyncHandler from "../middleware/asyncHandler.js";
import slugify from 'slugify';
import ErrorResponse from "../utils/errorresponse.js";
import Brand from "../models/brandModel.js";

//@route    /api/brands/admin
//@desc     POST: create a new brand
//@access   protected by admin
export const createBrand = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const slug = slugify(name, '-');
    const brand = new Brand({ name, slug });
    const newbrand = await brand.save();
    return res.status(200).json({
        success: true,
        message: "Brand created successfully!",
        data: newbrand
    });
})


//@route    /api/brands
//@desc     GET:fetch all brands
//@access   public
export const getBrands = asyncHandler(async (req, res, next) => {
    const brands = await Brand.find({}).select('_id name slug');
    if (!brands) {
        return next(new ErrorResponse('No brand Found!', 404));
    }
    return res.status(200).json({
        success: true,
        message: "Brand fetched successfully!",
        data: brands
    });
})


//@route    /api/brands/admin/:id
//@desc     DELETE: delete a brand
//@access   protected by admin
export const deleteBrand = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const brand = await Brand.findById(id);

    if (!brand) {
        return next(new ErrorResponse('No Brand Found to Delete!', 404));
    }

    //update table
    brand.isSoftDeleted = true;
    brand.softDeletedAt = Date.now();
    brand.deletedBy = req.user._id;

    await brand.save();

    return res.status(200).json({
        success: true,
        message: "Brand deleted successfully!",
        data: brand
    });
})