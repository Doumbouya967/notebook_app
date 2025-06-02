// pages/create.tsx

"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // ✅ nouveau hook
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";


export default function CreatePostPage() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [imageUrl, setImageUrl] = useState("");

  const router = useRouter();

const handleSubmit = async () => {
  if (!title || !content || !category) {
    toast.error("Veuillez remplir tous les champs.");
    return;
  }

  try {
    await addDoc(collection(db, "posts"), {
      title,
      content,
      category,
      imageUrl,
      uid: user?.uid,
      createdAt: new Date(),
    });
    toast.success("Publication réussie ✨");
    router.push("/dashboard");
  } catch (error) {
    toast.error(error.message || "Une erreur s'est produite lors de la publication.");
  }
};


  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Créer une publication</h1>

      <Input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4"
      />

      <Textarea
        placeholder="Contenu..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-4 min-h-[120px]"
      />

      <Input
        type="text"
        placeholder="Lien de l'image (optionnel)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="mb-4"
      />

      <Select defaultValue={category} onValueChange={setCategory}>
        <SelectTrigger className="mb-4">
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="general">Général</SelectItem>
          <SelectItem value="technology">Technologie</SelectItem>
          <SelectItem value="design">Design</SelectItem>
          <SelectItem value="education">Éducation</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={handleSubmit}>Publier</Button>
    </div>
  );
}
