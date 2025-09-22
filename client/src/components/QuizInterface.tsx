import { useState } from "react";
import { CheckCircle, XCircle, HelpCircle, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizInterfaceProps {
  questions: QuizQuestion[];
  onComplete?: (score: number, answers: number[]) => void;
}

export default function QuizInterface({ questions, onComplete }: QuizInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleAnswerSelect = (optionIndex: string) => {
    setSelectedOption(optionIndex);
    console.log('Option selected:', optionIndex);
  };

  const handleNext = () => {
    if (selectedOption !== "") {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestion] = parseInt(selectedOption);
      setSelectedAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption("");
      } else {
        finishQuiz(newAnswers);
      }
      console.log('Answer submitted:', selectedOption);
    }
  };

  const finishQuiz = (answers: number[]) => {
    const score = answers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    setShowResults(true);
    onComplete?.(score, answers);
    console.log('Quiz completed. Score:', score);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setSelectedOption("");
    console.log('Quiz reset');
  };

  if (questions.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No quiz questions available</p>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-primary mb-2">{percentage}%</div>
            <p className="text-muted-foreground">
              You scored {score} out of {questions.length} questions correctly
            </p>
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => {
              const isCorrect = selectedAnswers[index] === question.correctAnswer;
              return (
                <div key={question.id} className="border rounded-md p-4">
                  <div className="flex items-start gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{question.question}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your answer: {question.options[selectedAnswers[index]]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-600 mt-1">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                      {question.explanation && (
                        <p className="text-sm text-muted-foreground mt-2 italic">
                          {question.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-6">
            <Button onClick={resetQuiz} data-testid="button-retake-quiz">
              Take Quiz Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const current = questions[currentQuestion];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Quiz</CardTitle>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4" data-testid="text-question">
            {current.question}
          </h3>
          
          <RadioGroup value={selectedOption} onValueChange={handleAnswerSelect}>
            {current.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={index.toString()} 
                  id={`option-${index}`}
                  data-testid={`radio-option-${index}`}
                />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="flex-1 cursor-pointer"
                  data-testid={`label-option-${index}`}
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentQuestion 
                    ? 'bg-primary' 
                    : index < currentQuestion 
                      ? 'bg-green-500' 
                      : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={selectedOption === ""}
            data-testid="button-next-question"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}