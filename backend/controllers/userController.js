import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js';
import ErrorResponse from "../utils/errorresponse.js";

//@route    /api/users/register
//@desc     register a user
//@access   public
export const register = asyncHandler(async (req, res, next) => {
    const isExist = await User.findOne({ email: req.body.email });
    if (isExist) {
        return next(new ErrorResponse('User Already Exist', 400));
    }
    const user = await User.create(req.body);
    if (user) {
        return res.status(201).json({
            success: true,
            data: user,
            token: user.getSignedJwtToken()
        });
    }
    else {
        return next(new ErrorResponse('Invalid Data', 400));
    }
})

//@desc     get auth user
//@route    POST     /api/users/login
//@access   public
export const login = asyncHandler(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });
    if (user && (await user.matchPassword(req.body.password))) {
        return res.status(200).json({
            success: true,
            data: user,
            token: user.getSignedJwtToken()
        });

    }
    else {
        return next(new ErrorResponse(`Invalid email or password`, 401));
    }
});