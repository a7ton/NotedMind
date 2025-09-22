import { useState } from "react";
import { Brain, FileText, HelpCircle, Sparkles, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface StudyToolsProps {
  noteContent?: string;
  onGenerateSummary?: () => void;
  onGenerateFlashcards?: () => void;
  onGenerateQuiz?: () => void;
}

export default function StudyTools({ 
  noteContent, 
  onGenerateSummary, 
  onGenerateFlashcards, 
  onGenerateQuiz 
}: StudyToolsProps) {
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const handleToolClick = async (tool: string, callback?: () => void) => {
    setIsGenerating(tool);
    console.log(`Generating ${tool}...`);
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(null);
    callback?.();
  };

  const hasContent = noteContent && noteContent.trim().length > 50;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">AI Study Tools</h2>
        <Badge variant="secondary" className="text-xs">
          <Sparkles className="h-3 w-3 mr-1" />
          AI-Powered
        </Badge>
      </div>

      <Card className="hover-elevate">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4" />
            Smart Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-3">
            Generate key points and main concepts from your notes
          </p>
          <Button
            onClick={() => handleToolClick('summary', onGenerateSummary)}
            disabled={!hasContent || isGenerating === 'summary'}
            className="w-full"
            data-testid="button-generate-summary"
          >
            {isGenerating === 'summary' ? (
              "Generating Summary..."
            ) : (
              <>
                Generate Summary
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="hover-elevate">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Brain className="h-4 w-4" />
            Flashcards
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-3">
            Create interactive flashcards for active recall practice
          </p>
          <Button
            onClick={() => handleToolClick('flashcards', onGenerateFlashcards)}
            disabled={!hasContent || isGenerating === 'flashcards'}
            className="w-full"
            data-testid="button-generate-flashcards"
          >
            {isGenerating === 'flashcards' ? (
              "Creating Flashcards..."
            ) : (
              <>
                Create Flashcards
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="hover-elevate">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <HelpCircle className="h-4 w-4" />
            Practice Quiz
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-3">
            Test your knowledge with AI-generated questions
          </p>
          <Button
            onClick={() => handleToolClick('quiz', onGenerateQuiz)}
            disabled={!hasContent || isGenerating === 'quiz'}
            className="w-full"
            data-testid="button-generate-quiz"
          >
            {isGenerating === 'quiz' ? (
              "Creating Quiz..."
            ) : (
              <>
                Generate Quiz
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {!hasContent && (
        <Card className="border-dashed border-2">
          <CardContent className="p-6 text-center">
            <Brain className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Add more content to your notes to unlock AI study tools
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}