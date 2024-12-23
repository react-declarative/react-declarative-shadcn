import { FormSwitch } from "@/components/ui/form";

import { ISwitchSlot } from "react-declarative";

export const Switch = ({
  onChange,
  value,
  title,
}: ISwitchSlot) => {
  return (
    <FormSwitch
      onChange={onChange}
      value={value}
      label={title}
    />
  );  
}

export default Switch;
