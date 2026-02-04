import { CheckCircle2 } from 'lucide-react';

interface Step {
  step: number;
  title: string;
  description: string;
}

interface StepsProps {
  steps: Step[];
  variant?: 'horizontal' | 'vertical';
}

export function Steps({ steps, variant = 'horizontal' }: StepsProps) {
  if (variant === 'vertical') {
    return (
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                {step.step}
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-full bg-border mt-2" />
              )}
            </div>
            <div className="pb-6">
              <h4 className="font-semibold mb-1">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {steps.map((step, index) => (
        <div key={step.step} className="relative">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-4">
              {step.step}
            </div>
            <h4 className="font-semibold mb-2">{step.title}</h4>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
          {index < steps.length - 1 && (
            <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-border" />
          )}
        </div>
      ))}
    </div>
  );
}

// Status timeline component for request tracking
interface StatusTimelineProps {
  items: Array<{
    status: string;
    date: string;
    note?: string;
    isActive?: boolean;
  }>;
}

export function StatusTimeline({ items }: StatusTimelineProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              item.isActive 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              <CheckCircle2 className="h-5 w-5" />
            </div>
            {index < items.length - 1 && (
              <div className="w-0.5 flex-1 bg-border mt-2" />
            )}
          </div>
          <div className="pb-6">
            <div className="flex items-center gap-3 mb-1">
              <span className={`font-medium ${item.isActive ? 'text-primary' : ''}`}>
                {item.status}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(item.date).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            {item.note && (
              <p className="text-sm text-muted-foreground">{item.note}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

