import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

const all_products = [
    {
        _id:1,
        name:'Airpods Wirless Blutooth',
        image:'/image/airpods.jpg',
        description:'lorem2sdkfh sdhfjhdfk sdfjhsdkfjhsdf sdfjksdfkjdshfhdsuhfdsfdsjufsd',
        brand:"Apple",
        category:'Electronics',
        price:'660',
        countInStock:15,
        rating:4.5,
        numReviews:10
    },
    {
        _id:2,
        name:' Wirless Blutooth',
        image:'/image/airpods.jpg',
        description:'lorem2sdkfh sdhfjhdfk sdfjhsdkfjhsdf sdfjksdfkjdshfhdsuhfdsfdsjufsd',
        brand:"Apple",
        category:'Electronics',
        price:'660',
        countInStock:15,
        rating:4.5,
        numReviews:10
    },
    {
        _id:3,
        name:' Wirless ',
        image:'/image/airpods.jpg',
        description:'lorem2sdkfh sdhfjhdfk sdfjhsdkfjhsdf sdfjksdfkjdshfhdsuhfdsfdsjufsd',
        brand:"Apple",
        category:'Electronics',
        price:'660',
        countInStock:15,
        rating:4.5,
        numReviews:10
    },
    {
        _id:4,
        name:'Airpods Wirless Blutooth',
        image:'/image/airpods.jpg',
        description:'lorem2sdkfh sdhfjhdfk sdfjhsdkfjhsdf sdfjksdfkjdshfhdsuhfdsfdsjufsd',
        brand:"Apple",
        category:'Electronics',
        price:'660',
        countInStock:15,
        rating:4.5,
        numReviews:10
    },
    {
        _id:5,
        name:'Airpods Wirless Blutooth',
        image:'/image/airpods.jpg',
        description:'lorem2sdkfh sdhfjhdfk sdfjhsdkfjhsdf sdfjksdfkjdshfhdsuhfdsfdsjufsd',
        brand:"Apple",
        category:'Electronics',
        price:'660',
        countInStock:15,
        rating:4.5,
        numReviews:10
    },
    {
        _id:6,
        name:'Airpods Wirless Blutooth',
        image:'/image/airpods.jpg',
        description:'lorem2sdkfh sdhfjhdfk sdfjhsdkfjhsdf sdfjksdfkjdshfhdsuhfdsfdsjufsd',
        brand:"Apple",
        category:'Electronics',
        price:'660',
        countInStock:15,
        rating:4.5,
        numReviews:10
    },
    {
        _id:7,
        name:'Airpods Wirless Blutooth',
        image:'/image/airpods.jpg',
        description:'lorem2sdkfh sdhfjhdfk sdfjhsdkfjhsdf sdfjksdfkjdshfhdsuhfdsfdsjufsd',
        brand:"Apple",
        category:'Electronics',
        price:'660',
        countInStock:15,
        rating:4.5,
        numReviews:10
    },
]

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
        products:all_products,
        page,
        // pages: Math.ceil(count / per_page)
    })

});

