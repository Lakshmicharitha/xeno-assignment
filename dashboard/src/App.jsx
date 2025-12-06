import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function App() {
  const [loading, setLoading] = useState(true);
  // App.jsx (only relevant parts shown)
const [metrics, setMetrics] = useState({
  totalProducts: 0,    // <- added
  totalCustomers: 0,
  totalOrders: 0,
  revenue: 0,
  orderDates: [],
  topCustomers: []
});

const tenantId = 21;
const backendBase = "http://localhost:5000";

useEffect(() => {
  async function fetchMetrics() {
    try {
      const res = await axios.get(`${backendBase}/api/metrics/${tenantId}`);
      console.log("metrics response:", res.data);   // helpful debug log
      setMetrics(res.data);
    } catch (e) {
      console.error("Metrics error:", e.response?.data || e.message);
    } finally {
      setLoading(false);
    }
  }
  fetchMetrics();
}, [tenantId]);


  // -------------------------
  // ✅ YOUR chartData (same)
  // -------------------------
  const chartData = {
    labels: metrics.orderDates.map((d) => d.date),
    datasets: [
      {
        label: "Orders Per Day",
        data: metrics.orderDates.map((d) => d.count),
        borderColor: "#ffffff",          // ← CHANGED TO WHITE
        backgroundColor: "rgba(255,255,255,0.3)",
        tension: 0.3,
        borderWidth: 3
      }
    ]
  };

  // ----------------------------------------
  // ✅ ADDED chartOptions (THIS WAS MISSING)
  // ----------------------------------------
  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "white"   // ← text white
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "white"   // ← x-axis labels white
        },
        grid: {
          color: "rgba(255,255,255,0.2)"  // ← faint white lines
        }
      },
      y: {
        ticks: {
          color: "white"   // ← y-axis labels white
        },
        grid: {
          color: "rgba(255,255,255,0.2)"  // ← faint white lines
        }
      }
    }
  };

  return (
    <div className="wrapper">
      <h1 className="dashboard-title">Charitha — Shopify Dashboard✨</h1>

      <div className="cards-row">
        <StatCard title="Total Products" value={metrics.totalProducts} />
        <StatCard title="Total Customers" value={metrics.totalCustomers} />
        <StatCard title="Total Orders" value={metrics.totalOrders} />
        <StatCard title="Revenue" value={`₹${metrics.revenue}`} />
        <StatCard
          title="Avg Order Value"
          value={
            metrics.totalOrders
              ? `₹${(metrics.revenue / metrics.totalOrders).toFixed(2)}`
              : "₹0.00"
          }
        />
      </div>

      <div className="chartBox">
        {/* ---------- ADDED options={chartOptions} ----------- */}
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="statCard">
      <h3 className="statTitle">{title}</h3>
      <p className="statValue">{value}</p>
    </div>
  );
}