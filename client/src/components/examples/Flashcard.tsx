import { useState } from "react";
import Flashcard from '../Flashcard';

export default function FlashcardExample() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const mockCards = [
    {
      id: '1',
      question: 'What is the purpose of the useState hook in React?',
      answer: 'useState allows functional components to manage local state. It returns an array with the current state value and a setter function.'
    },
    {
      id: '2',
      question: 'When does the useEffect hook run?',
      answer: 'useEffect runs after every completed render by default. It can be controlled with dependency arrays to run conditionally.'
    },
    {
      id: '3',
      question: 'What are custom hooks in React?',
      answer: 'Custom hooks are JavaScript functions that start with "use" and can call other hooks. They allow you to extract and reuse component logic.'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Flashcard
        cards={mockCards}
        currentIndex={currentIndex}
        onNext={() => setCurrentIndex(prev => Math.min(prev + 1, mockCards.length - 1))}
        onPrevious={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
        onFlip={(isFlipped) => console.log('Card flipped:', isFlipped)}
      />
    </div>
  );
}