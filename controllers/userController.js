const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const mongoose = require('mongoose');
const User = require('../models/User');

const getUserDetail = async (req, res,next) => {
try {
  const userDetail = await User.findById(req.user.userId,{password:0})
  res.status(StatusCodes.OK).json({
    userDetail
  });
} catch (error) {
  next(error)
}
  }

  const updateUser = async (req, res,next) => {
 
  try {
    const user = await User.findByIdAndUpdate(req.user.userId,req.body,{new:true});
    res.status(StatusCodes.OK).json({
      user: {
        email: user.email,
        lastName: user.lastName,
        location: user.location,
        name: user.name,
        description:user.description,
        age:user.age,
   
      },
    });
  } catch (error) {
    next(error)
  }
  };

module.exports = {
  getUserDetail,
  updateUser
};
