import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-button-midnight-black hover:opacity-80 text-white",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-white text-neutral-ink shadow-sm hover:bg-gray-300/80 border border-gray-300 flex flex-row gap-[8px] items-center",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "rounded-[8px] px-5 py-3",
        icon: "h-9 w-9",
        md: 'min-w-[160px]  px-5 py-3 rounded-[8px]',
        xl: "min-w-[170px] min-h-[48px] rounded-[8px] px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ( { className, variant, size, asChild = false, ...props }, ref ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={ cn( buttonVariants( { variant, size, className }, ), ) }
        ref={ ref }
        { ...props }
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
