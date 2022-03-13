const asyncHandler = require("express-async-handler");

const Goal = require('../model/goalModel')

//@desc    Get Goals
//@access  Private
//@route   GET /api/goals

const getGoals = async (req, res) => {
  const goals = await Goal.find()

  res.status(200).json(goals);
};
//@desc    Put a Goal
//@access  Private
//@route   POST /api/goals

const createGoal = async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add test");
  }

  const goal = await Goal.create({
    text: req.body.text
  })
  res.status(200).json(goal);
};
// This is a test of measles and dengue fever
//@desc    Update a Goal
//@access  Private
//@route   PUT /api/goals/:id

const updateGoal = async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal Not Found')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true} )

  res.status(200).json(updatedGoal);
};
//@desc    Delete a Goals
//@access  Private
//@route   DELETE /api/goals/:id

const deleteGoal = async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal Not Found')
  }

  await goal.remove()

  res.status(200).json({id: req.params.id});
};

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
