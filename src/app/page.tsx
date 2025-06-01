
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpenCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-accent/30 p-6 text-center">
      <div className="max-w-2xl w-full">
        <header className="mb-10">
          <BookOpenCheck className="h-20 w-20 sm:h-24 sm:w-24 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
            Welcome to MyDevJournal
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Your personal development journal and productivity tracker. Streamline your workflow and gain insights into your development journey.
          </p>
        </header>

        <main className="mb-12">
          <Link href="/login" passHref>
            <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-shadow">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </main>

        <footer className="mt-10">
          <p className="text-sm text-muted-foreground">
            Your personal dashboard for enhanced productivity and development tracking.
          </p>
        </footer>
      </div>
    </div>
  );
}
