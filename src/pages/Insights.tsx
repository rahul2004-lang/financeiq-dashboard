import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useFinanceStore } from "../stores/useFinanceStore";
import SummaryCards from "../components/SummaryCards";
import { formatCurrency } from "../utils/formatCurrency";

export default function Insights() {
  const { transactions } = useFinanceStore();

  // 🎨 Colors
  const COLORS = ["#4ade80", "#f87171", "#60a5fa", "#facc15", "#a78bfa"];

  // 🥧 Category Data (with colors)
  const categoryMap: any = {};

  transactions.forEach((t) => {
    if (!categoryMap[t.category]) {
      categoryMap[t.category] = 0;
    }
    categoryMap[t.category] += t.amount;
  });

  const categoryData = Object.keys(categoryMap).map((key, index) => ({
    name: key,
    value: categoryMap[key],
    fill: COLORS[index % COLORS.length],
  }));

  // 📊 Income vs Expense
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const barData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  // 🧠 Percentage Label for Pie
 const renderCustomLabel = (props: any) => {
  const percent = props?.percent ?? 0;
  return `${(percent * 100).toFixed(0)}%`;
};

  return (
    <div className="p-6">
      
      {/* 🔥 Summary Cards */}
      <SummaryCards />

      {/* 📊 Charts */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* 🥧 PIE CHART */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col md:flex-row items-center gap-6 w-full">
          
          <div className="w-full md:w-1/2 h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  outerRadius={100}
                  label={renderCustomLabel}
                  isAnimationActive={true}
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 📊 Legend */}
          <div className="space-y-2 w-full md:w-1/2">
            <h3 className="font-semibold mb-2">Category Breakdown</h3>

            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: item.fill }}
                />

                <span>
                  {item.name} - {formatCurrency(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 📊 BAR CHART */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow w-full">
          <h2 className="text-lg mb-4">Income vs Expense</h2>

          <div className="w-full h-[300px]">
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar
                  dataKey="value"
                  label={{
                    position: "top",
                    formatter: (value: any) => formatCurrency(Number(value)),
                  }}
                  isAnimationActive={true}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}