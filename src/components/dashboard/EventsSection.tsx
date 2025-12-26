import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

export const EventsSection = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState([
    { title: "Annual Science Fair", category: "Curricular", description: "Student showcase of science projects" },
    { title: "Sports Day", category: "Co-curricular", description: "Inter-house sports competition" },
  ]);

  const addEvent = () => {
    setEvents([...events, { title: "", category: "Curricular", description: "" }]);
  };

  const removeEvent = (idx: number) => {
    setEvents(events.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    toast({ title: "Saved", description: "Events updated successfully" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Curricular & Co-curricular Events</CardTitle>
        <CardDescription>Manage academy events and activities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {events.map((event, idx) => (
          <div key={idx} className="space-y-3 p-4 border rounded-lg relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => removeEvent(idx)}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
            <div className="space-y-2">
              <Label>Event Title</Label>
              <Input
                value={event.title}
                onChange={(e) => {
                  const updated = [...events];
                  updated[idx].title = e.target.value;
                  setEvents(updated);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={event.category}
                onChange={(e) => {
                  const updated = [...events];
                  updated[idx].category = e.target.value;
                  setEvents(updated);
                }}
              >
                <option value="Curricular">Curricular</option>
                <option value="Co-curricular">Co-curricular</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={event.description}
                rows={2}
                onChange={(e) => {
                  const updated = [...events];
                  updated[idx].description = e.target.value;
                  setEvents(updated);
                }}
              />
            </div>
          </div>
        ))}
        <div className="flex gap-2">
          <Button onClick={addEvent} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};
