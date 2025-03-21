
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MailIcon, LockIcon, User, Eye, EyeOff } from 'lucide-react';
import { useFadeIn } from '@/lib/animations';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm = ({ type }: AuthFormProps) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  // Form animation
  const formAnimation = useFadeIn(100);
  const titleAnimation = useFadeIn(0);
  const fieldAnimation1 = useFadeIn(200);
  const fieldAnimation2 = useFadeIn(300);
  const fieldAnimation3 = useFadeIn(400);
  const buttonAnimation = useFadeIn(500);
  const switchAnimation = useFadeIn(600);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, we'll just navigate to the dashboard
    navigate('/dashboard');
  };
  
  return (
    <div 
      className="w-full max-w-md mx-auto"
      style={formAnimation}
    >
      <div className="text-center mb-8" style={titleAnimation}>
        <h1 className="text-3xl font-bold tracking-tight">
          {type === 'login' ? 'Welcome back' : 'Create an account'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {type === 'login' 
            ? 'Enter your credentials to access your account' 
            : 'Enter your information to create an account'
          }
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {type === 'register' && (
          <div className="space-y-2" style={fieldAnimation1}>
            <Label htmlFor="name" className="text-sm font-medium">
              Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                className="pl-10"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        )}
        
        <div className="space-y-2" style={type === 'login' ? fieldAnimation1 : fieldAnimation2}>
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <div className="relative">
            <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2" style={type === 'login' ? fieldAnimation2 : fieldAnimation3}>
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            {type === 'login' && (
              <a href="#" className="text-xs text-primary hover:underline">
                Forgot password?
              </a>
            )}
          </div>
          <div className="relative">
            <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder={type === 'login' ? 'Enter your password' : 'Create a password'}
              className="pl-10"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full transition-300 hover:shadow-md"
          style={buttonAnimation}
        >
          {type === 'login' ? 'Sign In' : 'Create Account'}
        </Button>
      </form>
      
      <div 
        className="mt-6 text-center text-sm"
        style={switchAnimation}
      >
        {type === 'login' ? (
          <p>
            Don't have an account?{' '}
            <a href="/register" className="text-primary hover:underline font-medium">
              Sign up
            </a>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <a href="/" className="text-primary hover:underline font-medium">
              Sign in
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
