import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, DollarSign, Shield, MessageCircle, Loader2 } from 'lucide-react';

export function WithdrawalPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [authCode, setAuthCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!authCode) {
      toast({
        title: "Authorization code required",
        description: "Please enter the authorization code provided by customer care.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      // Simulate authorization check
      // In a real app, this would validate the code with the backend
      
      toast({
        title: "Authorization required",
        description: "Please contact customer service to complete your withdrawal request.",
        variant: "default"
      });
      
      // Open customer care
      try {
        if (window.smartsupp && typeof window.smartsupp === 'function') {
          window.smartsupp('chat:open');
        } else {
          console.warn('Smartsupp chat not available');
        }
      } catch (error) {
        console.error('Failed to open Smartsupp chat:', error);
      }
    } catch (error: any) {
      toast({
        title: "Authorization failed",
        description: error.message || "Please contact customer service for assistance.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomerCare = () => {
    try {
      if (window.smartsupp && typeof window.smartsupp === 'function') {
        window.smartsupp('chat:open');
      } else {
        console.warn('Smartsupp chat not available');
        toast({
          title: "Chat unavailable",
          description: "Customer support chat is currently unavailable. Please try again later.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Failed to open Smartsupp chat:', error);
      toast({
        title: "Error",
        description: "Unable to open customer support chat.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-deep-charcoal">
      <nav className="bg-dark-navy border-b border-border-dark px-4 py-3">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="text-soft-gray hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-xl font-bold text-white">Withdrawal</h1>
          <div></div>
        </div>
      </nav>

      <div className="p-4 max-w-2xl mx-auto">
        <Card className="bg-dark-navy border-border-dark">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Withdraw Funds
            </CardTitle>
            <p className="text-soft-gray">Authorization required for withdrawal requests</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="authCode" className="text-soft-gray">Enter Authorization Code</Label>
                <Input
                  id="authCode"
                  type="text"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  placeholder="Enter authorization code"
                  className="bg-deep-charcoal border-border-dark text-white focus:border-slate-blue mt-1"
                />
              </div>

              <div className="text-center py-4">
                <Shield className="w-12 h-12 text-slate-blue mx-auto mb-4" />
                <p className="text-soft-gray mb-4">Need an authorization code?</p>
                <Button
                  type="button"
                  variant="link"
                  onClick={handleCustomerCare}
                  className="text-teal-mint hover:text-teal-mint/80 underline"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask Customer Care for Authorization Code
                </Button>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-warning-red hover:bg-warning-red/80 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing Authorization...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Authorize Withdrawal
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
