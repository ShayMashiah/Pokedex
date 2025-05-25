import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GenericButtonProps extends React.ComponentProps<typeof Button> {
}

export const GenericButton = ({
  children,
  className,
  disabled,
  ...props
}: GenericButtonProps) => {
  return (
    <Button
      className={cn(className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
};
