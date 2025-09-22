import StudyTools from '../StudyTools';

export default function StudyToolsExample() {
  const mockNoteContent = "React Hooks are a powerful feature that allows you to use state and lifecycle methods in functional components. The most commonly used hooks are useState for managing component state, useEffect for handling side effects and lifecycle events, and useContext for accessing React context. Custom hooks allow you to extract component logic into reusable functions, promoting code reusability and separation of concerns.";

  return (
    <div className="w-80">
      <StudyTools
        noteContent={mockNoteContent}
        onGenerateSummary={() => console.log('Summary generated')}
        onGenerateFlashcards={() => console.log('Flashcards generated')}
        onGenerateQuiz={() => console.log('Quiz generated')}
      />
    </div>
  );
}