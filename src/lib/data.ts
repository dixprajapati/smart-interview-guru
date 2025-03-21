
// Mock data for demonstration purposes

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Interview {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'scheduled' | 'in-progress';
  score?: number;
  duration?: number;
}

export interface Question {
  id: string;
  text: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Answer {
  id: string;
  questionId: string;
  text: string;
  evaluation: {
    score: number;
    feedback: string;
    strengths: string[];
    improvements: string[];
  };
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  userAvatar?: string;
  position: number;
  score: number;
  interviewsCompleted: number;
  bestCategory: string;
}

// Mock user data
export const currentUser: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://i.pravatar.cc/150?img=68'
};

// Mock interview data
export const recentInterviews: Interview[] = [
  {
    id: 'i1',
    title: 'Software Engineering Interview',
    date: '2023-10-15',
    status: 'completed',
    score: 87,
    duration: 45
  },
  {
    id: 'i2',
    title: 'Product Management Interview',
    date: '2023-10-20',
    status: 'completed',
    score: 92,
    duration: 52
  },
  {
    id: 'i3',
    title: 'Data Science Interview',
    date: '2023-10-28',
    status: 'scheduled'
  },
  {
    id: 'i4',
    title: 'UX Design Interview',
    date: '2023-10-30',
    status: 'in-progress'
  }
];

// Mock interview questions
export const interviewQuestions: Question[] = [
  {
    id: 'q1',
    text: 'Describe a challenging problem you faced in a project and how you resolved it.',
    category: 'Problem Solving',
    difficulty: 'medium'
  },
  {
    id: 'q2',
    text: 'How do you handle conflicts within a team?',
    category: 'Teamwork',
    difficulty: 'medium'
  },
  {
    id: 'q3',
    text: 'Explain a complex technical concept in simple terms.',
    category: 'Communication',
    difficulty: 'hard'
  },
  {
    id: 'q4',
    text: 'What are your long-term career goals?',
    category: 'Career Planning',
    difficulty: 'easy'
  },
  {
    id: 'q5',
    text: 'How do you prioritize your work when managing multiple projects?',
    category: 'Time Management',
    difficulty: 'medium'
  }
];

// Mock answers with feedback
export const userAnswers: Answer[] = [
  {
    id: 'a1',
    questionId: 'q1',
    text: 'In my last project, we faced a critical performance issue with our database queries that was causing timeouts. I analyzed the query execution plans, identified inefficient joins, and implemented indexing strategies that reduced query time by 80%. I also introduced caching for frequently accessed data which further improved performance.',
    evaluation: {
      score: 92,
      feedback: 'Strong answer with specific details and measurable results.',
      strengths: [
        'Clearly identified the problem',
        'Demonstrated technical knowledge',
        'Provided quantifiable results',
        'Showed initiative in implementing additional solutions'
      ],
      improvements: [
        'Could mention collaboration with team members',
        'Consider adding how you documented the solution for future reference'
      ]
    }
  },
  {
    id: 'a2',
    questionId: 'q2',
    text: 'I believe open communication is key to resolving conflicts. In one instance, two team members had different approaches to a project. I organized a meeting where each person could express their ideas, facilitated a discussion of pros and cons, and helped the team reach a compromise that incorporated the best elements of both approaches.',
    evaluation: {
      score: 85,
      feedback: 'Good approach to conflict resolution with a concrete example.',
      strengths: [
        'Emphasized communication',
        'Took initiative to facilitate resolution',
        'Found a compromise solution',
        'Remained neutral in the process'
      ],
      improvements: [
        'Could elaborate on preventing similar conflicts in the future',
        'Consider discussing how you follow up after conflict resolution'
      ]
    }
  }
];

// Mock leaderboard data
export const leaderboardData: LeaderboardEntry[] = [
  {
    userId: 'u2',
    userName: 'Emma Rodriguez',
    userAvatar: 'https://i.pravatar.cc/150?img=5',
    position: 1,
    score: 95,
    interviewsCompleted: 12,
    bestCategory: 'Technical Skills'
  },
  {
    userId: 'u3',
    userName: 'Michael Chen',
    userAvatar: 'https://i.pravatar.cc/150?img=8',
    position: 2,
    score: 93,
    interviewsCompleted: 10,
    bestCategory: 'Problem Solving'
  },
  {
    userId: 'u1',
    userName: 'Alex Johnson',
    userAvatar: 'https://i.pravatar.cc/150?img=68',
    position: 3,
    score: 91,
    interviewsCompleted: 8,
    bestCategory: 'Communication'
  },
  {
    userId: 'u4',
    userName: 'Sarah Williams',
    userAvatar: 'https://i.pravatar.cc/150?img=10',
    position: 4,
    score: 89,
    interviewsCompleted: 9,
    bestCategory: 'Leadership'
  },
  {
    userId: 'u5',
    userName: 'James Brown',
    userAvatar: 'https://i.pravatar.cc/150?img=12',
    position: 5,
    score: 87,
    interviewsCompleted: 7,
    bestCategory: 'Teamwork'
  },
  {
    userId: 'u6',
    userName: 'Olivia Martinez',
    userAvatar: 'https://i.pravatar.cc/150?img=16',
    position: 6,
    score: 85,
    interviewsCompleted: 6,
    bestCategory: 'Critical Thinking'
  },
  {
    userId: 'u7',
    userName: 'Daniel Lee',
    userAvatar: 'https://i.pravatar.cc/150?img=3',
    position: 7,
    score: 84,
    interviewsCompleted: 8,
    bestCategory: 'Adaptability'
  },
  {
    userId: 'u8',
    userName: 'Sophia Miller',
    userAvatar: 'https://i.pravatar.cc/150?img=20',
    position: 8,
    score: 82,
    interviewsCompleted: 5,
    bestCategory: 'Time Management'
  }
];

// Performance data for charts
export const performanceData = {
  categories: [
    { name: 'Communication', score: 85 },
    { name: 'Problem Solving', score: 92 },
    { name: 'Technical Knowledge', score: 78 },
    { name: 'Leadership', score: 70 },
    { name: 'Time Management', score: 88 }
  ],
  progression: [
    { date: '2023-08-01', score: 65 },
    { date: '2023-08-15', score: 72 },
    { date: '2023-09-01', score: 78 },
    { date: '2023-09-15', score: 82 },
    { date: '2023-10-01', score: 87 },
    { date: '2023-10-15', score: 91 }
  ]
};
