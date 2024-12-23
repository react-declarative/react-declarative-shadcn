import * as React from 'react';
import { useMemo } from 'react';

import { FormRadioGroupItem } from '../ui/form';
import { RadioGroup } from '@/components/ui/radio-group';

import { IRadioSlot } from 'react-declarative';

export const Radio = ({
  onChange,
  name,
  title,
  value,
  disabled,
  readonly,
  radioValue,
}: IRadioSlot) => {
  return (
    <RadioGroup
      onValueChange={(value) => {
        if (readonly) {
          return;
        }
        onChange(value);
      }}
      value={value}
    >
      <FormRadioGroupItem
        name={name!}
        label={title!}
        disabled={disabled}
        radioValue={radioValue!}
        onClick={() => {
          if (readonly) {
            return;
          }
          onChange(radioValue)
        }}
      />
    </RadioGroup>
  );
}

export default Radio;
