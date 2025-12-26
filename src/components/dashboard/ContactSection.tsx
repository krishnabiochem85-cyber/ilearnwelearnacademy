import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = ({ isReadOnly = false }: { isReadOnly?: boolean }) => {
  const { toast } = useToast();
  const [contact, setContact] = useState({
    phone: "+1 (555) 123-4567",
    email: "info@academy.edu",
    address: "123 Education Lane, Learning City, ST 12345",
  });

  const handleSave = () => {
    toast({ title: "Saved", description: "Contact details updated successfully" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Details</CardTitle>
        <CardDescription>Manage academy contact information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Phone Number</Label>
          <Input
            value={contact.phone}
            disabled={isReadOnly}
            onChange={(e) => !isReadOnly && setContact({ ...contact, phone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Email Address</Label>
          <Input
            type="email"
            value={contact.email}
            disabled={isReadOnly}
            onChange={(e) => !isReadOnly && setContact({ ...contact, email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Physical Address</Label>
          <Input
            value={contact.address}
            disabled={isReadOnly}
            onChange={(e) => !isReadOnly && setContact({ ...contact, address: e.target.value })}
          />
        </div>
        {!isReadOnly && <Button onClick={handleSave}>Save Changes</Button>}
      </CardContent>
    </Card>
  );
};
