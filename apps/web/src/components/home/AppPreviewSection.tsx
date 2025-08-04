import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Typography } from '@/components/ui/Typography';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

export function AppPreviewSection() {
  return (
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
  );
}