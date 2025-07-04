import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { countries, currencies } from '@/lib/utils';
import { Loader2, Rocket } from 'lucide-react';

export function RegisterPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    currency: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please ensure both passwords match.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (!formData.acceptTerms) {
      toast({
        title: "Terms required",
        description: "Please accept the terms and conditions.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      await register(formData);
      toast({
        title: "Registration successful",
        description: "Welcome to OrbitalPay! Please check your email for verification.",
        variant: "default"
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-deep-charcoal p-4">
      <Card className="w-full max-w-2xl bg-dark-navy border-border-dark max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-blue to-teal-mint rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-white">Create Your Account</CardTitle>
          <CardDescription className="text-soft-gray">
            Join thousands of successful traders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-soft-gray">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                  className="bg-deep-charcoal border-border-dark text-white focus:border-slate-blue mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-soft-gray">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                  className="bg-deep-charcoal border-border-dark text-white focus:border-slate-blue mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email" className="text-soft-gray">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="bg-deep-charcoal border-border-dark text-white focus:border-slate-blue mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-soft-gray">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
                className="bg-deep-charcoal border-border-dark text-white focus:border-slate-blue mt-1"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-soft-gray">Country</Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger className="bg-deep-charcoal border-border-dark text-white focus:border-slate-blue mt-1">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-navy border-border-dark">
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value} className="text-white hover:bg-slate-blue/20">
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-soft-gray">Preferred Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                  <SelectTrigger className="bg-deep-charcoal border-border-dark text-white focus:border-slate-blue mt-1">
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-navy border-border-dark">
                    {currencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value} className="text-white hover:bg-slate-blue/20">
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="password" className="text-soft-gray">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
                className="bg-deep-charcoal border-border-dark text-white focus:border-slate-blue mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="confirmPassword" className="text-soft-gray">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
                className="bg-deep-charcoal border-border-dark text-white focus:border-slate-blue mt-1"
              />
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => handleInputChange('acceptTerms', checked)}
                required
              />
              <Label htmlFor="terms" className="text-soft-gray text-sm">
                I agree to the{' '}
                <Button variant="link" className="text-slate-blue hover:text-slate-blue/80 p-0 h-auto">
                  Terms and Conditions
                </Button>
                {' '}and{' '}
                <Button variant="link" className="text-slate-blue hover:text-slate-blue/80 p-0 h-auto">
                  Privacy Policy
                </Button>
              </Label>
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full gradient-button text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-soft-gray">
              Already have an account?{' '}
              <Link href="/login">
                <Button variant="link" className="text-teal-mint hover:text-teal-mint/80 p-0">
                  Login here
                </Button>
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
