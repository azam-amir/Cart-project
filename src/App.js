import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import { AUTHENTICATED_ROUTES } from "./routes/RouteConstant";
import "../src/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});
function App() {
  const router = useMemo(() => {
    return createBrowserRouter(
      [
        ...(true && AUTHENTICATED_ROUTES),
        {
          path: "*",
          element: <NotFound />,
        },
      ],
      {
        basename: "/",
      }
    );
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<>Loading...</>}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
