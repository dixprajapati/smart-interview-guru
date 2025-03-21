
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import InterviewInterface from '@/components/interview/InterviewInterface';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

const Interview = () => {
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Page title
    document.title = 'Interview | InterviewAI';
    
    // Prevent accidental navigation away
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isStarted && !isCompleted) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isStarted, isCompleted]);
  
  const handleStart = () => {
    setIsStarted(true);
  };
  
  const handleComplete = () => {
    setIsCompleted(true);
  };
  
  const handleExit = () => {
    if (isStarted && !isCompleted) {
      setShowExitDialog(true);
    } else {
      navigate('/dashboard');
    }
  };
  
  const confirmExit = () => {
    navigate('/dashboard');
  };
  
  const cancelExit = () => {
    setShowExitDialog(false);
  };
  
  const viewResults = () => {
    navigate('/feedback');
  };
  
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-20">
        <div className="py-8 max-w-5xl mx-auto">
          <div className="page-transition">
            {!isStarted && !isCompleted && (
              <Card className="bg-white shadow-sm">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">Software Engineering Interview</CardTitle>
                  <CardDescription>
                    Practice your interview skills with our AI-powered coach
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pb-6">
                  <div className="flex justify-center mb-6">
                    <div className="inline-flex border rounded-full overflow-hidden p-0.5">
                      <div className="flex">
                        <div className="bg-primary py-1 px-3 text-white rounded-full">
                          <span className="text-xs font-medium">5 Questions</span>
                        </div>
                        <div className="py-1 px-3">
                          <span className="text-xs">~15 min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                    <div className="border rounded-lg p-4 text-center">
                      <div className="font-semibold mb-1">Format</div>
                      <div className="text-sm text-muted-foreground">Text, Audio, Video</div>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <div className="font-semibold mb-1">Difficulty</div>
                      <div className="text-sm text-muted-foreground">Intermediate</div>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <div className="font-semibold mb-1">Focus</div>
                      <div className="text-sm text-muted-foreground">Problem Solving</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-3xl mx-auto">
                    <h3 className="font-medium text-blue-700 mb-2">Interview Tips</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Speak clearly and take your time when answering</li>
                      <li>• Structure your responses with examples (STAR method)</li>
                      <li>• It's okay to take a moment to think before responding</li>
                      <li>• Be specific about your role in the examples you provide</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center pb-6">
                  <Button size="lg" onClick={handleStart}>
                    Start Interview
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {isStarted && !isCompleted && (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <h1 className="text-2xl font-bold tracking-tight">
                    Software Engineering Interview
                  </h1>
                  <Button variant="outline" onClick={handleExit}>
                    Exit Interview
                  </Button>
                </div>
                
                <InterviewInterface onComplete={handleComplete} />
              </>
            )}
            
            {isCompleted && (
              <Card className="bg-white shadow-sm animate-fade-in">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">Interview Completed!</CardTitle>
                  <CardDescription>
                    Your responses have been submitted and analyzed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pb-6 text-center">
                  <div className="max-w-lg mx-auto">
                    <p className="text-muted-foreground">
                      Our AI has analyzed your responses and generated detailed feedback for your performance.
                      You can now view your results to see your strengths and areas for improvement.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-primary">5</div>
                      <div className="text-sm text-muted-foreground">Questions Answered</div>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-primary">87%</div>
                      <div className="text-sm text-muted-foreground">Overall Score</div>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-primary">12:45</div>
                      <div className="text-sm text-muted-foreground">Total Time</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col md:flex-row gap-3 justify-center pb-6">
                  <Button size="lg" onClick={viewResults}>
                    View Detailed Results
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" onClick={handleExit}>
                    Return to Dashboard
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <AlertDialogTitle className="text-center">Exit Interview?</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Your progress will be lost. Are you sure you want to exit this interview?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel onClick={cancelExit}>
              Continue Interview
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmExit}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Exit Interview
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Interview;
