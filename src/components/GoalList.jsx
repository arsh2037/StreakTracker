import { useState } from "react";
import axios from "axios";

const GoalList = ({ goals, fetchGoals, fetchGraphData }) => {
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [newDescription, setNewDescription] = useState("");

  const toggleCompletion = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/goals/${id}/toggle`);
      fetchGoals(); // Refresh goals list
      fetchGraphData(); // Update graph data
    } catch (error) {
      console.error("Failed to toggle goal completion:", error);
    }
  };

  const startEditing = (id, currentDescription) => {
    setEditingGoalId(id);
    setNewDescription(currentDescription);
  };

  const saveEdit = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/goals/${id}`, {
        description: newDescription,
      });
      setEditingGoalId(null); // Exit edit mode
      fetchGoals();
    } catch (error) {
      console.error("Failed to edit goal:", error);
    }
  };

  const deleteGoal = async (id) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      try {
        await axios.delete(`http://localhost:5000/goals/${id}`);
        fetchGoals();
        fetchGraphData(); // Update graph data after deletion
      } catch (error) {
        console.error("Failed to delete goal:", error);
      }
    }
  };

  return (
    <div>
      <h3>Your Goals</h3>
      <ul>
        {goals.map((goal) => (
          <li key={goal._id}>
            {editingGoalId === goal._id ? (
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            ) : (
              <span>
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => toggleCompletion(goal._id)}
                />
                {goal.description}
              </span>
            )}
            {editingGoalId === goal._id ? (
              <>
                <button onClick={() => saveEdit(goal._id)}>Save</button>
                <button onClick={() => setEditingGoalId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => startEditing(goal._id, goal.description)}>
                  Edit
                </button>
                <button onClick={() => deleteGoal(goal._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalList;
