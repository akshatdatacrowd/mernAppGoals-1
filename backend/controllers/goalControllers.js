const asyncHandler = require("express-async-handler");

const Goal = require('../model/goalModel')
const User = require('../model/userModel')

//@desc    Get Goals
//@access  Private
//@route   GET /api/goals
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({user: req.user.id})

  res.status(200).json(goals);
});


//@desc    Put a Goal
//@access  Private
//@route   POST /api/goals
const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add test");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  })
  res.status(200).json(goal);
});


//@desc    Update a Goal
//@access  Private
//@route   PUT /api/goals/:id
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal Not Found')
  }

  const user = await User.findById(req.user.id)
  //Check for User
  if (!user) {
    res.status(401)
    throw new Error('User Not Found')
  }
  // Verify that loggid in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true} )

  res.status(200).json(updatedGoal);
});


//@desc    Delete a Goals
//@access  Private
//@route   DELETE /api/goals/:id
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal Not Found')
  }
  const user = await User.findById(req.user.id)
  //Check for User
  if (!user) {
    res.status(401)
    throw new Error('User Not Found')
  }
  // Verify that loggid in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.remove()

  res.status(200).json({id: req.params.id});
});

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
