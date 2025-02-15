import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
}

type ButtonVariant = "primary" | "accent";

export default function Button({
  className,
  variant = "primary",
  ...rest
}: ButtonProps) {
  return (
    <button className={cn(`button button--${variant}`, className)} {...rest} />
  );
}
