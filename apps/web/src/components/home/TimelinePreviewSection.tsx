import { useState } from 'react';
import { TimelineItem } from '@/components/ui/TimelineItem';
import { GridItem } from '@/components/ui/GridItem';
import { CalendarItem } from '@/components/ui/CalendarItem';

type ViewType = 'timeline' | 'grid' | 'calendar';

const sampleEvents = [
  {
    title: "Graduated with Computer Science degree",
    date: "May 15",
    category: "Education",
    description: "Four years of hard work paid off. Magna cum laude with a focus on machine learning and software engineering.",
    image: true,
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop&crop=center"
  },
  {
    title: "Started therapy",
    date: "Jun 22",
    category: "Personal Growth",
    description: "Finally prioritized my mental health. Best decision I've made for myself this year.",
    image: true,
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=center"
  },
  {
    title: "Landed first software engineering job",
    date: "Aug 03",
    category: "Career",
    description: "Joined a startup as a full-stack developer. Excited to build products that matter.",
    image: true,
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop&crop=center"
  },
  {
    title: "Published first technical article",
    date: "Oct 12",
    category: "Achievement",
    description: "1,200 words on sustainable design practices. Got featured on the company blog and shared widely.",
    image: true,
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b696?w=400&h=300&fit=crop&crop=center"
  },
  {
    title: "Adopted Luna (my cat)",
    date: "Nov 28",
    category: "Life Event",
    description: "She chose me at the shelter. Now I can't imagine life without her morning wake-up calls.",
    image: true,
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop&crop=center"
  },
  {
    title: "Completed first marathon",
    date: "Dec 15",
    category: "Personal Achievement",
    description: "26.2 miles in 4:23:17. Every step was worth it. Already planning the next one.",
    image: true,
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
    isActive: false
  }
];

export function TimelinePreviewSection() {
  const [activeView, setActiveView] = useState<ViewType>('timeline');

  const ViewButton = ({ view, label, icon }: { view: ViewType; label: string; icon: string }) => (
    <button
      onClick={() => setActiveView(view)}
      className={`group relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors focus:outline-none ${
        activeView === view
          ? 'text-foreground'
          : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {activeView === view && (
        <div className="absolute -inset-x-2 inset-y-0 bg-foreground/5 rounded-md" />
      )}
      <span className="relative">{icon}</span>
      <span className="relative">{label}</span>
    </button>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'timeline':
        return (
          <div className="max-w-4xl mx-auto">
            {sampleEvents.map((event, index) => (
              <TimelineItem key={index} {...event} />
            ))}
          </div>
        );
      
      case 'grid':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {sampleEvents.map((event, index) => (
              <GridItem key={index} {...event} />
            ))}
          </div>
        );
      
      case 'calendar':
        return (
          <div className="max-w-3xl mx-auto space-y-2">
            {sampleEvents.map((event, index) => (
              <CalendarItem key={index} {...event} />
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          Your life, beautifully archived
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto">
          Track the moments that matter. From career milestones to personal breakthroughs, 
          build a timeline of your growth and achievements. Choose how you want to view your story.
        </p>
      </div>
      
      {/* View switcher - integrated into the page flow */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
          <ViewButton view="timeline" label="Timeline" icon="━" />
          <ViewButton view="grid" label="Grid" icon="▦" />
          <ViewButton view="calendar" label="Calendar" icon="📅" />
        </div>
      </div>
      
      {/* Year indicator */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <div className="h-px bg-border flex-1 max-w-24" />
        <span className="text-2xl font-mono font-bold text-foreground px-6">
          2024
        </span>
        <div className="h-px bg-border flex-1 max-w-24" />
      </div>
      
      {/* Dynamic content */}
      <div className="min-h-[700px] mb-16">
        {renderContent()}
      </div>
      
      {/* Bottom indicator - subtle and integrated */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">
            Preview • 6 of 47 life moments • {activeView} view
          </span>
        </div>
      </div>
    </section>
  );
}