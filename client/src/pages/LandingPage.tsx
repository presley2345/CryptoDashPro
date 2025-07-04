import { BackgroundSlider } from '@/components/BackgroundSlider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Rocket, Shield, TrendingUp, Users, Check, UserCircle, UserPlus } from 'lucide-react';
import { Link } from 'wouter';

export function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundSlider />
      
      {/* Navigation Header */}
      <nav className="relative z-10 flex items-center justify-between px-4 py-4 bg-dark-navy/90 backdrop-blur-sm border-b border-border-dark">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-slate-blue to-teal-mint rounded-lg flex items-center justify-center">
            <Rocket className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-white">OrbitalPay</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link href="/login">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-soft-gray hover:text-white hover:bg-slate-blue/20"
              title="Login"
            >
              <UserCircle className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/register">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-soft-gray hover:text-white hover:bg-teal-mint/20"
              title="Register"
            >
              <UserPlus className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Landing Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Welcome to OrbitalPay
          </h1>
          <p className="text-xl md:text-2xl text-soft-gray mb-8">
            The Future of Cryptocurrency Trading
          </p>
        </div>

        <Card className="bg-dark-navy/80 backdrop-blur-sm border-border-dark mb-8">
          <CardContent className="p-8">
            <div className="max-w-none">
              <h2 className="text-2xl font-bold text-white mb-4">Revolutionary Trading Experience</h2>
              <p className="text-soft-gray mb-4">
                OrbitalPay represents the next generation of cryptocurrency trading platforms, designed for both novice and professional traders. Our advanced platform combines cutting-edge technology with user-friendly interfaces to deliver an unparalleled trading experience.
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">Why Choose OrbitalPay?</h3>
              <ul className="text-soft-gray space-y-2 mb-4">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-success-green mr-2" />
                  Advanced trading charts with real-time market data
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-success-green mr-2" />
                  24/7 customer support and expert guidance
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-success-green mr-2" />
                  Secure and compliant trading environment
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-success-green mr-2" />
                  Multiple account tiers with exclusive benefits
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-success-green mr-2" />
                  Live trading sessions with professional experts
                </li>
              </ul>
              
              <p className="text-soft-gray mb-6">
                Our platform supports a comprehensive range of cryptocurrencies and forex pairs, providing you with endless opportunities to diversify your portfolio. With institutional-grade security and cutting-edge analytics, OrbitalPay ensures your investments are protected while maximizing your potential returns.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-blue/20 p-4 rounded-lg text-center">
                  <Shield className="w-8 h-8 text-slate-blue mx-auto mb-2" />
                  <h4 className="font-semibold text-white">Bank-Grade Security</h4>
                  <p className="text-sm text-soft-gray">Your assets are protected with military-grade encryption</p>
                </div>
                <div className="bg-teal-mint/20 p-4 rounded-lg text-center">
                  <TrendingUp className="w-8 h-8 text-teal-mint mx-auto mb-2" />
                  <h4 className="font-semibold text-white">Advanced Analytics</h4>
                  <p className="text-sm text-soft-gray">Professional trading tools and real-time insights</p>
                </div>
                <div className="bg-success-green/20 p-4 rounded-lg text-center">
                  <Users className="w-8 h-8 text-success-green mx-auto mb-2" />
                  <h4 className="font-semibold text-white">Expert Support</h4>
                  <p className="text-sm text-soft-gray">24/7 support from trading professionals</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/register">
            <Button size="lg" className="gradient-button font-semibold text-lg px-8 py-4 transform hover:scale-105 transition-transform">
              <Rocket className="w-5 h-5 mr-2" />
              Get Started Today
            </Button>
          </Link>
          <p className="text-soft-gray mt-4 text-sm">Join thousands of successful traders on OrbitalPay</p>
        </div>
      </div>
    </div>
  );
}
