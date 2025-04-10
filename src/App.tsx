
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/hooks/use-toast";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Tenants from "./pages/Tenants";
import Properties from "./pages/Properties";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider>
      <TooltipProvider>
        <Sonner />
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route path="/properties" element={<Properties />} />
            {/* Additional routes would go here */}
            <Route path="/services" element={<NotFound />} />
            <Route path="/pricing" element={<NotFound />} />
            <Route path="/articles" element={<NotFound />} />
            <Route path="/about" element={<NotFound />} />
            <Route path="/vendors" element={<NotFound />} />
            <Route path="/landlords" element={<NotFound />} />
            <Route path="/settings" element={<NotFound />} />
            <Route path="/subscriptions" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ToastProvider>
  </QueryClientProvider>
);

export default App;
