 import StatCard from "../components/StatCard";
import TransactionBarChart from "../components/TransactionBarChart";
import SalesTrendChart from "../components/SalesTrendChart";

import {
  FaBoxes,
  FaShoppingCart,
  FaReceipt,
  FaWallet
} from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Fish POS Dashboard!</h2>
      <p className="dashboard-subtitle">
        Here's what's happening with your store today.
      </p>

      {/* KPI CARDS */}
      <div className="stat-grid">
        <StatCard
          title="Category / Stock"
          value="30 / 456 Kg"
          icon={<FaBoxes />}
          badge="+2.5%"
        />

        <StatCard
          title="Purchase"
          value="55 Kg / ₹48,000"
          icon={<FaShoppingCart />}
          badge="+1.58%"
        />

        <StatCard
          title="Sales"
          value="33 Kg / ₹43,000"
          icon={<FaReceipt />}
          badge="+0.9%"
        />

        <StatCard
          title="Today's Sales"
          value="₹165.89k"
          icon={<FaWallet />}
          badge="+3.2%"
        />
      </div>

      {/* CHARTS */}
      <div className="chart-grid">
        {/* <TransactionBarChart />
        <SalesTrendChart /> */}
      </div>
    </div>
  );
}
