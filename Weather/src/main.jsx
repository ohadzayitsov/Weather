import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SearchProvider, UserProvider } from "./utils/context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
    <SearchProvider>
    <UserProvider>
      <App />
    </UserProvider>
    </SearchProvider>
    
  </StrictMode>
);
