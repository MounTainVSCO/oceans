import { useState } from 'react';
import { Button } from '@/components/Button';
import { Typography } from '@/components/ui/Typography';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

interface OnboardingProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const examples = [
    {
      title: "Started therapy",
      description: "Finally prioritized my mental health",
      category: "health"
    },
    {
      title: "Learned to play guitar",
      description: "Can finally play more than just Wonderwall",
      category: "learning"
    },
    {
      title: "Got promoted to Senior Designer",
      description: "Recognition for 3 years of hard work",
      category: "career"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Section padding="xl">
        <Container size="md">
          <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <Typography variant="caption" className="text-gray-500">
                  Step {step} of {totalSteps}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  {Math.round((step / totalSteps) * 100)}% complete
                </Typography>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-gray-900 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-sm border border-gray-200 p-8">
              {step === 1 && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-900 rounded-sm mx-auto mb-6 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white rounded-sm" />
                  </div>
                  <Typography variant="h2" className="mb-4">
                    Welcome to Milestones
                  </Typography>
                  <Typography variant="body" className="mb-8 max-w-lg mx-auto">
                    This is your personal archive for life's meaningful moments. 
                    Think of it as a digital scrapbook for achievements, turning points, 
                    and memories worth preserving.
                  </Typography>
                  <div className="space-y-4 mb-8">
                    <div className="text-left p-4 bg-gray-50 rounded-sm">
                      <Typography variant="h4" className="mb-1">📚 Not just any milestone</Typography>
                      <Typography variant="caption" className="text-gray-600">
                        Focus on moments that feel significant to you—big or small
                      </Typography>
                    </div>
                    <div className="text-left p-4 bg-gray-50 rounded-sm">
                      <Typography variant="h4" className="mb-1">🎯 Quality over quantity</Typography>
                      <Typography variant="caption" className="text-gray-600">
                        This isn't about daily habits—it's about meaningful moments
                      </Typography>
                    </div>
                    <div className="text-left p-4 bg-gray-50 rounded-sm">
                      <Typography variant="h4" className="mb-1">📈 See your growth</Typography>
                      <Typography variant="caption" className="text-gray-600">
                        Build a timeline that shows how far you've come
                      </Typography>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <Typography variant="h2" className="mb-4 text-center">
                    What counts as a milestone?
                  </Typography>
                  <Typography variant="body" className="mb-8 text-center">
                    Anything that feels meaningful to you. Here are some examples 
                    from other users to get you thinking:
                  </Typography>
                  
                  <div className="space-y-4 mb-8">
                    {examples.map((example, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-sm">
                        <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Typography variant="h4">{example.title}</Typography>
                            <span className="px-2 py-1 bg-white text-gray-600 text-xs rounded-sm uppercase tracking-wider">
                              {example.category}
                            </span>
                          </div>
                          <Typography variant="caption" className="text-gray-600">
                            {example.description}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-sm">
                    <Typography variant="caption" className="text-blue-800">
                      <strong>Pro tip:</strong> Start with recent accomplishments and work backwards. 
                      What made you proud in the last few months?
                    </Typography>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-900 rounded-sm mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <Typography variant="h2" className="mb-4">
                    You're all set!
                  </Typography>
                  <Typography variant="body" className="mb-8 max-w-lg mx-auto">
                    Ready to start building your personal archive? 
                    Add your first milestone and begin documenting your journey.
                  </Typography>
                  
                  <div className="bg-gray-50 p-6 rounded-sm mb-8">
                    <Typography variant="h4" className="mb-2">
                      What to add first?
                    </Typography>
                    <Typography variant="caption" className="text-gray-600">
                      Think about something you accomplished recently that made you feel proud, 
                      learned something new, or marked a turning point in your life.
                    </Typography>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-8">
                {step > 1 && (
                  <Button 
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                )}
                <div className="flex-1" />
                <Button 
                  className="bg-gray-900 hover:bg-gray-800 text-white font-medium tracking-wide"
                  onClick={nextStep}
                >
                  {step === totalSteps ? 'Start Adding Milestones' : 'Continue'}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
