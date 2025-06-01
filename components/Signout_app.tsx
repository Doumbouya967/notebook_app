import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";



export default function Signout_app() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="signout"  onClick={() => signOut(auth)} />
      <Label htmlFor="signout"> Se déconnecter</Label>
    </div>
  )
}

