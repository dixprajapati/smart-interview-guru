
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { interviewQuestions, userAnswers } from '@/lib/data';
import { ThumbsUp, ThumbsDown, Copy, Check, Star, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const FeedbackCard = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const answer = userAnswers[0]; // Using the first answer for demo
  const question = interviewQuestions.find(q => q.id === answer.questionId);
  
  const copyFeedback = () => {
    const feedbackText = `
Question: ${question?.text}
My Answer: ${answer.text}
Score: ${answer.evaluation.score}/100
Feedback: ${answer.evaluation.feedback}
Strengths: ${answer.evaluation.strengths.join(', ')}
Areas for Improvement: ${answer.evaluation.improvements.join(', ')}
    `;
    
    navigator.clipboard.writeText(feedbackText.trim());
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "The feedback has been copied to your clipboard.",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-600';
    if (score >= 70) return 'bg-blue-600';
    if (score >= 50) return 'bg-yellow-600';
    return 'bg-red-600';
  };
  
  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge 
            variant="outline" 
            className="bg-blue-50 text-blue-600 border-blue-200"
          >
            {question?.category || 'General'}
          </Badge>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={copyFeedback}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <CardTitle className="text-lg">
          {question?.text || 'Interview Question'}
        </CardTitle>
        <CardDescription className="flex items-center text-xs mt-1">
          <Clock className="h-3 w-3 mr-1" />
          Answered in 2m 15s
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3 space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Your Answer:</h4>
          <div className="text-sm text-muted-foreground bg-slate-50 p-3 rounded-md border">
            {answer.text}
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Score:</h4>
            <span className={cn("text-xl font-bold", getScoreColor(answer.evaluation.score))}>
              {answer.evaluation.score}
            </span>
          </div>
          <Progress 
            value={answer.evaluation.score} 
            className={cn("h-2", getProgressColor(answer.evaluation.score))} 
          />
          <div className="flex justify-between text-xs mt-1">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">AI Feedback:</h4>
          <p className="text-sm text-muted-foreground">
            {answer.evaluation.feedback}
          </p>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium flex items-center mb-2 text-green-600">
              <ThumbsUp className="h-4 w-4 mr-1" />
              Strengths
            </h4>
            <ul className="space-y-1">
              {answer.evaluation.strengths.map((strength, index) => (
                <li key={index} className="text-sm flex items-start">
                  <Star className="h-3 w-3 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium flex items-center mb-2 text-amber-600">
              <ThumbsDown className="h-4 w-4 mr-1" />
              Areas for Improvement
            </h4>
            <ul className="space-y-1">
              {answer.evaluation.improvements.map((improvement, index) => (
                <li key={index} className="text-sm flex items-start">
                  <span className="h-3 w-3 rounded-full border border-amber-500 mr-2 mt-1 flex-shrink-0" />
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="w-full flex justify-between items-center">
          <Button variant="ghost" size="sm">
            Previous
          </Button>
          <Button variant="ghost" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FeedbackCard;
