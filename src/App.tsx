
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/hooks/use-toast";
import { Provider } from 'react-redux';
import { store } from './store';
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Tenants from "./pages/Tenants";
import Properties from "./pages/Properties";
import NotFound from "./pages/NotFound";
import Orders from "./pages/Orders";
import Inspectors from "./pages/Inspectors";
import Companies from "./pages/Companies";
import SchedulingCalendar from "./pages/SchedulingCalendar";
import OrderMapView from "./pages/OrderMapView";
import MyUpcomingOrders from "./pages/MyUpcomingOrders";
import SettingsLayout from "./components/settings/SettingsLayout";
import GeneralSettings from "./pages/settings/GeneralSettings";
import ChangePassword from "./pages/settings/ChangePassword";
import Notifications from "./pages/settings/Notifications";
import DocusignKeys from "./pages/settings/DocusignKeys";
import CustomFields from "./pages/settings/CustomFields";
import Templates from "./pages/settings/Templates";
import OrderDetailPage from "./pages/OrderDetailPage";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Clients from "./pages/Clients";
import Agents from "./pages/Agents";
import InspectionReport from "./pages/reports/InspectionReport";
import IncomeReport from "./pages/reports/IncomeReport";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
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
              <Route path="/orders" element={<Orders />} />
              <Route path="/inspectors" element={<Inspectors />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/services" element={<NotFound />} />
              <Route path="/pricing" element={<NotFound />} />
              <Route path="/articles" element={<NotFound />} />
              <Route path="/about" element={<NotFound />} />
              <Route path="/vendors" element={<NotFound />} />
              <Route path="/landlords" element={<NotFound />} />
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route path="/settings" element={<SettingsLayout />}>
                <Route path="general" element={<GeneralSettings />} />
                <Route path="password" element={<ChangePassword />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="docusign" element={<DocusignKeys />} />
                <Route path="custom-fields" element={<CustomFields />} />
                <Route path="templates" element={<Templates />} />
              </Route>
              <Route path="/calendar/scheduling" element={<SchedulingCalendar />} />
              <Route path="/calendar/upcoming/orders" element={<MyUpcomingOrders />} />
              <Route path="/calendar/map" element={<OrderMapView />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/orders/:orderId" element={<OrderDetailPage />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/reports/inspection" element={<InspectionReport />} />
              <Route path="/reports/income" element={<IncomeReport />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ToastProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
