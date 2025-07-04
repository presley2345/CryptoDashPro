import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { isAppwriteConfigured } from "@/lib/appwrite";

// Pages
import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { Dashboard } from "@/pages/Dashboard";
import { ProfilePage } from "@/pages/ProfilePage";
import { UploadIdPage } from "@/pages/UploadIdPage";
import { FundWalletPage } from "@/pages/FundWalletPage";
import { WithdrawalPage } from "@/pages/WithdrawalPage";
import { UpgradeAccountPage } from "@/pages/UpgradeAccountPage";
import { NotificationsPage } from "@/pages/NotificationsPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/upload-id" component={UploadIdPage} />
      <Route path="/fund-wallet" component={FundWalletPage} />
      <Route path="/withdrawal" component={WithdrawalPage} />
      <Route path="/upgrade" component={UpgradeAccountPage} />
      <Route path="/notifications" component={NotificationsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Check configuration on app start
  if (!isAppwriteConfigured()) {
    console.warn('⚠️  Appwrite is not fully configured. Please check your environment variables.');
    console.warn('📝 Copy .env.example to .env and fill in your Appwrite credentials.');
  }

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
