import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Rocket } from 'lucide-react';

export function LoginPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back to OrbitalPay!",
        variant: "default"
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-deep-charcoal p-4">
      <Card className="w-full max-w-md bg-dark-navy border-border-dark">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-blue to-teal-mint rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-white">Login to OrbitalPay</CardTitle>
          <CardDescription className="text-soft-gray">
            Access your trading dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-soft-gray">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-deep-charcoal border-border-dark text-white focus:border-slate-blue mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-soft-gray">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-deep-charcoal border-border-dark text-white focus:border-slate-blue mt-1"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                />
                <Label htmlFor="remember" className="text-soft-gray text-sm">
                  Remember me
                </Label>
              </div>
              <Link href="/forgot-password">
                <Button variant="link" className="text-slate-blue hover:text-slate-blue/80 p-0">
                  Forgot password?
                </Button>
              </Link>
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-slate-blue hover:bg-slate-blue/80 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login to Dashboard'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-soft-gray">
              Don't have an account?{' '}
              <Link href="/register">
                <Button variant="link" className="text-teal-mint hover:text-teal-mint/80 p-0">
                  Sign up here
                </Button>
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
