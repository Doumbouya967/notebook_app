// pages/register.tsx

"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";



export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">

 <div className="w-1/4 mb-4">
         <Link href="/">
          <Button className="w-full max-w-xs bg-gray-600 mb-20">Retour</Button>
        </Link>
    </div> 


      <h1 className="text-3xl text-center font-bold mb-4">Créer un compte</h1>
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
      <button onClick={handleRegister} className="bg-blue-500 mt-8 text-white px-4 py-2 rounded">
        S'inscrire
      </button>
    </div>
  );
}




