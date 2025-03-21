
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import ProgressStats from '@/components/dashboard/ProgressStats';
import RecentInterviews from '@/components/dashboard/RecentInterviews';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, CheckCheck, Timer } from 'lucide-react';
import { currentUser } from '@/lib/data';

const Dashboard = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Page title
    document.title = 'Dashboard | InterviewAI';
  }, []);
  
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-20">
        <div className="py-8">
          <div className="page-transition">
            {/* Welcome header */}
            <header className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    Welcome back, {currentUser.name.split(' ')[0]}
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Track your interview performance and continue your practice
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button className="flex items-center" size="lg">
                    Start New Interview
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </header>
            
            {/* Quick actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl border shadow-sm p-4 flex items-center transition-300 hover:shadow-md">
                <div className="bg-primary/10 text-primary p-3 rounded-lg mr-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Schedule Interview</h3>
                  <p className="text-sm text-muted-foreground">Book a time for focused practice</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border shadow-sm p-4 flex items-center transition-300 hover:shadow-md">
                <div className="bg-purple-100 text-purple-600 p-3 rounded-lg mr-4">
                  <CheckCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Review Feedback</h3>
                  <p className="text-sm text-muted-foreground">See insights from past interviews</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border shadow-sm p-4 flex items-center transition-300 hover:shadow-md">
                <div className="bg-amber-100 text-amber-600 p-3 rounded-lg mr-4">
                  <Timer className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Quick Practice</h3>
                  <p className="text-sm text-muted-foreground">5-minute interview exercise</p>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <ProgressStats />
            
            {/* Recent interviews */}
            <RecentInterviews />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
