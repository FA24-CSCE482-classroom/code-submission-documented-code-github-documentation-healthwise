import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "./components/Layout";
import Index from ".";
import Auth from "./Auth";

import "./css/index.css";

// Setup react query to handle api calls and their associated loading states
// https://tanstack.com/query/v4/docs/react/overview
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    { /* Use React Router to handle client side routing between the auth page and the home page
          https://reactrouter.com/en/main
    */ }
    <BrowserRouter>
      <Routes>
        { /* Wrap all elements with the Layout component
                https://reactrouter.com/en/main/start/concepts#layout-routes
            */ }
        <Route element={<Layout />}>
          <Route path="/" Component={Index} />
        </Route>
        <Route path="/auth" Component={Auth} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
