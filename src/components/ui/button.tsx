"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[transform,background-color,color,border-color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2571f]/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none",
  {
    variants: {
      variant: {
        accent:
          "bg-[#c2571f] text-white hover:scale-[1.02] hover:bg-[#a8481a] hover:shadow-[0_10px_28px_rgba(194,87,31,0.28)]",
        outline:
          "border border-[#2a241c]/15 bg-[#fffdf8] text-[#2a241c] hover:-translate-y-0.5 hover:border-[#c2571f] hover:shadow-[0_8px_24px_rgba(194,87,31,0.18)]",
        default: "bg-[#2a241c] text-white hover:scale-[1.02] hover:bg-[#1c1813]",
        ghost: "bg-transparent text-[#6f6557] hover:text-[#2a241c] hover:bg-[#2a241c]/5",
      },
      size: {
        default: "h-12 px-8 text-sm",
        lg: "h-14 px-10 text-base",
        sm: "h-10 px-6 text-sm",
      },
    },
    defaultVariants: {
      variant: "accent",
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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
