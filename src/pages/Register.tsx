
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { MessageSquare } from 'lucide-react';

const Register = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left column (illustration) */}
        <div className="hidden lg:block w-1/2 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2684')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-primary/90 to-primary"></div>
          <div className="relative h-full flex flex-col justify-center items-center px-12 text-white">
            <h2 className="text-4xl font-bold mb-6 text-center">
              Join Thousands of Successful Candidates
            </h2>
            <p className="text-xl text-center max-w-md mb-10">
              Our AI-powered platform has helped thousands of job seekers land their dream jobs.
            </p>
            <div className="space-y-6 w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl">
                <div className="text-lg font-medium mb-2">
                  "The feedback was incredibly helpful. I landed a job at a top tech company after just 2 weeks of practice!"
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-10 h-10 rounded-full bg-white/30 mr-3"></div>
                  <div>
                    <div className="font-medium">Sarah J.</div>
                    <div className="text-sm opacity-80">Software Engineer</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl">
                <div className="text-lg font-medium mb-2">
                  "The AI provided insights into my communication style that I never would have noticed myself."
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-10 h-10 rounded-full bg-white/30 mr-3"></div>
                  <div>
                    <div className="font-medium">Michael T.</div>
                    <div className="text-sm opacity-80">Product Manager</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column (form) */}
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
          
          <AuthForm type="register" />
        </div>
      </div>
    </div>
  );
};

export default Register;
