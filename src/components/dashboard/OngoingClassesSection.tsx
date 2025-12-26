import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Loader2 } from "lucide-react";

type OngoingClass = {
  id?: string;
  title: string;
  description: string | null;
  level: string | null;
  instructor: string | null;
  start_date: string | null;
  end_date: string | null;
  schedule: string | null;
};

export const OngoingClassesSection = ({ isReadOnly = false }: { isReadOnly?: boolean }) => {
  const { toast } = useToast();
  const [classes, setClasses] = useState<OngoingClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const { data, error } = await supabase.from("ongoing_classes").select("*").order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setClasses(data || []);
    }
    setLoading(false);
  };

  const addClass = () => {
    if (isReadOnly) return;
    setClasses([...classes, { title: "", description: null, level: null, instructor: null, start_date: null, end_date: null, schedule: null }]);
  };

  const removeClass = async (idx: number) => {
    if (isReadOnly) return;
    const cls = classes[idx];
    if (cls.id) {
      const { error } = await supabase.from("ongoing_classes").delete().eq("id", cls.id);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
    }
    setClasses(classes.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    if (isReadOnly) return;
    for (const cls of classes) {
      if (!cls.title.trim()) continue;
      if (cls.id) {
        const { error } = await supabase.from("ongoing_classes").update(cls).eq("id", cls.id);
        if (error) {
          toast({ title: "Error", description: error.message, variant: "destructive" });
          return;
        }
      } else {
        const { error } = await supabase.from("ongoing_classes").insert(cls);
        if (error) {
          toast({ title: "Error", description: error.message, variant: "destructive" });
          return;
        }
      }
    }
    toast({ title: "Saved", description: "Ongoing classes updated successfully" });
    fetchClasses();
  };

  if (loading) return <Loader2 className="w-6 h-6 animate-spin mx-auto" />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ongoing Classes</CardTitle>
        <CardDescription>Manage current classes (frequently updated)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {classes.map((cls, idx) => (
          <div key={idx} className="space-y-3 p-4 border rounded-lg relative">
            {!isReadOnly && (
              <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeClass(idx)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            )}
            <div className="space-y-2">
              <Label>Class Title</Label>
              <Input
                value={cls.title}
                disabled={isReadOnly}
                onChange={(e) => {
                  if (isReadOnly) return;
                  const u = [...classes];
                  u[idx].title = e.target.value;
                  setClasses(u);
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Level</Label>
                <Input
                  value={cls.level || ""}
                  disabled={isReadOnly}
                  onChange={(e) => {
                    if (isReadOnly) return;
                    const u = [...classes];
                    u[idx].level = e.target.value;
                    setClasses(u);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Instructor</Label>
                <Input
                  value={cls.instructor || ""}
                  disabled={isReadOnly}
                  onChange={(e) => {
                    if (isReadOnly) return;
                    const u = [...classes];
                    u[idx].instructor = e.target.value;
                    setClasses(u);
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={cls.description || ""}
                rows={2}
                disabled={isReadOnly}
                onChange={(e) => {
                  if (isReadOnly) return;
                  const u = [...classes];
                  u[idx].description = e.target.value;
                  setClasses(u);
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={cls.start_date || ""}
                  disabled={isReadOnly}
                  onChange={(e) => {
                    if (isReadOnly) return;
                    const u = [...classes];
                    u[idx].start_date = e.target.value;
                    setClasses(u);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={cls.end_date || ""}
                  disabled={isReadOnly}
                  onChange={(e) => {
                    if (isReadOnly) return;
                    const u = [...classes];
                    u[idx].end_date = e.target.value;
                    setClasses(u);
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Schedule (e.g. Mon/Wed 10am-12pm)</Label>
              <Input
                value={cls.schedule || ""}
                disabled={isReadOnly}
                onChange={(e) => {
                  if (isReadOnly) return;
                  const u = [...classes];
                  u[idx].schedule = e.target.value;
                  setClasses(u);
                }}
              />
            </div>
          </div>
        ))}
        {!isReadOnly && (
          <div className="flex gap-2">
            <Button onClick={addClass} variant="outline"><Plus className="w-4 h-4 mr-2" />Add Class</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
