import { ErrorOutlineOutlined } from "@mui/icons-material";
import { Typography, Paper } from "@mui/material";

interface PageErrorProps {
  message?: string;
}

export const PageError = ({
  message = "Failed to load data. Please try again.",
}: PageErrorProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 400,
        width: "100%",
        borderRadius: "16px",
        border: "1px solid #fecaca",
        backgroundColor: "#fff5f5",
        p: 4,
        textAlign: "center",
        gap: 2,
      }}
    >
      <ErrorOutlineOutlined sx={{ fontSize: 48, color: "#ef4444" }} />

      <Typography
        variant="h6"
        sx={{
          fontWeight: "600",
          color: "#991b1b",
        }}
      >
        Oops! Something went wrong
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#7f1d1d",
          maxWidth: 400,
        }}
      >
        {message}
      </Typography>
    </Paper>
  );
};
