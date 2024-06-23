// import { login, signup } from "./actions";

// export default function LoginPage() {
//   return (
//     <form>
//       <label htmlFor="email">Email:</label>
//       <input id="email" name="email" type="email" required />
//       <label htmlFor="password">Password:</label>
//       <input id="password" name="password" type="password" required />
//       <button formAction={login}>Log in</button>
//       <button formAction={signup}>Sign up</button>
//     </form>
//   );
// }
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center">Login or Sign up</h1>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="block mb-2">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="password" className="block mb-2">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="default"
              formAction={login}
              className="w-full mr-4"
            >
              Log in
            </Button>
            <Button variant="outline" formAction={signup} className="w-full">
              Sign up
            </Button>
          </div>
        </Card>
      </div>
    </form>
  );
}
