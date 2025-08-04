import { Link } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Typography } from '@/components/ui/Typography';

export function CTASection() {
    const { isAuthenticated } = useAuthContext();

    return (
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
                        <Link to="/dashboard">
                            <Button
                                size="lg"
                                className="bg-white text-gray-900 hover:bg-gray-100 font-medium tracking-wide"
                            >
                                Open Timeline
                            </Button>
                        </Link>
                    ) : (
                        <Link to="/register">
                            <Button
                                size="lg"
                                className="bg-white text-gray-900 hover:bg-gray-100 font-medium tracking-wide"
                            >
                                Create Account
                            </Button>
                        </Link>
                    )}
                </div>
            </Container>
        </Section>
    );
}