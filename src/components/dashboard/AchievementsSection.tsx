import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Loader2 } from "lucide-react";

type Achievement = {
  id?: string;
  title: string;
  student_name: string | null;
  description: string | null;
  achievement_date: string | null;
  category: string | null;
};

export const AchievementsSection = () => {
  const { toast } = useToast();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    const { data, error } = await supabase.from("achievements").select("*").order("achievement_date", { ascending: false });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setAchievements(data || []);
    }
    setLoading(false);
  };

  const addAchievement = () => {
    setAchievements([...achievements, { title: "", student_name: null, description: null, achievement_date: null, category: null }]);
  };

  const removeAchievement = async (idx: number) => {
    const ach = achievements[idx];
    if (ach.id) {
      const { error } = await supabase.from("achievements").delete().eq("id", ach.id);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
    }
    setAchievements(achievements.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    for (const ach of achievements) {
      if (!ach.title.trim()) continue;
      if (ach.id) {
        const { error } = await supabase.from("achievements").update(ach).eq("id", ach.id);
        if (error) {
          toast({ title: "Error", description: error.message, variant: "destructive" });
          return;
        }
      } else {
        const { error } = await supabase.from("achievements").insert(ach);
        if (error) {
          toast({ title: "Error", description: error.message, variant: "destructive" });
          return;
        }
      }
    }
    toast({ title: "Saved", description: "Achievements updated successfully" });
    fetchAchievements();
  };

  if (loading) return <Loader2 className="w-6 h-6 animate-spin mx-auto" />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Achievements</CardTitle>
        <CardDescription>Showcase student accomplishments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {achievements.map((ach, idx) => (
          <div key={idx} className="space-y-3 p-4 border rounded-lg relative">
            <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeAchievement(idx)}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
            <div className="space-y-2">
              <Label>Achievement Title</Label>
              <Input value={ach.title} onChange={(e) => { const u = [...achievements]; u[idx].title = e.target.value; setAchievements(u); }} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Student Name</Label>
                <Input value={ach.student_name || ""} onChange={(e) => { const u = [...achievements]; u[idx].student_name = e.target.value; setAchievements(u); }} />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input value={ach.category || ""} placeholder="e.g. Academic, Sports" onChange={(e) => { const u = [...achievements]; u[idx].category = e.target.value; setAchievements(u); }} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={ach.description || ""} rows={2} onChange={(e) => { const u = [...achievements]; u[idx].description = e.target.value; setAchievements(u); }} />
            </div>
            <div className="space-y-2">
              <Label>Achievement Date</Label>
              <Input type="date" value={ach.achievement_date || ""} onChange={(e) => { const u = [...achievements]; u[idx].achievement_date = e.target.value; setAchievements(u); }} />
            </div>
          </div>
        ))}
        <div className="flex gap-2">
          <Button onClick={addAchievement} variant="outline"><Plus className="w-4 h-4 mr-2" />Add Achievement</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};
