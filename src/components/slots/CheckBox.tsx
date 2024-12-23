import { FormCheckbox } from '../ui/form';

import { ICheckBoxSlot } from 'react-declarative';

export const CheckBox = ({
    value,
    onChange,
    title,
    disabled,
}: ICheckBoxSlot) => {
    return (
        <FormCheckbox
            label={title}
            disabled={disabled}
            value={value}
            onChange={onChange}
        />
    );
}

export default CheckBox;
