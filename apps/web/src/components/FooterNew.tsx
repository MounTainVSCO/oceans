import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { Logo } from '@/components/ui/Logo';

export const FooterNew = () => {
  return (
    <footer className="bg-gradient-to-br from-amber-50/30 via-stone-50/50 to-amber-100/40 border-t border-amber-200/30">
      <Container>
        <div className="py-12">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo className="justify-center" />
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center">
            <div className="flex items-center gap-12">
              {/* Shared Timelines */}
              <Link to="/shared" className="text-stone-600 hover:text-amber-700 transition-colors duration-200 flex items-center gap-2 font-medium">
                <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                Other People's Timelines
              </Link>
              
              {/* Register */}
              <Link to="/register" className="text-stone-600 hover:text-amber-700 transition-colors duration-200 flex items-center gap-2 font-medium">
                <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                Register
              </Link>
              
              {/* Login */}
              <Link to="/login" className="text-stone-600 hover:text-amber-700 transition-colors duration-200 flex items-center gap-2 font-medium">
                <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                Login
              </Link>
            </div>
          </div>

          {/* Simple copyright */}
          <div className="mt-8 pt-6 border-t border-amber-200/30 text-center">
            <Typography variant="caption" className="text-stone-500">
              © 2025 Milestones
            </Typography>
          </div>
        </div>
      </Container>
    </footer>
  );
};
