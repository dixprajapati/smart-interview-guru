
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { MessageSquare } from 'lucide-react';

const Login = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left column (form) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-10 flex items-center justify-center">
            <Link 
              to="/" 
              className="flex items-center text-primary font-semibold text-xl tracking-tight"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mr-2 bg-primary text-white">
                <MessageSquare className="h-6 w-6" />
              </div>
              <span className="text-2xl">InterviewAI</span>
            </Link>
          </div>
          
          <AuthForm type="login" />
        </div>
        
        {/* Right column (illustration) */}
        <div className="hidden lg:block w-1/2 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary"></div>
          <div className="relative h-full flex flex-col justify-center items-center px-12 text-white">
            <h2 className="text-4xl font-bold mb-6 text-center">
              Ace Your Next Interview with AI
            </h2>
            <p className="text-xl text-center max-w-md mb-10">
              Practice with our AI-powered interview coach and receive personalized feedback to improve your skills.
            </p>
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-sm">Practice Questions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-sm">User Satisfaction</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-sm">Practice Anytime</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="text-4xl font-bold mb-2">85%</div>
                <div className="text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
