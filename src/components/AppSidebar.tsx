import { GraduationCap, Users, BookOpen, Mail, Calendar, Clock, Award, MapPin } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { id: "founders", title: "Founders", icon: Users },
  { id: "courses", title: "Courses Offered", icon: BookOpen },
  { id: "contact", title: "Contact Details", icon: Mail },
  { id: "events", title: "Curricular & Co-curricular Events", icon: Calendar },
  { id: "ongoing", title: "Ongoing Classes", icon: Clock },
  { id: "achievements", title: "Achievements", icon: Award },
  { id: "map", title: "Location Map", icon: MapPin },
  { id: "people", title: "People & Roles", icon: Users },
];

interface AppSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isAdmin: boolean;
}

export function AppSidebar({ activeSection, setActiveSection, isAdmin }: AppSidebarProps) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        {open && (
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-sidebar-primary" />
            <span className="font-bold text-sidebar-foreground text-sm leading-tight">
              I Learn We Learn Academy
            </span>
          </div>
        )}
        <SidebarTrigger />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard Sections</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems
                .filter((item) => (item.id === "people" ? isAdmin : true))
                .map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveSection(item.id)}
                      isActive={activeSection === item.id}
                    >
                      <item.icon className="w-4 h-4" />
                      {open && <span>{item.title}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
