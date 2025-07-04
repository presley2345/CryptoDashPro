import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Bell, CheckCircle, AlertCircle, Info, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'trading';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export function NotificationsPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Load notifications from database
    // This would be replaced with actual API call
    const loadNotifications = async () => {
      // Mock notifications - replace with actual database call
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'info',
          title: 'Account Verification Required',
          message: 'Please upload your identification documents to complete account verification.',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          read: false
        },
        {
          id: '2',
          type: 'trading',
          title: 'Market Alert: BTC/USD',
          message: 'Bitcoin has reached $42,000. Consider your trading strategy.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          read: false
        },
        {
          id: '3',
          type: 'success',
          title: 'Welcome to OrbitalPay!',
          message: 'Your account has been created successfully. Start trading today!',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          read: true
        }
      ];
      setNotifications(mockNotifications);
    };

    loadNotifications();
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      variant: "default"
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success-green" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-warning-red" />;
      case 'info':
        return <Info className="w-5 h-5 text-slate-blue" />;
      case 'trading':
        return <TrendingUp className="w-5 h-5 text-teal-mint" />;
      default:
        return <Bell className="w-5 h-5 text-soft-gray" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
          <h1 className="text-xl font-bold text-white">Notifications</h1>
          <div></div>
        </div>
      </nav>

      <div className="p-4 max-w-2xl mx-auto">
        <Card className="bg-dark-navy border-border-dark">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
                {unreadCount > 0 && (
                  <Badge className="ml-2 bg-warning-red text-white">
                    {unreadCount} new
                  </Badge>
                )}
              </CardTitle>
              {unreadCount > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-slate-blue border-slate-blue hover:bg-slate-blue/20"
                >
                  Mark all as read
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="w-12 h-12 text-soft-gray mx-auto mb-4" />
                  <p className="text-soft-gray">No notifications yet</p>
                  <p className="text-soft-gray text-sm">You'll see important updates here</p>
                </div>
              ) : (
                notifications.map((notification, index) => (
                  <div key={notification.id}>
                    <div 
                      className={cn(
                        "flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-colors",
                        !notification.read ? "bg-slate-blue/10" : "hover:bg-slate-blue/5"
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      {getIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className={cn(
                            "text-sm font-medium",
                            !notification.read ? "text-white" : "text-soft-gray"
                          )}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-soft-gray">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>
                        <p className={cn(
                          "text-sm mt-1",
                          !notification.read ? "text-soft-gray" : "text-soft-gray/80"
                        )}>
                          {notification.message}
                        </p>
                        {!notification.read && (
                          <div className="mt-2">
                            <Badge className="bg-slate-blue/20 text-slate-blue text-xs">
                              New
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                    {index < notifications.length - 1 && (
                      <Separator className="my-2 bg-border-dark" />
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
