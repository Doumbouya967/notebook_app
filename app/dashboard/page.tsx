 "use client";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect , useState  } from "react";
import SignOut_app from "../../components/Signout_app";
import { collection, addDoc, query, where, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import NoteCard from "@/components/NoteCard"; // adapter le chemin selon ton projet




export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  const [notes, setNotes] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");




  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);



  // Récupérer les notes en temps réel
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotes(notesData);
    });

    return () => unsubscribe();
  }, [user]);


  const handleAddNote = async () => {
    if (!title || !content) return;

    await addDoc(collection(db, "notes"), {
      title,
      content,
      uid: user?.uid,
      createdAt: new Date()
    });

    setTitle("");
    setContent("");
  };

  const handleDeleteNote = async (id: string) => {
    await deleteDoc(doc(db, "notes", id));
  };

  const handleUpdateNote = async (id: string) => {
    const newContent = prompt("Nouveau contenu :");
    if (newContent) {
      await updateDoc(doc(db, "notes", id), { content: newContent });
    }
  };


  if (!user) return null;

  return (
    <div className="p-10">
     

      <div className="w-full flex justify-end mb-4">
        <div className="mb-4">
         <SignOut_app />
      </div>
    </div>


      <h1 className="text-4xl font-bold">Bienvenue, {user.email} 👋</h1>


        <hr  className="my-8"/>
       <h1 className="text-3xl font-bold mb-4">Mes notes</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Titre"
          className="border p-2 w-full mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Contenu"
          className="border p-2 w-full mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleAddNote} className="bg-blue-500 text-white px-4 py-2 rounded">
          Ajouter la note
        </button>
      </div>

          <div className="grid md:grid-cols-2 gap-4">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                onDelete={handleDeleteNote}
                onUpdate={async (id, newContent) =>
                  await updateDoc(doc(db, "notes", id), { content: newContent })
                }
              />
            ))}
          </div>
    </div>
  );
}
