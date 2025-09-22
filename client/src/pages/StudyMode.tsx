import { useState } from "react";
import { ArrowLeft, Brain, HelpCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Flashcard from "@/components/Flashcard";
import QuizInterface from "@/components/QuizInterface";

export default function StudyMode() {
  const [activeTab, setActiveTab] = useState("summary");

  // TODO: Replace with real data from API
  const mockSummary = {
    title: "React Hooks Fundamentals",
    keyPoints: [
      "useState hook manages local component state in functional components",
      "useEffect hook handles side effects and replaces lifecycle methods", 
      "Custom hooks enable reusable logic extraction across components",
      "Hooks must be called at the top level of React functions",
      "Rules of hooks ensure consistent behavior across re-renders"
    ]
  };

  const mockFlashcards = [
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
    },
    {
      id: '4',
      question: 'What are the rules of hooks?',
      answer: 'Hooks must be called at the top level of React functions, never inside loops, conditions, or nested functions. This ensures consistent order.'
    }
  ];

  const mockQuizQuestions = [
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
    },
    {
      id: '4',
      question: 'When are custom hooks useful?',
      options: ['For styling components', 'For extracting and reusing stateful logic', 'For handling API calls only', 'For managing global state only'],
      correctAnswer: 1,
      explanation: 'Custom hooks are perfect for extracting stateful logic that can be reused across multiple components.'
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => {
              console.log('Back to dashboard');
              window.history.back();
            }}
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Study Mode</h1>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary" data-testid="tab-summary">
              <Brain className="h-4 w-4 mr-2" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="flashcards" data-testid="tab-flashcards">
              <RotateCcw className="h-4 w-4 mr-2" />
              Flashcards
            </TabsTrigger>
            <TabsTrigger value="quiz" data-testid="tab-quiz">
              <HelpCircle className="h-4 w-4 mr-2" />
              Quiz
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI-Generated Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-lg mb-4" data-testid="text-summary-title">
                  {mockSummary.title}
                </h3>
                <div className="space-y-3">
                  <h4 className="font-medium text-muted-foreground">Key Points:</h4>
                  <ul className="space-y-2">
                    {mockSummary.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2" data-testid={`text-key-point-${index}`}>
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flashcards" className="mt-6">
            <Flashcard cards={mockFlashcards} />
          </TabsContent>

          <TabsContent value="quiz" className="mt-6">
            <QuizInterface 
              questions={mockQuizQuestions}
              onComplete={(score, answers) => {
                console.log('Quiz completed with score:', score, 'answers:', answers);
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}