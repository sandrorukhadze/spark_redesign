import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import keycloak from "./lib/keycloak";

const queryClient = new QueryClient();

keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
  if (authenticated) {
    createRoot(document.getElementById("root")!).render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    );
  } else {
    console.warn("User not authenticated");
  }
});
