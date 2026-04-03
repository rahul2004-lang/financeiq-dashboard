import { useFinanceStore } from "../stores/useFinanceStore";
import { formatCurrency } from "../utils/formatCurrency";

export default function SummaryCards() {
  const { transactions } = useFinanceStore();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-6">
      <div className="p-6 rounded-2xl shadow bg-green-100 dark:bg-green-900">
        <p>Income</p>
        <h2 className="text-2xl font-bold">
          {formatCurrency(income)}
        </h2>
      </div>

      <div className="p-6 rounded-2xl shadow bg-red-100 dark:bg-red-900">
        <p>Expense</p>
        <h2 className="text-2xl font-bold">
          {formatCurrency(expense)}
        </h2>
      </div>

      <div className="p-6 rounded-2xl shadow bg-yellow-100 dark:bg-yellow-900">
        <p>Balance</p>
        <h2 className="text-2xl font-bold">
          {formatCurrency(balance)}
        </h2>
      </div>
    </div>
  );
}