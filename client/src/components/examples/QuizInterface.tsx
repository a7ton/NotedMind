import QuizInterface from '../QuizInterface';

export default function QuizInterfaceExample() {
  const mockQuestions = [
    {
      id: '1',
      question: 'What hook is used to manage state in functional React components?',
      options: ['useEffect', 'useState', 'useContext', 'useReducer'],
      correctAnswer: 1,
      explanation: 'useState is the primary hook for managing local component state in functional components.'
    },
    {
      id: '2',
      question: 'Which lifecycle method does useEffect replace in class components?',
      options: ['componentDidMount only', 'componentDidUpdate only', 'Both componentDidMount and componentDidUpdate', 'componentWillUnmount only'],
      correctAnswer: 2,
      explanation: 'useEffect can replace componentDidMount, componentDidUpdate, and componentWillUnmount depending on how it is used.'
    },
    {
      id: '3',
      question: 'What is the correct way to update state in React?',
      options: ['Directly mutating the state variable', 'Using the setter function from useState', 'Modifying state in render', 'Using global variables'],
      correctAnswer: 1,
      explanation: 'Always use the setter function returned by useState to update state, never mutate state directly.'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <QuizInterface
        questions={mockQuestions}
        onComplete={(score, answers) => console.log('Quiz completed:', { score, answers })}
      />
    </div>
  );
}