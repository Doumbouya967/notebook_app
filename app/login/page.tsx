// pages/login.tsx

"use client";
 

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";



export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {

    if (!email || !password) {
      toast.warning("Veuillez remplir tous les champs.");
      return;
    }


    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Connexion réussie 🔐");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
 <div className="w-1/4 mb-4">
         <Link href="/">
          <Button className="w-full max-w-xs bg-gray-600 mb-20">Retour</Button>
        </Link>
    </div>



      <h1 className="t font-bold mb-4 text-center text-3xl">Connexion</h1>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-5"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className="border p-2 w-full mb-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-green-500 mt-8 text-white px-4 py-2 rounded">
        Se connecter
      </button>
    </div>
  );
}


