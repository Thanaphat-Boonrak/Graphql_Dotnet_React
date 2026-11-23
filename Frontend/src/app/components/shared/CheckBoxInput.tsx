import { 
  Checkbox, 
  FormControlLabel, 
  FormHelperText, 
  type CheckboxProps 
} from "@mui/material";
import {
  useController,
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = UseControllerProps<T> & 
  CheckboxProps & { 
    label: string 
  };

export const CheckBoxInput = <T extends FieldValues>({ 
  control,
  name, 
  label, 
  ...props
}: Props<T>) => {
  const formContext = useFormContext<T>();
  const effectiveControl = control || formContext?.control;

  if (!effectiveControl) {
    throw new Error("CheckboxInput must have a FormProvider or control prop");
  }

  const { field, fieldState } = useController({
    name,
    control: effectiveControl,
  });

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            {...props}
            checked={!!field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            onBlur={field.onBlur}
            name={field.name}
            color="primary"
          />
        }
        label={label}
      />
      {fieldState.error && (
        <FormHelperText error sx={{ ml: 1.5 }}>
          {fieldState.error.message}
        </FormHelperText>
      )}
    </div>
  );
};