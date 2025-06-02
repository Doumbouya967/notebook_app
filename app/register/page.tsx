// pages/register.tsx

"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // ✅ nouveau hook
import { Input } from "@/components/ui/input";
import { db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";



export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [name, setName] = useState(""); // 🆕 nouveau champ





  const handleRegister = async () => {

      if (!email || !password || !name) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;     
      
       // 🔐 Enregistrer dans Firestore
      await setDoc(doc(db, "users", uid), {
        name,
        email,
        createdAt: new Date(),
      });
      toast.success("Compte créé avec succès 🎉");
      router.push("/dashboard");
    }
    catch (err) {
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


      <h1 className="text-3xl text-center font-bold mb-4">Créer un compte</h1>
      
      <Input
        type="text"
        placeholder="Nom complet"
        className="mb-2"
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Mot de passe"
        className="border p-2 w-full mb-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleRegister} className="bg-blue-500 mt-8 text-white px-4 py-2 rounded">
        S'inscrire
      </Button>
    </div>
  );
}




