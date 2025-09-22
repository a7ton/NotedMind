import { useState } from "react";
import { FileText, Calendar, Tag, Trash2, Edit3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface NoteCardProps {
  note: Note;
  onSelect?: (noteId: string) => void;
  onDelete?: (noteId: string) => void;
  onEdit?: (noteId: string) => void;
}

export default function NoteCard({ note, onSelect, onDelete, onEdit }: NoteCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getContentPreview = (content: string) => {
    return content.length > 120 ? content.substring(0, 120) + '...' : content;
  };

  return (
    <Card 
      className="cursor-pointer hover-elevate border-card-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect?.(note.id)}
      data-testid={`card-note-${note.id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate" data-testid={`text-title-${note.id}`}>
              {note.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span data-testid={`text-date-${note.id}`}>{formatDate(note.updatedAt)}</span>
            </div>
          </div>
          {isHovered && (
            <div className="flex items-center gap-1 ml-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(note.id);
                  console.log('Edit note triggered:', note.id);
                }}
                data-testid={`button-edit-${note.id}`}
              >
                <Edit3 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(note.id);
                  console.log('Delete note triggered:', note.id);
                }}
                data-testid={`button-delete-${note.id}`}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3" data-testid={`text-preview-${note.id}`}>
          {getContentPreview(note.content)}
        </p>
        
        {note.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            <Tag className="h-3 w-3 text-muted-foreground" />
            {note.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs" data-testid={`badge-tag-${tag}`}>
                {tag}
              </Badge>
            ))}
            {note.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{note.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}