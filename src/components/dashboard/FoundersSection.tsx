import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const FoundersSection = () => {
  const { toast } = useToast();
  const [founders, setFounders] = useState([
    { name: "Dr. Jane Smith", bio: "Founder & Principal with 20 years in education" },
    { name: "Prof. John Doe", bio: "Co-founder with expertise in curriculum development" },
  ]);

  const handleSave = () => {
    toast({ title: "Saved", description: "Founders information updated successfully" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Founders Page</CardTitle>
        <CardDescription>Manage information about the academy founders</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {founders.map((founder, idx) => (
          <div key={idx} className="space-y-3 p-4 border rounded-lg">
            <div className="space-y-2">
              <Label>Founder Name</Label>
              <Input
                value={founder.name}
                onChange={(e) => {
                  const updated = [...founders];
                  updated[idx].name = e.target.value;
                  setFounders(updated);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea
                value={founder.bio}
                rows={3}
                onChange={(e) => {
                  const updated = [...founders];
                  updated[idx].bio = e.target.value;
                  setFounders(updated);
                }}
              />
            </div>
          </div>
        ))}
        <Button onClick={handleSave}>Save Changes</Button>
      </CardContent>
    </Card>
  );
};
