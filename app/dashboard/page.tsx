 "use client";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect , useState  } from "react";
import SignOut_app from "../../components/Signout_app";
import { collection, query, where, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
// import NoteCard from "@/components/NoteCard"; // adapter le chemin selon ton projet
import EditPostModal from "@/components/EditPostModal";
import { toast } from "sonner"; // ✅ nouveau hook
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";


export default function Dashboard() {
  const { user , loading } = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState<any[]>([]);


useEffect(() => {
  if (!loading && !user) {
    router.push("/login");
  }
}, [user, loading]);

  // Récupérer les notes en temps réel
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "posts"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    });
    return () => unsubscribe();
  }, [user]);

  const handleDeletePost = async (id: string) => {
    await deleteDoc(doc(db, "posts", id));
  };

  const handleUpdatePost = async (id: string, data: any) => {
  try {
    await updateDoc(doc(db, "posts", id), data);
    toast.success("Publication mise à jour avec succès !");
  } catch (err) {
    toast.error("La mise à jour a échoué.");
  }
};

if (loading) return <div>Chargement...</div>;
if (!user) return null;

              return (
      <div className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Mes publications</h2>
        <SignOut_app />
      </div>

      <div className="flex items-end justify-end mb-8">
        <Link href="/create"> 
          <Button>
            Créer une publication
          </Button>
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
              <Card key={post.id} className="relative overflow-hidden shadow-none border rounded-xl ">
              <CardHeader className="p-2 relative ">
                {post.imageUrl ? (
                  <div className=" relative aspect-video w-full rounded-lg overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt="Post cover"
                      className="w-full h-full object-cover"
                    />              
                  </div>
                ) : (
                  <div className="aspect-video bg-muted rounded-lg w-full" />
                )}
              </CardHeader>

              <CardContent className="pt-4 pb-5">
              <div className="flex items-center justify-between">
                  <Badge className="capitalize">{post.category}</Badge>
                  <span className="text-muted-foreground text-sm">
                    {new Date(post.createdAt?.seconds * 1000).toLocaleDateString()}
                  </span>
              </div>

                <h3 className="mt-4 text-[1.35rem] font-semibold tracking-tight line-clamp-2">
                  {post.title}
                </h3>

                <div className="mt-6 flex items-center justify-between">
                 <div className="flex gap-2">
                      <EditPostModal
                        id={post.id}
                        title={post.title}
                        content={post.content}
                        imageUrl={post.imageUrl}
                        category={post.category}
                        onUpdate={handleUpdatePost}
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        Supprimer
                      </Button>
                    </div>

                
                </div>
              </CardContent>
            </Card>

        ))}
      </div>
    </div>
              );
            }
