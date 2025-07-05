import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import HomeBasic from "@/pages/home-basic";
import AuthPage from "@/pages/auth-page";
import GuideDashboard from "@/pages/guide-dashboard";
import AdminWorking from "@/pages/admin-working";
import SimpleAnalytics from "@/pages/simple-analytics";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeBasic} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/guide-dashboard" component={GuideDashboard} />
      <Route path="/admin" component={AdminWorking} />
      <Route path="/admin-analytics" component={SimpleAnalytics} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
