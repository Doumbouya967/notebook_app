// pages/dashboard.tsx
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Bienvenue, {user.email} 👋</h1>
    </div>
  );
}
