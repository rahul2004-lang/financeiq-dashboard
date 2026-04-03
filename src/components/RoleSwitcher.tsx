import { useFinanceStore } from "../stores/useFinanceStore";

export default function RoleSwitcher() {
  const { role, setRole } = useFinanceStore();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setRole("admin")}
        className={role === "admin" ? "bg-blue-500 text-white px-3 py-1" : "border px-3 py-1"}
      >
        Admin
      </button>

      <button
        onClick={() => setRole("viewer")}
        className={role === "viewer" ? "bg-blue-500 text-white px-3 py-1" : "border px-3 py-1"}
      >
        Viewer
      </button>
    </div>
  );
}