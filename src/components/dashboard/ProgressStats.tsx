
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Clock, Award, TrendingUp, BrainCircuit } from 'lucide-react';
import { performanceData } from '@/lib/data';
import { useCountAnimation } from '@/lib/animations';

const COLORS = ['#0088FE', '#36B5C8', '#5F9DF7', '#FF8042', '#A288E3'];

const ProgressStats = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const totalScore = 91;
  const interviewsCompleted = 8;
  const animatedScore = useCountAnimation(totalScore);
  const animatedInterviews = useCountAnimation(interviewsCompleted);
  
  const stats = [
    {
      title: 'Overall Score',
      value: animatedScore,
      icon: <Award className="w-5 h-5" />,
      change: '+4%',
      description: 'from last month',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Interviews Completed',
      value: animatedInterviews,
      icon: <Clock className="w-5 h-5" />,
      change: '+2',
      description: 'from last month',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Progress Rate',
      value: '68%',
      icon: <TrendingUp className="w-5 h-5" />,
      change: '+15%',
      description: 'from last month',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Best Category',
      value: 'Problem Solving',
      icon: <BrainCircuit className="w-5 h-5" />,
      change: '',
      description: '92% score',
      color: 'bg-orange-50 text-orange-600'
    }
  ];
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-lg rounded-md border">
          <p className="text-sm font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className={cn("transition-all duration-300 hover:shadow-md overflow-hidden border-t-4", {
            'border-t-blue-500': index === 0,
            'border-t-green-500': index === 1,
            'border-t-purple-500': index === 2,
            'border-t-orange-500': index === 3,
          })}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={cn("rounded-full p-1.5", stat.color)}>
                {stat.icon}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.change && (
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs font-medium text-green-600">{stat.change}</span>
                <span className="text-xs text-muted-foreground">{stat.description}</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      
      <Card className="col-span-1 md:col-span-2 overflow-hidden shadow-sm hover:shadow-md transition-300">
        <CardHeader>
          <CardTitle>Performance by Category</CardTitle>
          <CardDescription>
            Your scores across different interview skills
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-64">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData.categories}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="col-span-1 md:col-span-2 overflow-hidden shadow-sm hover:shadow-md transition-300">
        <CardHeader>
          <CardTitle>Progress Over Time</CardTitle>
          <CardDescription>
            Your interview performance trajectory
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center pt-0">
          <div className="h-64 w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceData.categories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="score"
                    nameKey="name"
                    label={({ name, score }) => `${name}: ${score}`}
                    labelLine={false}
                  >
                    {performanceData.categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressStats;
