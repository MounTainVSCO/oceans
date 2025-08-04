export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold">oceans</span>
            </div>
            <p className="text-gray-400">
              AI-powered no-code website builder for job seekers, freelancers, and personal brand builders.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/features" className="hover:text-white">Features</a></li>
              <li><a href="/templates" className="hover:text-white">Templates</a></li>
              <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="/api" className="hover:text-white">API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="/blog" className="hover:text-white">Blog</a></li>
              <li><a href="/careers" className="hover:text-white">Careers</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/help" className="hover:text-white">Help Center</a></li>
              <li><a href="/docs" className="hover:text-white">Documentation</a></li>
              <li><a href="/status" className="hover:text-white">Status</a></li>
              <li><a href="/feedback" className="hover:text-white">Feedback</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 oceans.app. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy</a>
            <a href="/terms" className="text-gray-400 hover:text-white text-sm">Terms</a>
            <a href="/cookies" className="text-gray-400 hover:text-white text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
} 