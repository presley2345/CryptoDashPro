import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { accountTiers } from '@/lib/utils';
import { ArrowLeft, Check, X, Star, Crown, Diamond } from 'lucide-react';
import { cn } from '@/lib/utils';

export function UpgradeAccountPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const handleUpgrade = (tierName: string) => {
    if (tierName === 'Bronze') {
      toast({
        title: "Current plan",
        description: "Please contact customer care for account management assistance.",
        variant: "default"
      });
    } else {
      toast({
        title: "Upgrade request",
        description: "Please contact customer care to upgrade your account to " + tierName + " tier.",
        variant: "default"
      });
    }
    
    // Open customer care
    if (window.smartsupp) {
      window.smartsupp('chat:open');
    }
  };

  const getIcon = (tierName: string) => {
    switch (tierName) {
      case 'Bronze':
        return <Star className="w-6 h-6" />;
      case 'Silver':
        return <Star className="w-6 h-6" />;
      case 'Gold':
        return <Crown className="w-6 h-6" />;
      case 'Platinum':
        return <Crown className="w-6 h-6" />;
      case 'Diamond':
        return <Diamond className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'orange':
        return 'border-orange-500 text-orange-400';
      case 'slate':
        return 'border-slate-300 text-slate-300';
      case 'yellow':
        return 'border-yellow-500 text-yellow-400';
      case 'gray':
        return 'border-gray-300 text-gray-300';
      case 'cyan':
        return 'border-cyan-400 text-cyan-400';
      default:
        return 'border-slate-300 text-slate-300';
    }
  };

  const getButtonClasses = (tier: any) => {
    if (tier.current) {
      return 'bg-gray-600 text-gray-400 cursor-not-allowed';
    }
    
    switch (tier.color) {
      case 'orange':
        return 'bg-orange-500 hover:bg-orange-500/80 text-white';
      case 'slate':
        return 'bg-slate-blue hover:bg-slate-blue/80 text-white';
      case 'yellow':
        return 'bg-yellow-500 hover:bg-yellow-500/80 text-deep-charcoal';
      case 'gray':
        return 'bg-gray-500 hover:bg-gray-500/80 text-white';
      case 'cyan':
        return 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-400/80 hover:to-blue-500/80 text-deep-charcoal';
      default:
        return 'bg-slate-blue hover:bg-slate-blue/80 text-white';
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
          <h1 className="text-xl font-bold text-white">Upgrade Account</h1>
          <div></div>
        </div>
      </nav>

      <div className="p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Choose Your Trading Plan</h2>
            <p className="text-soft-gray">Unlock advanced features and higher returns with our premium plans</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {accountTiers.map((tier, index) => (
              <Card 
                key={index}
                className={cn(
                  "bg-dark-navy border-2 relative",
                  getColorClasses(tier.color)
                )}
              >
                {tier.exclusive && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-cyan-400 text-deep-charcoal">VIP</Badge>
                  </div>
                )}
                <CardHeader className={tier.exclusive ? "pt-8" : ""}>
                  <div className="text-center">
                    <div className={cn("mb-2", getColorClasses(tier.color))}>
                      {getIcon(tier.name)}
                    </div>
                    <CardTitle className={cn("text-xl mb-2", getColorClasses(tier.color))}>
                      {tier.name}
                    </CardTitle>
                    <div className="text-3xl font-bold text-white mb-2">
                      ${tier.price.toLocaleString()}
                    </div>
                    <div className="mb-4">
                      {tier.current && (
                        <Badge className="bg-orange-500/20 text-orange-400">Current Plan</Badge>
                      )}
                      {tier.popular && (
                        <Badge className="bg-slate-blue/20 text-slate-blue">Popular</Badge>
                      )}
                      {tier.recommended && (
                        <Badge className="bg-yellow-500/20 text-yellow-400">Recommended</Badge>
                      )}
                      {tier.premium && (
                        <Badge className="bg-gray-500/20 text-gray-300">Premium</Badge>
                      )}
                      {tier.exclusive && (
                        <Badge className="bg-cyan-400/20 text-cyan-400">Exclusive</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        {feature.startsWith('No ') ? (
                          <X className="w-4 h-4 text-warning-red mr-2 mt-0.5 flex-shrink-0" />
                        ) : (
                          <Check className="w-4 h-4 text-success-green mr-2 mt-0.5 flex-shrink-0" />
                        )}
                        <span className="text-soft-gray">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleUpgrade(tier.name)}
                    disabled={tier.current}
                    className={cn("w-full", getButtonClasses(tier))}
                  >
                    {tier.current ? 'Current Plan' : 'Upgrade Plan'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
