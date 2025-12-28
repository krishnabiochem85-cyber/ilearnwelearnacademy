import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) navigate("/dashboard");
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) navigate("/dashboard");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Account created! You can now sign in." });
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] p-4">
      <Card className="w-full max-w-md shadow-xl border-2 border-primary/60 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 rounded-full bg-[hsl(var(--primary-foreground))/0.12] flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-[hsl(var(--primary-foreground))]" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-[hsl(var(--primary-foreground))]">
            I Learn We Learn Academy
          </CardTitle>
          <CardDescription className="text-sm text-[hsl(var(--primary-foreground))/0.9]">
            Sign in to your academy dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 bg-[hsl(var(--primary-foreground))/0.1]">
              <TabsTrigger
                value="signin"
                className="data-[state=active]:bg-[hsl(var(--primary-foreground))] data-[state=active]:text-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-[hsl(var(--primary-foreground))] data-[state=active]:text-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-[hsl(var(--primary-foreground))]">
                    Email
                  </Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="admin@academy.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-[hsl(var(--primary-foreground))] text-[hsl(var(--primary))] placeholder:text-[hsl(var(--primary))/0.7]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-[hsl(var(--primary-foreground))]">
                    Password
                  </Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-[hsl(var(--primary-foreground))] text-[hsl(var(--primary))] placeholder:text-[hsl(var(--primary))/0.7]"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[hsl(var(--primary-foreground))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-foreground))/0.9]"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-[hsl(var(--primary-foreground))]">
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="admin@academy.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-[hsl(var(--primary-foreground))] text-[hsl(var(--primary))] placeholder:text-[hsl(var(--primary))/0.7]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-[hsl(var(--primary-foreground))]">
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-[hsl(var(--primary-foreground))] text-[hsl(var(--primary))] placeholder:text-[hsl(var(--primary))/0.7]"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[hsl(var(--primary-foreground))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-foreground))/0.9]"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
