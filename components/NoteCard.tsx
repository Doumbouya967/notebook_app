// components/NoteCard.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
import { useState } from "react";

type NoteCardProps = {
  id: string;
  title: string;
  content: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newContent: string) => void;
};

export default function NoteCard({ id, title, content, onDelete, onUpdate }: NoteCardProps) {
  const [newContent, setNewContent] = useState(content);

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{content}</p>

        <div className="flex gap-3 mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Modifier</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modifier la note</DialogTitle>
              </DialogHeader>
              <Textarea
                className="min-h-[100px]"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <Button
                onClick={() => onUpdate(id, newContent)}
                className="mt-2 w-full"
              >
                Enregistrer
              </Button>
            </DialogContent> 
          </Dialog>

          <Button variant="destructive" onClick={() => onDelete(id)}>
            Supprimer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
