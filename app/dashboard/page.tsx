 "use client";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SignOut_app from "../../components/Signout_app";




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
     

      <div className="w-full flex justify-end mb-4">
        <div className="w-1/4 mb-4">
         <SignOut_app />
      </div>
    </div>


      <h1 className="text-xl font-bold">Bienvenue, {user.email} 👋</h1>
    </div>
  );
}
