
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  ChevronDown, 
  User, 
  LogOut, 
  Settings, 
  Menu, 
  X,
  BarChart2,
  MessageSquare,
  Award,
  Home
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from '@/lib/data';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home className="h-4 w-4 mr-2" /> },
    { path: '/interview', label: 'Interview', icon: <MessageSquare className="h-4 w-4 mr-2" /> },
    { path: '/feedback', label: 'Results', icon: <BarChart2 className="h-4 w-4 mr-2" /> },
    { path: '/leaderboard', label: 'Leaderboard', icon: <Award className="h-4 w-4 mr-2" /> },
  ];
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-300",
      scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link 
          to="/dashboard" 
          className="flex items-center text-primary font-semibold text-xl tracking-tight group"
        >
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center mr-2 bg-primary text-white transition-300 group-hover:rotate-3",
            scrolled ? "bg-opacity-100" : "bg-opacity-90"
          )}>
            <MessageSquare className="h-4 w-4" />
          </div>
          InterviewAI
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-300",
                location.pathname === link.path 
                  ? "text-primary bg-primary/10" 
                  : "text-gray-700 hover:text-primary hover:bg-gray-100"
              )}
            >
              <span className="flex items-center">
                {link.icon}
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10 border-2 border-white transition-300 hover:border-primary">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 animate-scale-in">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link to="/">
                <DropdownMenuItem className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={cn(
                    "px-4 py-3 rounded-md text-sm font-medium transition-300",
                    location.pathname === link.path 
                      ? "text-primary bg-primary/10" 
                      : "text-gray-700 hover:text-primary hover:bg-gray-100"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="flex items-center">
                    {link.icon}
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
