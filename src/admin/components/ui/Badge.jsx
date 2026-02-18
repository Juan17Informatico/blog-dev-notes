import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors', {
  variants: {
    variant: {
      default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
      primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
      secondary: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
      success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
      danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const Badge = React.forwardRef(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
);
Badge.displayName = 'Badge';
