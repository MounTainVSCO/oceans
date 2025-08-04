import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Typography } from '@/components/ui/Typography';

export function SocialProofSection() {
  return (
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
  );
}