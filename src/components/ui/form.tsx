import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Switch } from "./switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";
import { useMemo } from "react";
import { Checkbox } from "./checkbox";
import { RadioGroup, RadioGroupItem } from "./radio-group";

type FormError = string | null | undefined;

interface FormItemProps<T extends any> {
  label?: string;
  description?: string;
  readOnly?: boolean;
  className?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  onChange: (val: T) => void;
  value: T;
  disabled?: boolean;
}

interface IFormRadioGroupProps
  extends Omit<
    FormItemProps<string>,
    keyof {
      onValueChange: never;
    }
  > {
  error?: FormError;
}

const FormRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroup>,
  IFormRadioGroupProps
>(
  (
    { className, style, label, description, error, onChange, ...props },
    ref
  ) => {
    return (
      <FormItem className={cn(className, "gap-3")}>
        <div>
          {!!label && <FormLabel error={error}>{label}</FormLabel>}
          {!!description && (
            <FormDescription className="pt-0">{description}</FormDescription>
          )}
        </div>
        <RadioGroup ref={ref} onValueChange={onChange} {...props} />
        <FormMessage error={error} />
      </FormItem>
    );
  }
);

FormRadioGroup.displayName = "FormRadioGroup";

interface IFormRadioGroupItemProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupItem>,
    keyof {
      value: never;
      style: never;
      "aria-labelledby": never;
    }
  > {
  style?: React.CSSProperties;
  onClick?: () => void;
  name: string;
  label: string;
  description?: string;
  radioValue: string;
  error?: FormError;
}

const FormRadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroup>,
  IFormRadioGroupItemProps
>(
  (
    {
      className,
      style,
      name,
      error,
      label,
      description,
      radioValue,
      onFocus,
      onBlur,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <FormItem
        className={cn(className, "h-[25px]")}
        onClick={onClick}
        style={style}
      >
        <div className="flex-row gap-2 items-center" onClick={onClick}>
          <RadioGroupItem
            aria-labelledby={name}
            value={radioValue}
            onFocus={onFocus}
            onBlur={onBlur}
            {...props}
          />
          <FormLabel
            className="w-100%"
            error={error}
            onClick={onClick}
          >
            {label}
          </FormLabel>
        </div>
        {!!description && (
          <FormDescription error={error}>{description}</FormDescription>
        )}
      </FormItem>
    );
  }
);

FormRadioGroupItem.displayName = "FormRadioGroupItem";

interface IFormSelectProps
  extends Omit<
    FormItemProps<string | null>,
    keyof {
      onValueChange: never;
      error: never;
    }
  > {
  error?: FormError;
  placeholder?: string;
  description?: string;
  label: string;
  options: {
    value: string;
    label: string;
  }[];
}

const FormSelect = React.forwardRef<
  React.ElementRef<typeof Select>,
  IFormSelectProps
>(
  (
    {
      className,
      style,
      label,
      value,
      description,
      options,
      error,
      placeholder = label,
      onChange,
      ...props
    },
    ref
  ) => {
    const selectedOption = useMemo(
      () => options.find((option: any) => option.value === value),
      [value, options]
    );
    return (
      <FormItem className={className} style={style}>
        {!!label && <FormLabel error={error}>{label}</FormLabel>}
        <Select
          value={selectedOption?.value}
          onValueChange={(option: any) =>
            onChange(option ? option.value : null)
          }
          {...props}
        >
          <SelectTrigger>
            <SelectValue
              className="text-foreground text-sm native:text-lg"
              placeholder={placeholder}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>
              {options.map(({ label, value }: any, idx: number) => (
                <SelectItem key={`${value}-${idx}`} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {!!description && (
          <FormDescription error={error}>{description}</FormDescription>
        )}
      </FormItem>
    );
  }
);

FormSelect.displayName = "FormSelect";

interface IFormSwitchProps
  extends Omit<
    FormItemProps<boolean>,
    keyof {
      onCheckedChange: never;
      checked: never;
      style: never;
    }
  > {
  error?: FormError;
  style?: React.CSSProperties;
}

const FormSwitch = React.forwardRef<
  React.ElementRef<typeof Switch>,
  IFormSwitchProps
>(
  (
    { className, style, label, description, error, value, onChange, ...props },
    ref
  ) => {
    const switchRef = React.useRef<React.ComponentRef<typeof Switch>>(null);

    React.useImperativeHandle(
      ref,
      () => {
        if (!switchRef.current) {
          return {} as React.ComponentRef<typeof Switch>;
        }
        return switchRef.current;
      },
      [switchRef.current]
    );

    function handleOnLabelPress() {
      onChange?.(!value);
    }

    return (
      <FormItem
        onClick={handleOnLabelPress}
        className={cn(className, "px-1")}
        style={style}
      >
        <div
          className="flex-row gap-3 items-center"
          onClick={handleOnLabelPress}
        >
          <Switch
            ref={switchRef}
            aria-invalid={!!error}
            onCheckedChange={onChange}
            checked={value}
            {...props}
          />
          {!!label && (
            <FormLabel
              className="w-100%"
              error={error}
              onClick={handleOnLabelPress}
            >
              {label}
            </FormLabel>
          )}
        </div>
        {!!description && (
          <FormDescription error={error}>{description}</FormDescription>
        )}
      </FormItem>
    );
  }
);

FormSwitch.displayName = "FormSwitch";

interface IFormInputProps extends FormItemProps<string> {
  error?: FormError;
}

const FormInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  IFormInputProps
>(
  (
    { label, className, style, description, error, onChange, ...props },
    ref
  ) => {
    const inputRef = React.useRef<React.ComponentRef<typeof Input>>(null);

    React.useImperativeHandle(
      ref,
      () => {
        if (!inputRef.current) {
          return {} as React.ComponentRef<typeof Input>;
        }
        return inputRef.current;
      },
      [inputRef.current]
    );

    return (
      <FormItem
        className={className}
        style={style}
      >
        {!!label && (
          <FormLabel error={error}>
            {label}
          </FormLabel>
        )}
        <Input
          ref={inputRef}
          onChange={({ target }) => onChange(target.value)}
          {...props}
        />
        {!!description && (
          <FormDescription error={error}>
            {description}
          </FormDescription>
        )}
      </FormItem>
    );
  }
);

interface IFormTextareaProps extends FormItemProps<string> {
  error?: FormError;
}

const FormTextarea = React.forwardRef<
  React.ElementRef<typeof Textarea>,
  IFormTextareaProps
>(
  (
    { label, className, style, error, description, onChange, ...props },
    ref
  ) => {
    const textareaRef = React.useRef<React.ComponentRef<typeof Textarea>>(null);

    React.useImperativeHandle(
      ref,
      () => {
        if (!textareaRef.current) {
          return {} as React.ComponentRef<typeof Textarea>;
        }
        return textareaRef.current;
      },
      [textareaRef.current]
    );

    return (
      <FormItem
        className={className}
        style={style}
      >
        {!!label && (
          <FormLabel error={error}>
            {label}
          </FormLabel>
        )}
        <Textarea
          ref={textareaRef}
          onChange={({ target }) => onChange(target.value)}
          {...props}
        />
        {!!description && (
          <FormDescription error={error}>
            {description}
          </FormDescription>
        )}
      </FormItem>
    );
  }
);

FormTextarea.displayName = "FormTextarea";

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-2", className)} {...props} />;
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
    error?: FormError;
  }
>(({ className, error, ...props }, ref) => {
  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { error?: FormError }
>(({ className, error, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", error && "text-destructive", className)}
      {...props}
    >
      {error || children}
    </p>
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { error?: FormError }
>(({ className, error, children, ...props }, ref) => {
  if (!error) {
    return null;
  }

  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {error}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

interface IFormCheckboxProps
  extends Omit<
    FormItemProps<boolean>,
    keyof {
      onCheckedChange: never;
      checked: never;
      style: never;
    }
  > {
  error?: FormError;
  style?: React.CSSProperties;
}

const FormCheckbox = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  IFormCheckboxProps
>(
  (
    { className, style, label, error, description, value, onChange, ...props },
    ref
  ) => {
    const checkboxRef = React.useRef<React.ComponentRef<typeof Checkbox>>(null);

    React.useImperativeHandle(
      ref,
      () => {
        if (!checkboxRef.current) {
          return {} as React.ComponentRef<typeof Checkbox>;
        }
        return checkboxRef.current;
      },
      [checkboxRef.current]
    );

    function handleOnLabelPress() {
      onChange?.(!value);
    }

    return (
      <FormItem
        className={cn(className, "h-[25px]")}
        onClick={handleOnLabelPress}
        style={style}
      >
        <div
          className="flex-row gap-3 items-center"
          onClick={handleOnLabelPress}
        >
          <Checkbox
            ref={checkboxRef}
            aria-invalid={!!error}
            onCheckedChange={onChange}
            checked={value}
            {...props}
          />
          {!!label && (
            <FormLabel
              className="w-100%"
              error={error}
              onClick={handleOnLabelPress}
            >
              {label}
            </FormLabel>
          )}
        </div>
        {!!description && (
          <FormDescription onClick={handleOnLabelPress} error={error}>
            {description}
          </FormDescription>
        )}
      </FormItem>
    );
  }
);

FormCheckbox.displayName = "FormCheckbox";


interface IFormGroupProps extends Omit<React.ComponentPropsWithoutRef<typeof FormLabel>, keyof {
  name: never;
  value: never;
  "aria-labelledby": never;
}> {
  name?: string;
  label?: string;
  description?: string;
  onClick?: () => void;
  error?: FormError;
}

const FormGroup = React.forwardRef<
  React.ElementRef<typeof FormItem>,
  IFormGroupProps
>(({ className, onClick, style, name, error, label, description, ...props }, ref) => {
  return (
    <FormItem onClick={onClick} className={className} style={style} ref={ref}>
      {!!label && <FormLabel error={error} {...props}>{label}</FormLabel>}
      {!!description && <FormDescription className='pt-0'>{description}</FormDescription>}
    </FormItem>
  );
});

FormGroup.displayName = 'FormGroup';

export {
  FormInput,
  FormTextarea,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormGroup,
  FormSwitch,
  FormSelect,
  FormCheckbox,
  FormRadioGroup,
  FormRadioGroupItem,
};
