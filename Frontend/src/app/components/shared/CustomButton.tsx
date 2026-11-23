import { Button, CircularProgress, type ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
}

export const CustomButton = ({
  children,
  loading = false,
  disabled,
  variant = "contained",
  color = "primary",
  ...props
}: CustomButtonProps) => {
  return (
    <Button
      variant={variant}
      color={color} 
      disabled={disabled || loading}
      {...props}
      sx={{
        textTransform: "none",
        fontWeight: "600",
        borderRadius: "8px",
        py: 1.2
      }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
};