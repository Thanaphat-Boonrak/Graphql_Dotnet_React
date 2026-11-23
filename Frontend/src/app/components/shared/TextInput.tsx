import { TextField, type TextFieldProps } from "@mui/material";
import {
  useController,
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = UseControllerProps<T> & Omit<TextFieldProps, "name">;

export const TextInput = <T extends FieldValues>({ 
  control, 
  name, 
  ...props 
}: Props<T>) => {
  const formContext = useFormContext<T>();

  const effectiveControl = control || formContext?.control;

  if (!effectiveControl) {
    throw new Error("TextInput must have a FormProvider or control prop");
  }

  const { field, fieldState } = useController({
    name,
    control: effectiveControl,
  });

  return (
    <TextField
      {...props}
      {...field}
      fullWidth
      value={field.value ?? ""}
      variant="outlined"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
};