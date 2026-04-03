import { useState } from "react";
import { useFinanceStore } from "../stores/useFinanceStore";

export default function AddTransaction() {
  const addTransaction = useFinanceStore((s) => s.addTransaction);

  const [form, setForm] = useState({
    type: "income",
    amount: "",
    category: "",
    date: "",
  });

  const handleSubmit = () => {
    addTransaction({
      id: Date.now(),
      type: form.type as "income" | "expense",
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
    });
  };

  return (
    <div className="p-4">
      <input placeholder="Amount" onChange={(e) => setForm({...form, amount: e.target.value})} />
      <input placeholder="Category" onChange={(e) => setForm({...form, category: e.target.value})} />
      <input type="date" onChange={(e) => setForm({...form, date: e.target.value})} />

      <select onChange={(e) => setForm({...form, type: e.target.value})}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}