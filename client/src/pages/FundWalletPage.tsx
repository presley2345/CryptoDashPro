import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { storage, BUCKET_ID } from '@/lib/appwrite';
import { generateDepositAddress, copyToClipboard } from '@/lib/utils';
import { ArrowLeft, Wallet, CloudUpload, Copy, CheckCircle, Loader2 } from 'lucide-react';

export function FundWalletPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [depositAddress] = useState(generateDepositAddress());

  const handleCopyAddress = async () => {
    try {
      await copyToClipboard(depositAddress);
      toast({
        title: "Address copied",
        description: "Deposit address has been copied to clipboard.",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy address to clipboard.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!amount || !screenshot) {
      toast({
        title: "Missing information",
        description: "Please enter amount and upload payment screenshot.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      // Upload screenshot to Appwrite Storage
      const screenshotUpload = await storage.createFile(BUCKET_ID, 'unique()', screenshot);

      // Store payment information in database
      // This would be implemented with actual database calls
      
      toast({
        title: "Payment submitted successfully",
        description: "Your payment has been submitted for processing. You will be notified once confirmed.",
        variant: "default"
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Submission failed",
        description: error.message || "An error occurred while submitting your payment.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
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
          <h1 className="text-xl font-bold text-white">Fund Wallet</h1>
          <div></div>
        </div>
      </nav>

      <div className="p-4 max-w-2xl mx-auto">
        <Card className="bg-dark-navy border-border-dark">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Wallet className="w-5 h-5 mr-2" />
              Add Funds to Your Account
            </CardTitle>
            <p className="text-soft-gray">Send payment to the address below and upload your payment screenshot</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label className="text-soft-gray">Deposit Address</Label>
                <div className="bg-deep-charcoal border border-border-dark rounded-lg p-4 mt-1">
                  <p className="text-white font-mono break-all text-sm">{depositAddress}</p>
                  <Button
                    type="button"
                    variant="link"
                    onClick={handleCopyAddress}
                    className="text-teal-mint hover:text-teal-mint/80 p-0 mt-2"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy Address
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="amount" className="text-soft-gray">Amount to Deposit</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-3 text-soft-gray">$</span>
                  <Input
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="pl-8 bg-deep-charcoal border-border-dark text-white focus:border-slate-blue"
                  />
                </div>
              </div>

              <div>
                <Label className="text-soft-gray">Payment Screenshot</Label>
                <div className="border-2 border-dashed border-border-dark rounded-lg p-8 text-center mt-1">
                  <CloudUpload className="w-12 h-12 text-slate-blue mx-auto mb-2" />
                  <p className="text-soft-gray mb-2">
                    {screenshot ? screenshot.name : 'Upload payment screenshot'}
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                    className="hidden"
                    id="screenshot-upload"
                  />
                  <Button
                    type="button"
                    onClick={() => document.getElementById('screenshot-upload')?.click()}
                    className="bg-slate-blue hover:bg-slate-blue/80 text-white"
                  >
                    Choose File
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-success-green hover:bg-success-green/80 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    I Have Paid
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
