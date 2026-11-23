import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddRounded from "@mui/icons-material/PersonAddRounded";
import { ReceiptLongRounded } from "@mui/icons-material";

const NAV_ITEMS = [
  {
    label: "Customers",
    to: "/customers",
    icon: <PeopleIcon fontSize="small" />,
  },
  {
    label: "Orders",
    to: "/orders",
    icon: <ReceiptLongRounded fontSize="small" />,
  },
  {
    label: "New Customer",
    to: "/customers/create",
    icon: <PersonAddRounded fontSize="small" />,
  },
];

export const Layout = () => {
  const { pathname } = useLocation();

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        backgroundColor: "#ffffff",
        color: "#2d3748",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: { xs: 2, md: 5 } }}>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            noWrap
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <StorefrontIcon sx={{ color: "#2563eb", fontSize: "28px" }} />
            Order Management
          </Typography>

          <Box
            component="nav"
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.to;

              return (
                <Button
                  key={item.to}
                  component={Link}
                  to={item.to}
                  startIcon={item.icon}
                  sx={{
                    my: 1.5,
                    color: isActive ? "#2563eb" : "#475569",
                    backgroundColor: isActive ? "#eff6ff" : "transparent",
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: "8px",
                    px: 2,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#f1f5f9",
                      color: "#2563eb",
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
