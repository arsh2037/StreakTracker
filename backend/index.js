const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://arshhasan68:jtiZ1frHYubR5SCB@cluster0.amu8y8b.mongodb.net/StreakTracker").then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error.message);
});

// Goal Schema
const goalSchema = new mongoose.Schema({
  description: String,
  completed: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

const Goal = mongoose.model("Goal", goalSchema);

// Endpoints
app.get("/goals", async (req, res) => {
  const goals = await Goal.find();
  res.json(goals);
});

app.post("/goals", async (req, res) => {
    try {
  const goal = new Goal(req.body);
  await goal.save();
  res.json(goal);
  console.log("Goal added");
} catch (error) {
  console.error("Error adding goal:", error.message);
  res.status(500).json({ error: "Error adding goal" });
  }
});
app.patch("/goals/:id/toggle", async (req, res) => {
    try {
      const goal = await Goal.findById(req.params.id);
      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }
  
      goal.completed = !goal.completed; // Toggle the `completed` field
      await goal.save();
  
      res.json(goal);
    } catch (error) {
      res.status(500).json({ message: "Failed to toggle goal completion", error });
    }
  });
  
  app.delete("/goals/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      await Goal.findByIdAndDelete(id);
      res.status(204).send(); // No content response for successful deletion
    } catch (error) {
      res.status(500).json({ message: "Failed to delete goal", error });
    }
  });
  

app.get("/streaks", async (req, res) => {
    const goals = await Goal.find();
  
    const streakData = goals.reduce((acc, goal) => {
      const date = goal.date.toISOString().split("T")[0];
      if (!acc[date]) acc[date] = { date, total: 0, completed: 0 };
      acc[date].total++;
      if (goal.completed) acc[date].completed++;
      return acc;
    }, {});
  
    const streaks = Object.values(streakData).map(({ date, total, completed }) => ({
      date,
      completionRate: Math.round((completed / total) * 100),
    }));
  
    // Calculate streak (consecutive days with 100% completion)
    let streak = 0;
    let currentStreak = 0;
    streaks.forEach(({ completionRate }) => {
      if (completionRate === 100) {
        currentStreak++;
        streak = Math.max(streak, currentStreak);
      } else {
        currentStreak = 0;
      }
    });
  
    res.json({ streaks, maxStreak: streak });
  });
  
  

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});