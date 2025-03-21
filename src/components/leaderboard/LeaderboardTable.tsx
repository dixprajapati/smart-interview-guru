
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, Medal, Search, Trophy, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LeaderboardEntry, leaderboardData, currentUser } from '@/lib/data';
import { useStaggeredAnimation } from '@/lib/animations';

const LeaderboardTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<LeaderboardEntry[]>(leaderboardData);
  
  const filteredData = data.filter(entry => 
    entry.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const animatedData = useStaggeredAnimation(filteredData, 50);
  
  const handleClearSearch = () => {
    setSearchTerm('');
  };
  
  const getMedalIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return <div className="w-5 h-5 flex items-center justify-center text-xs font-bold text-muted-foreground">{position}</div>;
    }
  };
  
  const getBadgeColor = (category: string) => {
    const categories: { [key: string]: string } = {
      'Technical Skills': 'bg-purple-50 text-purple-600 border-purple-200',
      'Problem Solving': 'bg-blue-50 text-blue-600 border-blue-200',
      'Communication': 'bg-green-50 text-green-600 border-green-200',
      'Leadership': 'bg-indigo-50 text-indigo-600 border-indigo-200',
      'Teamwork': 'bg-pink-50 text-pink-600 border-pink-200',
      'Critical Thinking': 'bg-amber-50 text-amber-600 border-amber-200',
      'Adaptability': 'bg-teal-50 text-teal-600 border-teal-200',
      'Time Management': 'bg-orange-50 text-orange-600 border-orange-200'
    };
    
    return categories[category] || 'bg-gray-50 text-gray-600 border-gray-200';
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Global Leaderboard</h2>
          <p className="text-muted-foreground">See how you compare with other interview candidates</p>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-9 pr-10 w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={handleClearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {filteredData.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-16 text-center">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-center">Score</TableHead>
                <TableHead className="hidden md:table-cell text-center">Interviews</TableHead>
                <TableHead className="hidden md:table-cell">Best Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {animatedData.map((entry, index) => (
                <TableRow 
                  key={entry.userId}
                  className={cn(
                    "transition-300 hover:bg-muted/20",
                    entry.userId === currentUser.id && "bg-primary/5"
                  )}
                  style={entry.style}
                >
                  <TableCell className="text-center font-medium">
                    <div className="flex justify-center">
                      {getMedalIcon(entry.position)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                        <AvatarImage src={entry.userAvatar} alt={entry.userName} />
                        <AvatarFallback>{entry.userName.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{entry.userName}</div>
                        {entry.userId === currentUser.id && (
                          <div className="text-xs text-muted-foreground">You</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {entry.score}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-center">
                    {entry.interviewsCompleted}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge 
                      variant="outline" 
                      className={cn("font-normal", getBadgeColor(entry.bestCategory))}
                    >
                      {entry.bestCategory}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No results found</h3>
          <p className="text-muted-foreground mb-4">
            We couldn't find any users matching your search criteria.
          </p>
          <Button onClick={handleClearSearch}>Clear Search</Button>
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;
