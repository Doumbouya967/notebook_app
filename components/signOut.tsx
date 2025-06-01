import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SignOut() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="signout"  />
      <Label htmlFor="signout">Deconnexion</Label>
    </div>
  )
}
