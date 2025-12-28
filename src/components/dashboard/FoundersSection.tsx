import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const FoundersSection = ({ isReadOnly = false }: { isReadOnly?: boolean }) => {
  const { toast } = useToast();
  const [founders, setFounders] = useState([
    {
      name: "Ms. Saranya | Founder",
      bio:
        "The Empathetic Visionary & Mathematics Expert. Ms. Saranya's journey began with a profound passion for Mathematics and a wide-reaching vision to redefine how students learn. She was inspired to create an academy that provides exclusive coaching through respective subject experts, ensuring that quality is never compromised. By heart, she is deeply empathetic and views education through the eyes of the student. Her vision goes beyond the standard curriculum, focusing heavily on co-curricular development to build well-rounded individuals and creating an environment where students feel understood, valued, and inspired to excel.",
    },
    {
      name: "Ms. Gayathri | Co-Founder",
      bio:
        "The Nurturing Mentor & Language Specialist. A true partner in every sense, Ms. Gayathri joined forces with the founder to bring their shared dreams to life. Known for her friendly and approachable nature, she creates a 'home away from home' for students and spends most of her time at the academy, fostering close, personal bonds with every child. Beyond her leadership role, she mentors students in Social Studies, English, and Spoken English, ensuring they communicate with confidence and clarity.",
    },
    {
      name: "Dr. Krishnaveni A | Secretary",
      bio:
        "The Strategic Innovator & Science Authority. As Secretary, Dr. Krishnaveni is the engine of academic growth and institutional excellence. She is responsible for implementing cutting-edge strategies and modern teaching methodologies that keep the academy at the forefront of education. A specialist in the sciences, she delivers expert coaching in General Science for secondary grades, as well as Chemistry and Biology for higher secondary students, and plays a key role in the academy's branding and outreach.",
    },
    {
      name: "Ms. Keerthana | Director",
      bio:
        "The Anchor & Support System. Ms. Keerthana is the vital support system that holds the collective mission together. She stands steadfastly by the leadership team's side, ensuring that the academy's operations are seamless and that the founders' vision is consistently realized. With a powerful belief in the philosophy that 'Together We Achieve', she serves as the anchor of the team, focusing on unity and long-term growth for the academy and its students.",
    },
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
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-foreground">
            The Heart and Mind Behind Our Academy
          </h3>
          <p className="text-sm text-muted-foreground">
            At our academy, we believe that education is most powerful when it is led by passion and
            supported by a unified community. Our leadership team brings together subject-matter
            expertise, strategic innovation, and a deep, personal commitment to every student's
            success.
          </p>
        </div>
        {founders.map((founder, idx) => (
          <div key={idx} className="space-y-3 p-4 border rounded-lg">
            <div className="space-y-2">
              <Label>Founder Name</Label>
              <Input
                value={founder.name}
                disabled={isReadOnly}
                onChange={(e) => {
                  if (isReadOnly) return;
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
                rows={4}
                disabled={isReadOnly}
                onChange={(e) => {
                  if (isReadOnly) return;
                  const updated = [...founders];
                  updated[idx].bio = e.target.value;
                  setFounders(updated);
                }}
              />
            </div>
          </div>
        ))}
        {!isReadOnly && <Button onClick={handleSave}>Save Changes</Button>}
      </CardContent>
    </Card>
  );
};
