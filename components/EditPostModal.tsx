"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type Props = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  onUpdate: (id: string, data: any) => void;
};

export default function EditPostModal({
  id,
  title,
  content,
  imageUrl,
  category,
  onUpdate,
}: Props) {
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const [newImage, setNewImage] = useState(imageUrl);
  const [newCategory, setNewCategory] = useState(category);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Modifier</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier la publication</DialogTitle>
        </DialogHeader>

        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Titre"
          className="mb-2"
        />
        <Textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Contenu"
          className="mb-2"
        />
        <Input
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
          placeholder="Lien image"
          className="mb-2"
        />
        <Select value={newCategory} onValueChange={setNewCategory}>
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

        <Button
          onClick={() =>
            onUpdate(id, {
              title: newTitle,
              content: newContent,
              imageUrl: newImage,
              category: newCategory,
            })
          }
        >
          Enregistrer les modifications
        </Button>
      </DialogContent>
    </Dialog>
  );
}
