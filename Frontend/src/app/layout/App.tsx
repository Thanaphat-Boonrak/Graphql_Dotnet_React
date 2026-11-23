import { Outlet } from "react-router";
import { Layout } from "./Layout";
import { Container } from "@mui/material";

export const App = () => {
  return (
    <>
      <Layout />

      <Container sx={{ pt: 6 }}>
        <Outlet></Outlet>
      </Container>
    </>
  );
};
