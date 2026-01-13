import { useState, useMemo } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Legend
// } from "recharts";

/* BASE DATA (NO TOTAL HERE) */
const todayBase = [
  { name: "Cash", current: 45000, previous: 38000 },
  { name: "UPI", current: 62000, previous: 55000 },
  { name: "Card", current: 38000, previous: 42000 }
];

const weeklyBase = [
  { name: "Cash", current: 210000, previous: 185000 },
  { name: "UPI", current: 320000, previous: 290000 },
  { name: "Card", current: 180000, previous: 165000 }
];

/* AUTO TOTAL CALCULATOR */
const addTotal = (data) => {
  const total = data.reduce(
    (acc, item) => {
      acc.current += item.current;
      acc.previous += item.previous;
      return acc;
    },
    { name: "Total", current: 0, previous: 0 }
  );

  return [...data, total];
};

export default function TransactionBarChart() {
  const [filter, setFilter] = useState("today");

  const data = useMemo(() => {
    const base = filter === "today" ? todayBase : weeklyBase;
    return addTotal(base);
  }, [filter]);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>
          {filter === "today"
            ? "Transactions"
            : "This Week vs Last Week"}
        </h3>

        <select
          className="chart-dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={data} barSize={28}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
          <Legend />

          <Bar
            dataKey="current"
            name={filter === "today" ? "Today" : "This Week"}
            fill="#ff6b35"
            radius={[8, 8, 0, 0]}
            animationDuration={900}
          />

          <Bar
            dataKey="previous"
            name={filter === "today" ? "Yesterday" : "Last Week"}
            fill="#e9977a"
            radius={[8, 8, 0, 0]}
            animationDuration={900}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
