import { PieChart, Pie, Tooltip } from "recharts";
import { useFinanceStore } from "../stores/useFinanceStore";

export default function Charts() {
  const { transactions } = useFinanceStore();

  const data = transactions.map((t) => ({
    name: t.category,
    value: t.amount,
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie data={data} dataKey="value" outerRadius={100} />
      <Tooltip />
    </PieChart>
  );
}