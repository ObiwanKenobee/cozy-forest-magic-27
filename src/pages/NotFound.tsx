
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container max-w-md mx-auto px-4 py-16 text-center">
        <h1 className="text-8xl font-bold mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>404</h1>
        <p className="text-xl mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          The page you're looking for cannot be found.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center gap-2 btn-primary opacity-0 animate-fade-in" 
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          <ArrowLeft size={16} />
          Return Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
