import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  type SelectProps,
} from "@mui/material";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  items: { text: string; value: string }[];
  label: string;
} & UseControllerProps<T> &
  SelectProps;

export default function SelectInput<T extends FieldValues>({
  label,
  items,
  ...props
}: Props<T>) {
  const { field, fieldState } = useController(props);
  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel>{label}</InputLabel>
      <Select value={field.value || ""} label={label} onChange={field.onChange}>
        {items.map((item) => (
          <MenuItem key={item.text} value={item.text}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
} 
