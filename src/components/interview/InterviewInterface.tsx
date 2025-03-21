
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { interviewQuestions } from '@/lib/data';
import { Timer, Mic, MessageSquare, Video, Send, HelpCircle, AlertTriangle, AudioLines, VideoOff, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFadeIn } from '@/lib/animations';

interface InterviewInterfaceProps {
  onComplete: () => void;
}

const InterviewInterface = ({ onComplete }: InterviewInterfaceProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes per question
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [tabValue, setTabValue] = useState('text');
  
  const currentQuestion = interviewQuestions[currentQuestionIndex];
  const questionTitleAnimation = useFadeIn(0);
  const questionBodyAnimation = useFadeIn(200);
  const answerAreaAnimation = useFadeIn(400);
  
  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0 || isSubmitted) return;
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, isSubmitted]);
  
  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'medium':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'hard':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };
  
  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };
  
  const toggleAudio = () => {
    setIsAudioActive(!isAudioActive);
  };
  
  const toggleVideo = () => {
    setIsVideoActive(!isVideoActive);
  };
  
  const handleTabChange = (value: string) => {
    setTabValue(value);
  };
  
  const handleSubmit = () => {
    if (!answer.trim() && tabValue === 'text') {
      return;
    }
    
    setIsThinking(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      setIsThinking(false);
      setIsSubmitted(true);
      
      // Move to next question after a delay
      setTimeout(() => {
        if (currentQuestionIndex < interviewQuestions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setAnswer('');
          setTimeLeft(120);
          setIsSubmitted(false);
        } else {
          // All questions answered
          onComplete();
        }
      }, 2000);
    }, 3000);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center">
          <Badge className="mr-2">
            Question {currentQuestionIndex + 1}/{interviewQuestions.length}
          </Badge>
          <Badge 
            variant="outline" 
            className={cn(getDifficultyColor(currentQuestion.difficulty))}
          >
            {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
          </Badge>
        </div>
        <div className="flex items-center">
          <Timer className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className={cn(
            "font-mono",
            timeLeft < 30 && timeLeft > 10 ? "text-yellow-600" : "",
            timeLeft <= 10 ? "text-red-600 animate-pulse" : ""
          )}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
      
      <div className="px-6 py-6">
        <div className="mb-6" style={questionTitleAnimation}>
          <Badge variant="outline" className="mb-2 text-blue-600 bg-blue-50 border-blue-200">
            {currentQuestion.category}
          </Badge>
          <h2 className="text-xl font-bold mb-3" style={questionBodyAnimation}>
            {currentQuestion.text}
          </h2>
        </div>
        
        <Separator className="my-6" />
        
        <div style={answerAreaAnimation}>
          <Tabs defaultValue="text" value={tabValue} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="text" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Text
              </TabsTrigger>
              <TabsTrigger value="audio" className="flex items-center">
                <Mic className="h-4 w-4 mr-2" />
                Audio
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center">
                <Video className="h-4 w-4 mr-2" />
                Video
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="text">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Your Answer</CardTitle>
                  <CardDescription>
                    Provide a comprehensive response to the question
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Type your answer here..."
                    className="min-h-32"
                    value={answer}
                    onChange={handleAnswerChange}
                    disabled={isThinking || isSubmitted}
                  />
                </CardContent>
                <CardFooter className="justify-between">
                  <div className="text-sm text-muted-foreground">
                    {answer.length > 0 ? (
                      <>
                        {answer.split(' ').filter(Boolean).length} words
                      </>
                    ) : (
                      <span className="flex items-center">
                        <HelpCircle className="h-3 w-3 mr-1" />
                        Aim for a complete, detailed response
                      </span>
                    )}
                  </div>
                  <Button 
                    onClick={handleSubmit}
                    disabled={!answer.trim() || isThinking || isSubmitted}
                    className={cn(
                      "transition-all",
                      isThinking && "opacity-80"
                    )}
                  >
                    {isThinking ? (
                      <>Processing...</>
                    ) : isSubmitted ? (
                      <>Submitted</>
                    ) : (
                      <>
                        Submit Answer
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="audio">
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">Voice Response</CardTitle>
                  <CardDescription>
                    Record your verbal answer to the question
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-10 flex items-center justify-center">
                  <div className="text-center">
                    <div 
                      className={cn(
                        "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer transition-all",
                        isAudioActive 
                          ? "bg-red-100 text-red-600 shadow-md hover:bg-red-200"
                          : "bg-primary/10 text-primary hover:bg-primary/20"
                      )}
                      onClick={toggleAudio}
                    >
                      {isAudioActive ? (
                        <AudioLines className="h-10 w-10 animate-pulse" />
                      ) : (
                        <Mic className="h-10 w-10" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {isAudioActive 
                        ? "Recording... Click to stop" 
                        : "Click to start recording"}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Feature available in premium version
                  </div>
                  <Button 
                    onClick={handleSubmit}
                    disabled={!isAudioActive || isThinking || isSubmitted}
                  >
                    {isThinking ? (
                      <>Processing...</>
                    ) : isSubmitted ? (
                      <>Submitted</>
                    ) : (
                      <>Submit Recording</>
                    )}
                  </Button>
                </CardFooter>
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center p-6 max-w-md">
                    <MicOff className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-bold mb-2">Audio Recording Coming Soon</h3>
                    <p className="text-muted-foreground mb-4">
                      Audio-based interviews will be available in our upcoming release. 
                      Please use the text response option for now.
                    </p>
                    <Button variant="outline" onClick={() => setTabValue('text')}>
                      Switch to Text Mode
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="video">
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">Video Response</CardTitle>
                  <CardDescription>
                    Record yourself answering the question
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-10">
                  <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center mx-auto max-w-2xl overflow-hidden border">
                    <div className="text-center">
                      <div 
                        className={cn(
                          "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer transition-all",
                          isVideoActive 
                            ? "bg-red-100 text-red-600 shadow-md hover:bg-red-200"
                            : "bg-primary/10 text-primary hover:bg-primary/20"
                        )}
                        onClick={toggleVideo}
                      >
                        {isVideoActive ? (
                          <Video className="h-10 w-10 animate-pulse" />
                        ) : (
                          <Video className="h-10 w-10" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {isVideoActive 
                          ? "Recording... Click to stop" 
                          : "Click to start recording"}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Feature available in premium version
                  </div>
                  <Button 
                    onClick={handleSubmit}
                    disabled={!isVideoActive || isThinking || isSubmitted}
                  >
                    {isThinking ? (
                      <>Processing...</>
                    ) : isSubmitted ? (
                      <>Submitted</>
                    ) : (
                      <>Submit Recording</>
                    )}
                  </Button>
                </CardFooter>
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center p-6 max-w-md">
                    <VideoOff className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-bold mb-2">Video Recording Coming Soon</h3>
                    <p className="text-muted-foreground mb-4">
                      Video-based interviews will be available in our upcoming release. 
                      Please use the text response option for now.
                    </p>
                    <Button variant="outline" onClick={() => setTabValue('text')}>
                      Switch to Text Mode
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default InterviewInterface;
