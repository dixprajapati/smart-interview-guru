
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, ArrowUpRight, CheckCircle, XCircle, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Interview, recentInterviews } from '@/lib/data';
import { useStaggeredAnimation } from '@/lib/animations';

const RecentInterviews = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState<Interview[]>(recentInterviews);
  const animatedInterviews = useStaggeredAnimation(interviews, 100);
  
  const getStatusColor = (status: Interview['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100';
      case 'scheduled':
        return 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100';
      case 'in-progress':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };
  
  const getStatusIcon = (status: Interview['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'scheduled':
        return <Calendar className="h-4 w-4 mr-1" />;
      case 'in-progress':
        return <PlayCircle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };
  
  const handleInterviewAction = (interview: Interview) => {
    if (interview.status === 'scheduled' || interview.status === 'in-progress') {
      navigate('/interview');
    } else {
      navigate('/feedback');
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Recent Interviews</h2>
          <p className="text-muted-foreground">Track your interview sessions and results</p>
        </div>
        <Button onClick={() => navigate('/interview')}>
          New Interview
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {animatedInterviews.map((interview) => (
          <Card 
            key={interview.id} 
            className="overflow-hidden hover:shadow-md transition-300"
            style={interview.style}
          >
            <CardHeader className="pb-4">
              <div className="flex justify-between">
                <Badge 
                  variant="outline" 
                  className={cn("flex items-center px-2", getStatusColor(interview.status))}
                >
                  {getStatusIcon(interview.status)}
                  {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                </Badge>
                
                {interview.score && (
                  <div className="text-lg font-semibold">
                    {interview.score}<span className="text-muted-foreground text-sm">/100</span>
                  </div>
                )}
              </div>
              <CardTitle className="mt-2 text-xl">{interview.title}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                {formatDate(interview.date)}
                
                {interview.duration && (
                  <>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    {interview.duration} min
                  </>
                )}
              </CardDescription>
            </CardHeader>
            <CardFooter className="pt-0">
              <Button 
                variant={interview.status === 'completed' ? "outline" : "default"} 
                className="w-full"
                onClick={() => handleInterviewAction(interview)}
              >
                {interview.status === 'completed' 
                  ? 'View Results' 
                  : interview.status === 'in-progress'
                    ? 'Continue Interview'
                    : 'Start Interview'
                }
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentInterviews;
