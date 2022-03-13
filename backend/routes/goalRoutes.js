const express = require("express");
const router = express.Router();
const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalControllers");

const { protect } = require('../middleware/authMiddleware')

router.route("/").get(protect, getGoals).post(protect, createGoal);
router.route("/:id").delete(protect, deleteGoal).put(protect, updateGoal);

module.exports = router;
