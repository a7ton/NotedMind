import { useState } from "react";
import { FileText, FolderOpen, Plus, Search, Settings, Brain } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AppSidebarProps {
  onCreateNote?: () => void;
  onSelectFolder?: (folderId: string) => void;
  onSearch?: (query: string) => void;
}

export default function AppSidebar({ onCreateNote, onSelectFolder, onSearch }: AppSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const folders = [
    { id: "all", title: "All Notes", icon: FileText, count: 12 },
    { id: "lectures", title: "Lectures", icon: FolderOpen, count: 8 },
    { id: "meetings", title: "Meetings", icon: FolderOpen, count: 4 },
  ];

  const recentNotes = [
    { id: "1", title: "React Hooks Fundamentals", updatedAt: "2h ago" },
    { id: "2", title: "Database Design Principles", updatedAt: "1d ago" },
    { id: "3", title: "Team Standup Notes", updatedAt: "2d ago" },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <Sidebar>
      <SidebarContent className="p-4">
        <div className="mb-6">
          <Button
            onClick={() => {
              onCreateNote?.();
              console.log('Create new note triggered');
            }}
            className="w-full justify-start gap-2"
            data-testid="button-create-note"
          >
            <Plus className="h-4 w-4" />
            New Note
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-9"
              data-testid="input-search"
            />
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Folders</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {folders.map((folder) => (
                <SidebarMenuItem key={folder.id}>
                  <SidebarMenuButton
                    onClick={() => {
                      onSelectFolder?.(folder.id);
                      console.log('Folder selected:', folder.id);
                    }}
                    data-testid={`button-folder-${folder.id}`}
                  >
                    <folder.icon className="h-4 w-4" />
                    <span className="flex-1">{folder.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {folder.count}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Recent Notes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentNotes.map((note) => (
                <SidebarMenuItem key={note.id}>
                  <SidebarMenuButton
                    onClick={() => console.log('Recent note selected:', note.id)}
                    data-testid={`button-recent-${note.id}`}
                  >
                    <FileText className="h-4 w-4" />
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-sm">{note.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {note.updatedAt}
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto pt-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => console.log('Study tools opened')}
                    data-testid="button-study-tools"
                  >
                    <Brain className="h-4 w-4" />
                    <span>Study Tools</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => console.log('Settings opened')}
                    data-testid="button-settings"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}