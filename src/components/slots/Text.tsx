import { useMemo } from "react";

import { ITextSlot } from 'react-declarative';

import { FormInput, FormTextarea } from '@/components/ui/form';

const LOADING_LABEL = "Loading";

export const Text = ({
  invalid,
  incorrect,
  value,
  disabled,
  readonly,
  description = "",
  title = "",
  placeholder = "",
  inputRows = 1,
  dirty,
  loading,
  onChange,
}: ITextSlot) => {
  const error = useMemo(() => dirty ? invalid || incorrect || null : null, [dirty, invalid, incorrect]);

  if (inputRows > 1) {
    return (
      <FormTextarea
        disabled={disabled}
        readOnly={readonly}
        onChange={onChange}
        value={loading ? LOADING_LABEL : value || ""}
        error={error}
        placeholder={placeholder}
        label={title}
        description={description}
      />
    );
  }

  return (
    <FormInput
      disabled={disabled}
      readOnly={readonly}
      onChange={onChange}
      value={loading ? LOADING_LABEL : value || ""}
      error={error}
      placeholder={placeholder}
      label={title}
      description={description}
    />
  );
}

export default Text;
