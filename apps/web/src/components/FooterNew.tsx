import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';

export const FooterNew = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <Container>
        <div className="py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-gray-900 rounded-sm mr-2 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 border border-white rounded-sm" />
                </div>
                <span className="font-semibold text-gray-900 tracking-tight">
                  milestones
                </span>
              </div>
              <Typography variant="caption" className="max-w-sm">
                A clean, personal archive for the moments that matter. 
                Document your journey without the noise.
              </Typography>
            </div>

            {/* Product */}
            <div>
              <Typography variant="overline" className="mb-4 block">
                Product
              </Typography>
              <div className="space-y-3">
                <Link to="/features" className="block text-sm text-gray-600 hover:text-gray-900">
                  Features
                </Link>
                <Link to="/demo" className="block text-sm text-gray-600 hover:text-gray-900">
                  Demo
                </Link>
                <Link to="/pricing" className="block text-sm text-gray-600 hover:text-gray-900">
                  Pricing
                </Link>
              </div>
            </div>

            {/* Company */}
            <div>
              <Typography variant="overline" className="mb-4 block">
                Company
              </Typography>
              <div className="space-y-3">
                <Link to="/about" className="block text-sm text-gray-600 hover:text-gray-900">
                  About
                </Link>
                <Link to="/privacy" className="block text-sm text-gray-600 hover:text-gray-900">
                  Privacy
                </Link>
                <Link to="/terms" className="block text-sm text-gray-600 hover:text-gray-900">
                  Terms
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <Typography variant="caption">
              © 2025 Milestones. All rights reserved.
            </Typography>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <Link to="/status" className="text-xs text-gray-500 hover:text-gray-900 uppercase tracking-wider">
                Status
              </Link>
              <Link to="/support" className="text-xs text-gray-500 hover:text-gray-900 uppercase tracking-wider">
                Support
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
