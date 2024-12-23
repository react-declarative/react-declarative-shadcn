import { useMemo } from "react";

import { Button as UiButon } from "@/components/ui/button";

import { IButtonSlot } from "react-declarative";

const VARIANT_LIST = [
  "default",
  "destructive",
  "secondary",
  "ghost",
  "link",
  "outline",
] as const;

export const Button = ({
  click,
  title,
  placeholder,
  disabled,
  buttonVariant,
}: IButtonSlot) => {
  const variant = useMemo(() => {
    return (
      VARIANT_LIST.find((key: string) => key === buttonVariant) ?? "default"
    );
  }, [buttonVariant]);

  return (
    <UiButon disabled={disabled} variant={variant} onClick={click}>
      {title || placeholder}
    </UiButon>
  );
};

export default Button;
