import { Link } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { FooterNew as Footer } from '@/components/FooterNew';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Grid } from '@/components/ui/Grid';
import { Typography } from '@/components/ui/Typography';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { TimelineItem } from '@/components/ui/TimelineItem';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

export function HomePage() {
  const { isAuthenticated } = useAuthContext();

  // Simple geometric icons
  const CheckIcon = () => (
    <div className="w-6 h-6 border-2 border-white rounded-sm" />
  );

  const LineIcon = () => (
    <div className="w-6 h-0.5 bg-white" />
  );

  const GridIcon = () => (
    <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
      <div className="bg-white rounded-sm" />
      <div className="bg-white rounded-sm" />
      <div className="bg-white rounded-sm" />
      <div className="bg-white rounded-sm" />
    </div>
  );

  return (
    <div className="bg-white">
      <Header />

      {/* Hero Section */}
      <Section padding="xl">
        <Container size="md">
          <div className="text-center">
            <Typography variant="h1" className="mb-8">
              Your life,
              <br />
              <span className="text-gray-400">worth remembering</span>
            </Typography>
            <Typography variant="body" className="mb-12 max-w-2xl mx-auto">
              A clean, personal archive for the moments that matter. Track achievements, 
              milestones, and turning points without the noise. See how far you've come.
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Button 
                  size="lg" 
                  className="bg-gray-900 hover:bg-gray-800 text-white font-medium tracking-wide" 
                  asChild
                >
                  <Link to="/dashboard">View Your Timeline</Link>
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  className="bg-gray-900 hover:bg-gray-800 text-white font-medium tracking-wide" 
                  asChild
                >
                  <Link to="/register">Start Your Timeline</Link>
                </Button>
              )}
              <Button 
                variant="outline" 
                size="lg" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium tracking-wide" 
                asChild
              >
                <Link to="/demo">See Example</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Timeline Preview */}
      <Section variant="gray">
        <Container size="md">
          <div className="bg-white rounded-sm border border-gray-200 p-8 shadow-sm">
            <Typography variant="h3" className="mb-8 text-center">
              Not just another journal
            </Typography>
            
            <div className="space-y-6">
              <TimelineItem
                title="Started therapy"
                date="Mar 2024"
                description="Finally prioritized my mental health"
              />
              <TimelineItem
                title="Published first article"
                date="Aug 2024"
                description="1,200 words on sustainable design practices"
              />
              <TimelineItem
                title="Moved to Portland"
                date="Jan 2025"
                description="New city, new chapter"
                isActive={false}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* App Preview */}
      <Section>
        <Container size="lg">
          <div className="text-center mb-16">
            <Typography variant="h2" className="mb-4">
              Simple. Clean. Yours.
            </Typography>
            <Typography variant="body" className="max-w-2xl mx-auto">
              Every milestone gets the attention it deserves. No clutter, 
              no distractions—just your achievements in chronological order.
            </Typography>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <ImagePlaceholder 
              height={500} 
              label="App Screenshot"
              className="rounded-sm border border-gray-200"
            />
          </div>
        </Container>
      </Section>

      {/* Features Grid */}
      <Section variant="gray">
        <Container size="lg">
          <div className="text-center mb-16">
            <Typography variant="h2" className="mb-4">
              Built for reflection
            </Typography>
            <Typography variant="body">
              Tools that help you see patterns, growth, and progress over time
            </Typography>
          </div>

          <Grid cols={3} gap="xl">
            <FeatureCard
              icon={<CheckIcon />}
              title="Simple logging"
              description="Add moments in seconds. Date, title, note. That's it. No complex forms or overwhelming options."
            />
            <FeatureCard
              icon={<LineIcon />}
              title="Visual timelines"
              description="See your progress over time. Clean, chronological views that make patterns and growth visible."
            />
            <FeatureCard
              icon={<GridIcon />}
              title="Yearly summaries"
              description="Reflect on your year. Automatic summaries show what you accomplished and how you evolved."
            />
          </Grid>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section>
        <Container size="lg">
          <div className="text-center">
            <Typography variant="h2" className="mb-16">
              Your achievements matter
            </Typography>
            
            <Grid cols={3} gap="xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-900 rounded-sm mx-auto mb-4 flex items-center justify-center">
                  <Typography variant="h3" className="text-white">∞</Typography>
                </div>
                <Typography variant="h4" className="mb-2">Unlimited</Typography>
                <Typography variant="caption">milestones to track</Typography>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-900 rounded-sm mx-auto mb-4 flex items-center justify-center">
                  <Typography variant="h3" className="text-white">⚡</Typography>
                </div>
                <Typography variant="h4" className="mb-2">Instant</Typography>
                <Typography variant="caption">entry creation</Typography>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-900 rounded-sm mx-auto mb-4 flex items-center justify-center">
                  <Typography variant="h3" className="text-white">🎯</Typography>
                </div>
                <Typography variant="h4" className="mb-2">Focused</Typography>
                <Typography variant="caption">on what matters</Typography>
              </div>
            </Grid>
          </div>
        </Container>
      </Section>

      {/* Social Proof */}
      <Section variant="gray">
        <Container size="md">
          <div className="text-center">
            <Typography variant="h3" className="mb-8">
              Used by people building meaningful lives
            </Typography>
            
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-sm border border-gray-200">
                <Typography variant="body" className="mb-4 italic">
                  "Finally, a place to document my wins without the social media noise. 
                  It's like having a private celebration space for my achievements."
                </Typography>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full" />
                  <div>
                    <Typography variant="caption" className="font-medium text-gray-900">Sarah Chen</Typography>
                    <Typography variant="caption" className="block text-gray-500">Product Designer</Typography>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-sm border border-gray-200">
                <Typography variant="body" className="mb-4 italic">
                  "I love looking back at my timeline from 2023. I accomplished way more 
                  than I thought. This app helps me see my actual progress."
                </Typography>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full" />
                  <div>
                    <Typography variant="caption" className="font-medium text-gray-900">Marcus Torres</Typography>
                    <Typography variant="caption" className="block text-gray-500">Freelance Writer</Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="dark">
        <Container size="md">
          <div className="text-center">
            <Typography variant="h2" className="text-white mb-6">
              Start building your archive
            </Typography>
            <Typography variant="body" className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Every milestone matters. Every achievement counts. 
              Begin documenting the moments that define your journey.
            </Typography>
            {isAuthenticated ? (
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100 font-medium tracking-wide" 
                asChild
              >
                <Link to="/dashboard">Open Timeline</Link>
              </Button>
            ) : (
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100 font-medium tracking-wide" 
                asChild
              >
                <Link to="/register">Create Account</Link>
              </Button>
            )}
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
}
