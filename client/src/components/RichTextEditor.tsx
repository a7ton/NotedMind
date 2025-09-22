import { useState } from "react";
import { Bold, Italic, List, ListOrdered, Heading1, Heading2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface RichTextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ 
  content = "", 
  onChange, 
  placeholder = "Start typing your notes..." 
}: RichTextEditorProps) {
  const [editorContent, setEditorContent] = useState(content);
  const [isFocused, setIsFocused] = useState(false);

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.textContent || "";
    setEditorContent(newContent);
    onChange?.(newContent);
  };

  const formatText = (command: string) => {
    document.execCommand(command, false);
    console.log(`Text formatting applied: ${command}`);
  };

  const insertHeading = (level: number) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const heading = document.createElement(`h${level}`);
      heading.textContent = selection.toString() || `Heading ${level}`;
      range.deleteContents();
      range.insertNode(heading);
      console.log(`Heading ${level} inserted`);
    }
  };

  return (
    <Card className="w-full">
      <div className="border-b border-card-border p-2">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText('bold')}
            data-testid="button-bold"
            className="h-8"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText('italic')}
            data-testid="button-italic"
            className="h-8"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => insertHeading(1)}
            data-testid="button-h1"
            className="h-8"
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => insertHeading(2)}
            data-testid="button-h2"
            className="h-8"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText('insertUnorderedList')}
            data-testid="button-ul"
            className="h-8"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText('insertOrderedList')}
            data-testid="button-ol"
            className="h-8"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-0">
        <div
          contentEditable
          className={`min-h-[300px] p-4 focus:outline-none resize-none ${
            !editorContent && !isFocused ? 'text-muted-foreground' : ''
          }`}
          onInput={handleContentChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          data-placeholder={placeholder}
          data-testid="editor-content"
          suppressContentEditableWarning
        >
          {!editorContent && !isFocused && placeholder}
        </div>
      </CardContent>
    </Card>
  );
}