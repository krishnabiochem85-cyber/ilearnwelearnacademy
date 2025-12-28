import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut } from "lucide-react";
import { FoundersSection } from "@/components/dashboard/FoundersSection";
import { CoursesSection } from "@/components/dashboard/CoursesSection";
import { ContactSection } from "@/components/dashboard/ContactSection";
import { EventsSection } from "@/components/dashboard/EventsSection";
import { OngoingClassesSection } from "@/components/dashboard/OngoingClassesSection";
import { AchievementsSection } from "@/components/dashboard/AchievementsSection";
import { MapSection } from "@/components/dashboard/MapSection";
import { PeopleRolesSection } from "@/components/dashboard/PeopleRolesSection";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<"admin" | "staff" | null>(null);
  const [activeSection, setActiveSection] = useState("founders");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuthAndRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .limit(1);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else if (data && data.length > 0) {
        setRole(data[0].role as "admin" | "staff");
      } else {
        toast({ title: "No role assigned", description: "Please contact an administrator to assign a role to your account.", variant: "destructive" });
      }

      setLoading(false);
    };

    checkAuthAndRole();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) navigate("/auth");
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out", description: "You have been signed out successfully" });
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const isAdmin = role === "admin";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} isAdmin={isAdmin} />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-foreground">Academy Dashboard</h1>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>

            {activeSection === "founders" && <FoundersSection isReadOnly={!isAdmin} />}
            {activeSection === "courses" && <CoursesSection isReadOnly={!isAdmin} />}
            {activeSection === "contact" && <ContactSection isReadOnly={!isAdmin} />}
            {activeSection === "events" && <EventsSection isReadOnly={!isAdmin} />}
            {activeSection === "ongoing" && <OngoingClassesSection isReadOnly={!isAdmin} />}
            {activeSection === "achievements" && <AchievementsSection isReadOnly={!isAdmin} />}
            {activeSection === "map" && <MapSection />}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
