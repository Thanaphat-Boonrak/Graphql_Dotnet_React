import { CircularProgress, Typography, Paper } from "@mui/material";

interface PageLoaderProps {
  message?: string;
}

export const PageLoader = ({ message = "Loading data..." }: PageLoaderProps) => {
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
        border: "1px solid #e2e8f0",
        backgroundColor: "#f8fafc",
        gap: 2,
      }}
    >
      <CircularProgress 
        size={48} 
        thickness={4} 
        sx={{ color: "#2563eb" }} 
      />
      
      <Typography
        variant="body1"
        sx={{
          fontWeight: "500",
          color: "#475569",
          letterSpacing: "0.5px",
        }}
      >
        {message}
      </Typography>
    </Paper>
  );
};