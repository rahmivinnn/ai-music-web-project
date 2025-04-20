
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RemixAudio from "./pages/RemixAudio";
import TextToRemix from "./pages/TextToRemix";
import NotFound from "./pages/NotFound";
import History from "./pages/History";
import Library from "./pages/Library";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import LoginPage from "./components/LoginPage";
import OnboardingPage from "./components/OnboardingPage";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import RemixHomePage from "./components/RemixHomePage";
import SubscriptionPage from "./components/SubscriptionPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/remix" element={<RemixHomePage />} />
          <Route path="/remix-audio" element={<RemixAudio />} />
          <Route path="/text-to-remix" element={<TextToRemix />} />
          <Route path="/history" element={<History />} />
          <Route path="/library" element={<Library />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
