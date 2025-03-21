
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import LeaderboardTable from '@/components/leaderboard/LeaderboardTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, BrainCircuit, Lock, Trophy, Users } from 'lucide-react';
import { currentUser } from '@/lib/data';

const Leaderboard = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Page title
    document.title = 'Leaderboard | InterviewAI';
  }, []);
  
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-20">
        <div className="py-8">
          <div className="page-transition">
            <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Leaderboard
                </h1>
                <p className="text-muted-foreground mt-1">
                  See how you rank against other interview candidates
                </p>
              </div>
              <div className="mt-4 md:mt-0 bg-white border rounded-lg shadow-sm px-4 py-3">
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="text-xs text-muted-foreground">Your Rank</div>
                    <div className="font-bold text-lg">3rd</div>
                  </div>
                  <div className="mr-4">
                    <div className="text-xs text-muted-foreground">Score</div>
                    <div className="font-bold text-lg">91</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Interviews</div>
                    <div className="font-bold text-lg">8</div>
                  </div>
                </div>
              </div>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="md:col-span-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CardHeader className="pb-4">
                  <CardTitle>Top Achievers</CardTitle>
                  <CardDescription className="text-blue-100">
                    This month's top performers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                      <div className="bg-yellow-400 text-blue-800 rounded-full p-2 mr-4">
                        <Trophy className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-xs text-blue-200">1st Place</div>
                        <div className="font-bold">Emma Rodriguez</div>
                        <div className="text-sm text-blue-200">95 points • 12 interviews</div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                      <div className="bg-gray-300 text-blue-800 rounded-full p-2 mr-4">
                        <Trophy className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-xs text-blue-200">2nd Place</div>
                        <div className="font-bold">Michael Chen</div>
                        <div className="text-sm text-blue-200">93 points • 10 interviews</div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                      <div className="bg-amber-700 text-blue-800 rounded-full p-2 mr-4">
                        <Trophy className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-xs text-blue-200">3rd Place</div>
                        <div className="font-bold">{currentUser.name}</div>
                        <div className="text-sm text-blue-200">91 points • 8 interviews</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="global" className="mb-8">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="global" className="flex items-center justify-center">
                  <Users className="h-4 w-4 mr-2" />
                  Global
                </TabsTrigger>
                <TabsTrigger value="category" className="flex items-center justify-center">
                  <BrainCircuit className="h-4 w-4 mr-2" />
                  By Category
                </TabsTrigger>
                <TabsTrigger value="monthly" className="flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Monthly
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="global">
                <LeaderboardTable />
              </TabsContent>
              
              <TabsContent value="category">
                <div className="rounded-lg border overflow-hidden bg-white/40 backdrop-blur-sm flex items-center justify-center p-12">
                  <div className="text-center">
                    <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Premium Feature</h3>
                    <p className="text-muted-foreground mb-4 max-w-md">
                      Upgrade to access category-specific leaderboards and see how you 
                      rank in different interview skill areas.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="monthly">
                <div className="rounded-lg border overflow-hidden bg-white/40 backdrop-blur-sm flex items-center justify-center p-12">
                  <div className="text-center">
                    <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Premium Feature</h3>
                    <p className="text-muted-foreground mb-4 max-w-md">
                      Upgrade to access monthly leaderboards and track your progress 
                      over time compared to other candidates.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="rounded-lg border bg-white shadow-sm p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">How Rankings Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Score Calculation</h3>
                  <p className="text-sm text-muted-foreground">
                    Your score is calculated based on the quality of your answers, 
                    communication skills, technical knowledge, and problem-solving abilities.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Ranking Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Leaderboards are updated in real-time as users complete interviews. 
                    Your position may change as others improve their performance.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Improving Your Rank</h3>
                  <p className="text-sm text-muted-foreground">
                    Practice regularly, focus on your improvement areas, and apply the 
                    feedback from each interview to climb up the leaderboard rankings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
