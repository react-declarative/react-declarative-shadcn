import * as React from 'react';
import { cn } from '@/lib/utils';

const Text = React.forwardRef<HTMLSpanElement, React.ComponentProps<"span">>(
  ({ className, ...props }, ref) => {
    return (
      <span
        className={cn("text-base text-foreground web:select-text", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";


export { Text };
