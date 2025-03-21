
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import FeedbackCard from '@/components/feedback/FeedbackCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Download, FileText, Share2, Star } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Feedback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Page title
    document.title = 'Feedback | InterviewAI';
  }, []);
  
  const handleDownloadPDF = () => {
    toast({
      title: "PDF generation started",
      description: "Your feedback report will be ready to download shortly.",
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share feature coming soon",
      description: "You'll soon be able to share your interview results with mentors.",
    });
  };
  
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-20">
        <div className="py-8 max-w-5xl mx-auto">
          <div className="page-transition">
            <header className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">
                    Interview Results
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Software Engineering Interview — October 15, 2023
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                <CardHeader className="pb-3">
                  <CardTitle>Overall Performance</CardTitle>
                  <CardDescription>
                    Your performance summary and key insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="border rounded-xl p-4 flex flex-col items-center justify-center text-center">
                      <div className="text-4xl font-bold text-primary mb-2">87</div>
                      <div className="text-sm text-muted-foreground">Overall Score</div>
                      <div className="text-xs text-green-600 mt-1">+4 pts from last interview</div>
                    </div>
                    
                    <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <h3 className="font-medium text-sm">Top Strength</h3>
                        </div>
                        <div className="text-base font-medium">Problem Solving</div>
                        <div className="text-xs text-muted-foreground mt-1">Excellent analytical approach</div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <FileText className="h-4 w-4 text-blue-500 mr-1" />
                          <h3 className="font-medium text-sm">Improvement Area</h3>
                        </div>
                        <div className="text-base font-medium">Technical Details</div>
                        <div className="text-xs text-muted-foreground mt-1">Add more specific examples</div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <FileText className="h-4 w-4 text-purple-500 mr-1" />
                          <h3 className="font-medium text-sm">Key Insight</h3>
                        </div>
                        <div className="text-base font-medium">Communication</div>
                        <div className="text-xs text-muted-foreground mt-1">Clear and concise responses</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight mb-4">
                  Question Feedback
                </h2>
                <FeedbackCard />
              </div>
              
              <div className="flex justify-center mt-12">
                <Button size="lg" onClick={() => navigate('/interview')}>
                  Practice Again
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feedback;
