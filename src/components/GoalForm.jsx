import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const GoalForm = ({ fetchGoals }) => {
  const [goal, setGoal] = useState("");

  const addGoal = async () => {
    if (!goal.trim()) {
      alert("Goal description cannot be empty!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/goals", { description: goal });
      setGoal(""); // Clear the input field
      fetchGoals(); // Refresh the goal list
    } catch (error) {
      console.error("Failed to add goal:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <button onClick={addGoal}>Add Goal</button>
    </div>
  );
};
GoalForm.propTypes = {
  fetchGoals: PropTypes.func.isRequired,
};

export default GoalForm;
