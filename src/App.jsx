import { useEffect, useState } from "react";
import axios from "axios";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import StreakGraph from "./components/StreakGraph";

const App = () => {
  const [goals, setGoals] = useState([]);
  const [streakData, setStreakData] = useState([]);

  const fetchGoals = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/goals");
      setGoals(data);
    } catch (error) {
      console.error("Failed to fetch goals:", error);
    }
  };

  const fetchGraphData = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/streaks");
      console.log("Updated graph data:", data);
      setStreakData(data.streaks); // Use the streaks array for the graph
    } catch (error) {
      console.error("Failed to fetch streak data:", error);
    }
  };
  
  useEffect(() => {
    fetchGoals();
    fetchGraphData();
  }, []);

  return (
    <div>
      <h1>Streak Tracker</h1>
      <GoalForm fetchGoals={fetchGoals} />
      <GoalList
        goals={goals}
        fetchGoals={fetchGoals}
        fetchGraphData={fetchGraphData}
      />
      <StreakGraph data={streakData} />
    </div>
  );
};

export default App;
