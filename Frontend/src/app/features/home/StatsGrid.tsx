import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import type { StatsModel } from "../../../graphql/generate/schema";

export interface StatsGridProps {
  stats: StatsModel;
}

interface StatItem {
  label: string;
  value: number;
  accentColor: string;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const items: StatItem[] = [
    {
      label: "Total Customers",
      value: stats.totalCustomers,
      accentColor: "#2563eb",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      accentColor: "#0f172a",
    },
    {
      label: "Pending Orders",
      value: stats.pendingOrders,
      accentColor: "#d97706",
    },
    {
      label: "Draft Orders",
      value: stats.draftOrders,
      accentColor: "#64748b",
    },
    {
      label: "Completed Orders",
      value: stats.completedOrders,
      accentColor: "#16a34a",
    },
    {
      label: "Shipped Orders",
      value: stats.shippedOrders,
      accentColor: "#0891b2",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack sx={{ gap: 3 }}>
        <Typography
          component="div"
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#1e293b",
            display: "block",
            textAlign: "center",
            mb: 2,
          }}
        >
          Stats
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
            },
            gap: 2.5,
          }}
        >
          {items.map((item) => (
            <Card
              key={item.label}
              variant="outlined"
              sx={{
                height: "100%",
                borderRadius: 2.5,
                borderColor: "divider",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 2,
                },
              }}
            >
              <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                <Stack sx={{ gap: 1.25 }}>
                  <Stack
                    sx={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: item.accentColor,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 500,
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Stack>

                  <Typography
                    variant="h4"
                    component="p"
                    sx={{
                      color: "#0f172a",
                      fontWeight: 700,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {item.value.toLocaleString()}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Stack>
    </Container>
  );
}
