import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

export const CoursesSection = ({ isReadOnly = false }: { isReadOnly?: boolean }) => {
  const { toast } = useToast();
  const [courses, setCourses] = useState([
    { title: "Advanced Mathematics", description: "Grades 9-12, comprehensive algebra and calculus" },
    { title: "Creative Writing", description: "Grades 6-10, explore narrative and poetry" },
  ]);

  const addCourse = () => {
    if (isReadOnly) return;
    setCourses([...courses, { title: "", description: "" }]);
  };

  const removeCourse = (idx: number) => {
    if (isReadOnly) return;
    setCourses(courses.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    toast({ title: "Saved", description: "Courses information updated successfully" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Courses Offered</CardTitle>
        <CardDescription>Manage the list of courses your academy offers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {courses.map((course, idx) => (
          <div key={idx} className="space-y-3 p-4 border rounded-lg relative">
            {!isReadOnly && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => removeCourse(idx)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            )}
            <div className="space-y-2">
              <Label>Course Title</Label>
              <Input
                value={course.title}
                disabled={isReadOnly}
                onChange={(e) => {
                  if (isReadOnly) return;
                  const updated = [...courses];
                  updated[idx].title = e.target.value;
                  setCourses(updated);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={course.description}
                rows={2}
                disabled={isReadOnly}
                onChange={(e) => {
                  if (isReadOnly) return;
                  const updated = [...courses];
                  updated[idx].description = e.target.value;
                  setCourses(updated);
                }}
              />
            </div>
          </div>
        ))}
        {!isReadOnly && (
          <div className="flex gap-2">
            <Button onClick={addCourse} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
