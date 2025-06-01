import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation";

import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { toast } from "sonner";



export default function Signout_app() {

  const router = useRouter();


const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Déconnexion réussie 👋");
      router.push("/login");
    } catch (error: any) {
      toast.error("Erreur lors de la déconnexion ❌");
    }
  };


  return (
    <div className="flex items-center space-x-2">
      <Switch id="signout"  onClick={handleSignOut} />
      <Label htmlFor="signout"> Se déconnecter</Label>
    </div>
  )
}

