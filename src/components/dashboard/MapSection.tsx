import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const MapSection = () => {
  const { toast } = useToast();
  const [mapUrl, setMapUrl] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531531678!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0x1c0463b6cc0a6c6!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1234567890123");

  const handleSave = () => {
    toast({ title: "Saved", description: "Map location updated successfully" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location Map</CardTitle>
        <CardDescription>Embed your academy's Google Maps location</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Google Maps Embed URL</Label>
          <Input
            value={mapUrl}
            onChange={(e) => setMapUrl(e.target.value)}
            placeholder="Paste Google Maps embed URL here"
          />
          <p className="text-sm text-muted-foreground">
            To get the embed URL: Open Google Maps → Search for your location → Click "Share" → Click "Embed a map" → Copy the URL from the iframe src attribute
          </p>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <iframe
            src={mapUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Academy Location"
          />
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardContent>
    </Card>
  );
};
