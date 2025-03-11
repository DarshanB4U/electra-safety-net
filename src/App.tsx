
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ElectionsProvider } from "@/contexts/ElectionsContext";

// Import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Elections from "./pages/Elections";
import ElectionDetails from "./pages/ElectionDetails";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <ElectionsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/elections" element={<Elections />} />
              <Route path="/elections/:id" element={<ElectionDetails />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ElectionsProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
