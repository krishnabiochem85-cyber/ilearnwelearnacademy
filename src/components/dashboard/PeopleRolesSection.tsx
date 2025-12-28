import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2 } from "lucide-react";

interface UserRole {
  id: string;
  user_id: string;
  role: "admin" | "staff";
}

export const PeopleRolesSection = () => {
  const { toast } = useToast();
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [newUserId, setNewUserId] = useState("");
  const [newRole, setNewRole] = useState<"admin" | "staff" | "">("");

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("user_roles")
        .select("id, user_id, role")
        .order("user_id", { ascending: true });

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        setRoles((data ?? []) as UserRole[]);
      }
      setLoading(false);
    };

    fetchRoles();
  }, [toast]);

  const handleUpdate = async (role: UserRole) => {
    setSavingId(role.id);
    const { error } = await supabase
      .from("user_roles")
      .update({ role: role.role })
      .eq("id", role.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Updated", description: "Role updated successfully" });
    }
    setSavingId(null);
  };

  const handleDelete = async (id: string) => {
    setSavingId(id);
    const { error } = await supabase.from("user_roles").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setRoles((prev) => prev.filter((r) => r.id !== id));
      toast({ title: "Removed", description: "Role entry removed" });
    }
    setSavingId(null);
  };

  const handleAdd = async () => {
    if (!newUserId || !newRole) {
      toast({ title: "Missing details", description: "Enter a user ID and select a role" });
      return;
    }

    setSavingId("new");
    const { data, error } = await supabase
      .from("user_roles")
      .insert({ user_id: newUserId, role: newRole as "admin" | "staff" })
      .select("id, user_id, role")
      .single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else if (data) {
      setRoles((prev) => [...prev, data as UserRole]);
      setNewUserId("");
      setNewRole("");
      toast({ title: "Added", description: "Role assigned to user" });
    }
    setSavingId(null);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>People &amp; Roles</CardTitle>
          <CardDescription>Loading existing role assignments…</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
          <span className="text-sm">Fetching roles</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>People &amp; Access Control</CardTitle>
        <CardDescription>
          Manage which users are <span className="font-semibold text-foreground">admins</span> or
          <span className="font-semibold text-foreground"> staff</span>. Only admins can change roles.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3 p-4 border rounded-lg bg-background">
          <h3 className="font-semibold text-sm text-foreground">Add role for an existing account</h3>
          <p className="text-xs text-muted-foreground">
            Paste the user ID of an existing account and choose the appropriate role.
          </p>
          <div className="grid gap-3 md:grid-cols-[2fr,1fr,auto] items-end">
            <div className="space-y-1">
              <Label htmlFor="new-user-id">User ID</Label>
              <Input
                id="new-user-id"
                value={newUserId}
                onChange={(e) => setNewUserId(e.target.value)}
                placeholder="UUID from the user account"
              />
            </div>
            <div className="space-y-1">
              <Label>Role</Label>
              <Select value={newRole} onValueChange={(val) => setNewRole(val as "admin" | "staff")}> 
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAdd} disabled={savingId === "new"} className="mt-1">
              {savingId === "new" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add role
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-foreground">Existing role assignments</h3>
          {roles.length === 0 ? (
            <p className="text-sm text-muted-foreground">No role assignments yet.</p>
          ) : (
            <div className="space-y-3">
              {roles.map((entry) => (
                <div
                  key={entry.id}
                  className="grid gap-3 md:grid-cols-[2fr,1fr,auto] items-end p-3 border rounded-lg bg-background/80"
                >
                  <div className="space-y-1">
                    <Label>User ID</Label>
                    <Input value={entry.user_id} readOnly className="font-mono text-xs" />
                  </div>
                  <div className="space-y-1">
                    <Label>Role</Label>
                    <Select
                      value={entry.role}
                      onValueChange={(val) =>
                        setRoles((prev) =>
                          prev.map((r) => (r.id === entry.id ? { ...r, role: val as "admin" | "staff" } : r)),
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdate(entry)}
                      disabled={savingId === entry.id}
                    >
                      {savingId === entry.id ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : null}
                      Save
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(entry.id)}
                      disabled={savingId === entry.id}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
