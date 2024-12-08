import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const StreakGraph = ({ data }) => {
  return (
    <div style={{ margin: "20px", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Daily Goal Completion Progress</h3>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
            }}
            labelStyle={{ fontWeight: "bold" }}
          />
          <Legend verticalAlign="top" height={36} />
          <Area
            type="monotone"
            dataKey="completionRate"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorCompletion)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StreakGraph;
