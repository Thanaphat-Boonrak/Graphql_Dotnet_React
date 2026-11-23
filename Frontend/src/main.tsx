import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./app/router/Routes.tsx";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { AgGridProvider } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_API_SCHEMA_URL,
  }),
  cache: new InMemoryCache(),
});
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
const modules = [AllCommunityModule];

createRoot(document.getElementById("root")!).render(
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <AgGridProvider modules={modules}>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </AgGridProvider>
  </LocalizationProvider>,
);
