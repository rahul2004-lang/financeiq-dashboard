import { create } from "zustand";

type Transaction = {
  id: number;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
};

type Store = {
  transactions: Transaction[];
  role: "admin" | "viewer";
  addTransaction: (t: Transaction) => void;
  deleteTransaction: (id: number) => void;
  setRole: (role: "admin" | "viewer") => void;
};

// 🧾 Sample Data (used only if localStorage is empty)
const sampleData: Transaction[] = [
  {
    id: 1,
    type: "income",
    amount: 50000,
    category: "Salary",
    date: "2026-04-01",
  },
  {
    id: 2,
    type: "expense",
    amount: 5000,
    category: "Food",
    date: "2026-04-02",
  },
  {
    id: 3,
    type: "expense",
    amount: 12000,
    category: "Rent",
    date: "2026-04-03",
  },
  {
    id: 4,
    type: "income",
    amount: 8000,
    category: "Freelance",
    date: "2026-04-04",
  },
  {
    id: 5,
    type: "expense",
    amount: 2000,
    category: "Transport",
    date: "2026-04-05",
  },
];

export const useFinanceStore = create<Store>((set) => ({
  
  // ✅ Load from localStorage OR fallback to sample data
  transactions: JSON.parse(
    localStorage.getItem("tx") || JSON.stringify(sampleData)
  ),

  role: "admin",

  // ➕ Add Transaction
  addTransaction: (t) =>
    set((state) => {
      const updated = [...state.transactions, t];
      localStorage.setItem("tx", JSON.stringify(updated));
      return { transactions: updated };
    }),

  // ❌ Delete Transaction
  deleteTransaction: (id) =>
    set((state) => {
      const updated = state.transactions.filter((t) => t.id !== id);
      localStorage.setItem("tx", JSON.stringify(updated));
      return { transactions: updated };
    }),

  // 👤 Role Switch
  setRole: (role) => set({ role }),
}));