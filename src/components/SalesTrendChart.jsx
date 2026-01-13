import { useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid
// } from "recharts";

/* SAMPLE POS DATA */
const hourlyData = [
  { time: "9 AM", sales: 12000 },
  { time: "10 AM", sales: 18000 },
  { time: "11 AM", sales: 26000 },
  { time: "12 PM", sales: 34000 },
  { time: "1 PM", sales: 42000 },
  { time: "2 PM", sales: 38000 },
  { time: "3 PM", sales: 30000 }
];

const dailyData = [
  { time: "Mon", sales: 210000 },
  { time: "Tue", sales: 235000 },
  { time: "Wed", sales: 260000 },
  { time: "Thu", sales: 245000 },
  { time: "Fri", sales: 310000 },
  { time: "Sat", sales: 350000 },
  { time: "Sun", sales: 390000 }
];

export default function SalesTrendChart() {
  const [view, setView] = useState("hourly");

  const data = view === "hourly" ? hourlyData : dailyData;

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Sales Trend</h3>

        <select
          className="chart-dropdown"
          value={view}
          onChange={(e) => setView(e.target.value)}
        >
          <option value="hourly">Today (Hourly)</option>
          <option value="daily">Last 7 Days</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
            animationDuration={900}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
