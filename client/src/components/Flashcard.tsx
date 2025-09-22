import { useState } from "react";
import { RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FlashcardData {
  id: string;
  question: string;
  answer: string;
}

interface FlashcardProps {
  cards: FlashcardData[];
  currentIndex?: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onFlip?: (isFlipped: boolean) => void;
}

export default function Flashcard({ 
  cards, 
  currentIndex = 0, 
  onNext, 
  onPrevious, 
  onFlip 
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipAnimation, setFlipAnimation] = useState(false);

  const currentCard = cards[currentIndex];

  const handleFlip = () => {
    setFlipAnimation(true);
    setTimeout(() => {
      setIsFlipped(!isFlipped);
      setFlipAnimation(false);
      onFlip?.(!isFlipped);
      console.log('Flashcard flipped:', !isFlipped ? 'answer' : 'question');
    }, 150);
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      onNext?.();
      console.log('Next card:', currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      onPrevious?.();
      console.log('Previous card:', currentIndex - 1);
    }
  };

  if (!currentCard) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No flashcards available</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} of {cards.length}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleFlip}
          data-testid="button-flip-card"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Flip
        </Button>
      </div>

      <Card 
        className={`min-h-[300px] cursor-pointer hover-elevate transition-transform duration-150 ${
          flipAnimation ? 'scale-95' : ''
        }`}
        onClick={handleFlip}
        data-testid="card-flashcard"
      >
        <CardContent className="p-8 flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-xs uppercase tracking-wide text-primary font-medium mb-4">
              {isFlipped ? 'Answer' : 'Question'}
            </div>
            <p className="text-lg leading-relaxed" data-testid={isFlipped ? "text-answer" : "text-question"}>
              {isFlipped ? currentCard.answer : currentCard.question}
            </p>
            <div className="mt-6 text-sm text-muted-foreground">
              Click to flip or use the flip button
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          data-testid="button-previous-card"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="flex space-x-2">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
          data-testid="button-next-card"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}