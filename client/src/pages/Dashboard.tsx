import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MarketTicker } from '@/components/MarketTicker';
import { TradingViewWidget } from '@/components/TradingViewWidget';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency, formatBTC } from '@/lib/utils';
import { 
  Menu, 
  Bell, 
  LogOut, 
  User, 
  Upload, 
  Wallet, 
  DollarSign, 
  Star,
  TrendingUp,
  Gift,
  Bitcoin,
  History
} from 'lucide-react';

export function Dashboard() {
  const [, navigate] = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [financialData, setFinancialData] = useState({
    invested: 0,
    profit: 0,
    bonus: 0,
    balance: 0,
    btcEquivalent: 0
  });

  useEffect(() => {
    // Load user's financial data from database
    // This would be replaced with actual API call
    const loadFinancialData = async () => {
      // Mock data - replace with actual database call
      setFinancialData({
        invested: 0,
        profit: 0,
        bonus: 0,
        balance: 0,
        btcEquivalent: 0
      });
    };

    loadFinancialData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "See you next time!",
        variant: "default"
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-deep-charcoal">
      {/* Top Navigation Bar */}
      <nav className="bg-dark-navy border-b border-border-dark px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Menu Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 text-white hover:text-slate-blue">
                <Menu className="w-4 h-4" />
                <span className="hidden sm:inline">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-dark-navy border-border-dark">
              <DropdownMenuItem onClick={() => navigate('/dashboard')} className="text-soft-gray hover:text-white hover:bg-slate-blue/20">
                <User className="w-4 h-4 mr-2" />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/profile')} className="text-soft-gray hover:text-white hover:bg-slate-blue/20">
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/upload-id')} className="text-soft-gray hover:text-white hover:bg-slate-blue/20">
                <Upload className="w-4 h-4 mr-2" />
                Upload Identification
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/fund-wallet')} className="text-soft-gray hover:text-white hover:bg-slate-blue/20">
                <Wallet className="w-4 h-4 mr-2" />
                Fund Account
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/withdrawal')} className="text-soft-gray hover:text-white hover:bg-slate-blue/20">
                <DollarSign className="w-4 h-4 mr-2" />
                Withdrawal
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/upgrade')} className="text-soft-gray hover:text-white hover:bg-slate-blue/20">
                <Star className="w-4 h-4 mr-2" />
                Upgrade Account
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Account Status */}
          <div className="hidden sm:block">
            <span className="text-soft-gray text-sm">Account Status - </span>
            <Badge variant="destructive" className="bg-warning-red text-white">
              NOT VERIFIED
            </Badge>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/notifications')}
              className="text-soft-gray hover:text-white relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-warning-red text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="text-soft-gray hover:text-white"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Live Market Prices Ticker */}
      <MarketTicker />

      {/* Dashboard Content */}
      <div className="p-4 space-y-6">
        {/* User Info */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {user?.firstName} {user?.lastName}
            </h2>
            <span className="text-orange-400 font-medium">BRONZE</span>
          </div>
        </div>

        {/* Financial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-pink-900 to-pink-700 border-none">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-200 text-sm">Invested</p>
                  <p className="text-white text-xl font-bold">{formatCurrency(financialData.invested)}</p>
                </div>
                <TrendingUp className="w-6 h-6 text-pink-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-600 to-gray-400 border-none">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-200 text-sm">Profit</p>
                  <p className="text-white text-xl font-bold">{formatCurrency(financialData.profit)}</p>
                </div>
                <DollarSign className="w-6 h-6 text-gray-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-600 to-blue-400 border-none">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Bonus</p>
                  <p className="text-white text-xl font-bold">{formatCurrency(financialData.bonus)}</p>
                </div>
                <Gift className="w-6 h-6 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-success-green to-green-400 border-none">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm">Balance</p>
                  <p className="text-white text-xl font-bold">{formatCurrency(financialData.balance)}</p>
                </div>
                <Wallet className="w-6 h-6 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-600 to-orange-400 border-none">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-200 text-sm">BTC Equivalent</p>
                  <p className="text-white text-xl font-bold">{formatBTC(financialData.btcEquivalent)}</p>
                </div>
                <Bitcoin className="w-6 h-6 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <Card className="bg-dark-navy border-border-dark">
          <CardHeader>
            <CardTitle className="text-white">Bitcoin Price Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <TradingViewWidget />
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="bg-dark-navy border-border-dark">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <History className="w-5 h-5 mr-2" />
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border-dark">
                  <TableHead className="text-soft-gray">Date</TableHead>
                  <TableHead className="text-soft-gray">Type</TableHead>
                  <TableHead className="text-soft-gray">Amount</TableHead>
                  <TableHead className="text-soft-gray">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    <History className="w-8 h-8 text-soft-gray mx-auto mb-2" />
                    <p className="text-soft-gray">No transactions yet</p>
                    <p className="text-soft-gray text-sm">Your transaction history will appear here</p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
