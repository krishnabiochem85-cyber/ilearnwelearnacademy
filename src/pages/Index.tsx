import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-4 text-center">
      <GraduationCap className="w-20 h-20 text-primary mb-6" />
      <h1 className="text-4xl font-bold mb-2 text-foreground">Welcome to Academy</h1>
      <p className="text-lg text-muted-foreground mb-8">Building tomorrow's leaders through quality education</p>
      <Button size="lg" onClick={() => navigate("/auth")}>
        Admin Login
      </Button>
    </div>
  );
};

export default Index;
