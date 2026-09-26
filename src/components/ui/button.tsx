import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white hover:bg-accent-strong shadow-[0_1px_0_rgba(0,0,0,0.04)]",
        deep: "bg-deep text-on-deep hover:bg-deep-2",
        outline:
          "border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-ink/[0.03]",
        "outline-deep":
          "border border-on-deep/25 bg-transparent text-on-deep hover:border-on-deep/60 hover:bg-white/5",
        ghost: "text-ink hover:bg-ink/[0.04]",
        "ghost-deep": "text-on-deep hover:bg-white/5",
        link: "text-accent underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-full",
        md: "h-11 px-6 text-[0.95rem] rounded-full",
        lg: "h-14 px-8 text-base rounded-full",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
