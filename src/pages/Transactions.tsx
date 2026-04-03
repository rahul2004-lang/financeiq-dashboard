import { useState } from "react";
import { useFinanceStore } from "../stores/useFinanceStore";
import { formatCurrency } from "../utils/formatCurrency";
import SummaryCards from "../components/SummaryCards";
//import { formatCurrency } from "../utils/formatCurrency";


export default function Transactions() {
  const { transactions, deleteTransaction, role } = useFinanceStore();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // 🔍 Filter Logic
  const filteredData = transactions.filter((t) => {
    const matchesSearch = t.category
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ? true : t.type === filter;

    return matchesSearch && matchesFilter;
  });

  // 📤 CSV Export
  const exportCSV = () => {
    const rows = transactions.map(
      (t) => `${t.type},${t.amount},${t.category},${t.date}`
    );

    const csvContent =
      "Type,Amount,Category,Date\n" + rows.join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  return (
  <div className="p-6">

    {/* 🔥 Summary Cards */}
    <SummaryCards />

    <h2 className="text-xl mb-4 font-semibold">Transactions</h2>

    {/* 🔍 Search + Filter + Export */}
    <div className="flex flex-wrap gap-4 mb-4 items-center">
      <input
        placeholder="Search category..."
        className="border p-2 rounded w-48"
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border p-2 rounded"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <button
        onClick={exportCSV}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Export CSV
      </button>
    </div>

    {/* 📋 Table */}
    <div className="overflow-x-auto rounded shadow">
      <table className="w-full border bg-white dark:bg-gray-800">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="p-2">Type</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Category</th>
            <th className="p-2">Date</th>
            {role === "admin" && <th className="p-2">Action</th>}
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((t) => (
              <tr
                key={t.id}
                className="text-center border-t hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="p-2 capitalize">{t.type}</td>
                <td className="p-2">
                  {formatCurrency(t.amount)}
                </td>
                <td className="p-2">{t.category}</td>
                <td className="p-2">{t.date}</td>

                {role === "admin" && (
                  <td className="p-2">
                    <button
                      onClick={() => deleteTransaction(t.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-4 text-center">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);
}