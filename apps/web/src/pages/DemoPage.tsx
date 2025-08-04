import { Header } from '@/components/Header';
import { FooterNew as Footer } from '@/components/FooterNew';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Typography } from '@/components/ui/Typography';
import { TimelineItem } from '@/components/ui/TimelineItem';
import { Button } from '@/components/Button';
import { Link } from 'react-router-dom';

export function DemoPage() {
  const milestones = [
    {
      title: "Started freelance design work",
      date: "Dec 2024",
      description: "Finally took the leap and went independent"
    },
    {
      title: "Completed marathon training",
      date: "Nov 2024", 
      description: "6 months of early morning runs paid off"
    },
    {
      title: "Launched personal website",
      date: "Oct 2024",
      description: "Built from scratch using React and Tailwind"
    },
    {
      title: "Adopted Luna (rescue cat)",
      date: "Sep 2024",
      description: "Best decision of the year, honestly"
    },
    {
      title: "Started therapy",
      date: "Aug 2024",
      description: "Finally prioritized my mental health"
    },
    {
      title: "Published first article",
      date: "Jul 2024",
      description: "1,200 words on sustainable design practices"
    },
    {
      title: "Completed coding bootcamp",
      date: "Jun 2024",
      description: "12 intensive weeks, changed my career path"
    },
    {
      title: "Moved to Portland",
      date: "May 2024",
      description: "New city, new chapter"
    },
    {
      title: "Learned to play guitar",
      date: "Mar 2024",
      description: "Can finally play more than just Wonderwall"
    },
    {
      title: "Got promoted to Senior Designer",
      date: "Feb 2024",
      description: "Recognition for 3 years of hard work"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <Section padding="lg">
        <Container size="md">
          <div className="text-center mb-16">
            <Typography variant="h1" className="mb-6">
              Demo Timeline
            </Typography>
            <Typography variant="body" className="max-w-2xl mx-auto mb-8">
              This is what a year of milestones looks like. Clean, chronological, 
              and focused on what matters. Every entry tells part of your story.
            </Typography>
            <Button 
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium tracking-wide" 
              asChild
            >
              <Link to="/register">Start Your Own Timeline</Link>
            </Button>
          </div>

          {/* Timeline */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <Typography variant="h3">2024 Milestones</Typography>
                <Typography variant="overline" className="text-gray-500">
                  {milestones.length} entries
                </Typography>
              </div>

              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <TimelineItem
                    key={index}
                    title={milestone.title}
                    date={milestone.date}
                    description={milestone.description}
                  />
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <Typography variant="caption" className="text-gray-500">
                  Timeline started May 2024 • Last updated December 2024
                </Typography>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Typography variant="h3" className="mb-4">
              Your story is worth documenting
            </Typography>
            <Typography variant="body" className="mb-8 max-w-xl mx-auto">
              Every achievement, every milestone, every moment of growth. 
              Start building your personal archive today.
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white font-medium tracking-wide" 
                asChild
              >
                <Link to="/register">Create Account</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium tracking-wide" 
                asChild
              >
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
}
