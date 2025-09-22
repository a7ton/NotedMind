import { useState } from "react";
import { Book, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import NoteCard from "@/components/NoteCard";
import RichTextEditor from "@/components/RichTextEditor";
import StudyTools from "@/components/StudyTools";
import ThemeToggle from "@/components/ThemeToggle";

export default function Dashboard() {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentNoteContent, setCurrentNoteContent] = useState("");

  // TODO: Replace with real data from API
  const mockNotes = [
    {
      id: '1',
      title: 'React Hooks Fundamentals',
      content: 'Today we covered the basics of React Hooks including useState, useEffect, and custom hooks. Key points: useState for state management, useEffect for side effects and lifecycle methods, custom hooks for reusable logic. React hooks allow functional components to use state and lifecycle methods that were previously only available in class components.',
      tags: ['react', 'frontend', 'javascript'],
      createdAt: new Date('2024-01-15T10:30:00'),
      updatedAt: new Date('2024-01-15T14:20:00'),
    },
    {
      id: '2',
      title: 'Database Design Principles',
      content: 'Database normalization, ACID properties, and indexing strategies. First normal form eliminates duplicate data. Second normal form ensures partial dependency elimination. Third normal form removes transitive dependencies. ACID ensures data integrity through Atomicity, Consistency, Isolation, and Durability.',
      tags: ['database', 'sql', 'architecture'],
      createdAt: new Date('2024-01-14T09:15:00'),
      updatedAt: new Date('2024-01-14T11:45:00'),
    },
    {
      id: '3',
      title: 'Team Standup Notes',
      content: 'Sprint planning discussion, upcoming deadlines, and task assignments. Team velocity analysis shows we are on track for the quarter. Main blockers identified and mitigation strategies discussed. Action items assigned to respective team members.',
      tags: ['meetings', 'agile', 'planning'],
      createdAt: new Date('2024-01-13T15:00:00'),
      updatedAt: new Date('2024-01-13T15:30:00'),
    },
  ];

  const filteredNotes = mockNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedNote = selectedNoteId ? mockNotes.find(n => n.id === selectedNoteId) : null;

  const handleCreateNote = () => {
    console.log('Creating new note...');
    setSelectedNoteId(null);
    setCurrentNoteContent("");
  };

  const handleNoteSelect = (noteId: string) => {
    console.log('Note selected:', noteId);
    setSelectedNoteId(noteId);
    const note = mockNotes.find(n => n.id === noteId);
    if (note) {
      setCurrentNoteContent(note.content);
    }
  };

  const handleNoteContentChange = (content: string) => {
    setCurrentNoteContent(content);
    console.log('Note content updated');
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Notes List Panel */}
      <div className="w-80 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-card-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Book className="h-5 w-5 text-primary" />
              <h1 className="font-semibold text-lg">StudyNotes</h1>
            </div>
            <ThemeToggle />
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={handleCreateNote}
              className="w-full justify-start gap-2"
              data-testid="button-create-note"
            >
              <Plus className="h-4 w-4" />
              New Note
            </Button>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                data-testid="input-search-notes"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {filteredNotes.length === 0 ? (
              <Card className="border-dashed border-2">
                <CardContent className="p-6 text-center">
                  <Book className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {searchQuery ? 'No notes match your search' : 'No notes yet. Create your first note!'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onSelect={handleNoteSelect}
                  onDelete={(id) => console.log('Delete note:', id)}
                  onEdit={(id) => console.log('Edit note:', id)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Editor Panel */}
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold" data-testid="text-note-title">
              {selectedNote ? selectedNote.title : 'Create New Note'}
            </h2>
            {selectedNote && (
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span>Last updated: {new Intl.DateTimeFormat('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }).format(selectedNote.updatedAt)}</span>
                <div className="flex gap-1">
                  {selectedNote.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-sm text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1 p-6">
            <RichTextEditor
              content={currentNoteContent}
              onChange={handleNoteContentChange}
              placeholder={selectedNote ? "Edit your note..." : "Start typing your new note..."}
            />
          </div>
        </div>

        {/* Study Tools Panel */}
        <div className="w-80 border-l border-border bg-card p-6 overflow-y-auto">
          <StudyTools
            noteContent={currentNoteContent}
            onGenerateSummary={() => console.log('Generate summary for:', selectedNoteId)}
            onGenerateFlashcards={() => console.log('Generate flashcards for:', selectedNoteId)}
            onGenerateQuiz={() => console.log('Generate quiz for:', selectedNoteId)}
          />
        </div>
      </div>
    </div>
  );
}