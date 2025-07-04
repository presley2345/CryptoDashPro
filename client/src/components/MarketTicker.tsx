import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const mockMarketData: MarketData[] = [
  { symbol: 'BTC/USD', price: 42350.00, change: 2.3, changePercent: 2.3 },
  { symbol: 'ETH/USD', price: 2580.00, change: 1.8, changePercent: 1.8 },
  { symbol: 'BNB/USD', price: 315.20, change: -0.5, changePercent: -0.5 },
  { symbol: 'ADA/USD', price: 0.485, change: 3.2, changePercent: 3.2 },
  { symbol: 'SOL/USD', price: 98.45, change: 4.1, changePercent: 4.1 },
  { symbol: 'DOT/USD', price: 7.23, change: -1.2, changePercent: -1.2 },
  { symbol: 'MATIC/USD', price: 0.89, change: 2.7, changePercent: 2.7 },
  { symbol: 'LINK/USD', price: 14.56, change: 1.4, changePercent: 1.4 },
  { symbol: 'XRP/USD', price: 0.62, change: -0.8, changePercent: -0.8 },
  { symbol: 'AVAX/USD', price: 38.92, change: 3.5, changePercent: 3.5 },
];

export function MarketTicker() {
  const [marketData, setMarketData] = useState<MarketData[]>(mockMarketData);

  useEffect(() => {
    // Simulate live price updates
    const interval = setInterval(() => {
      setMarketData(prev => 
        prev.map(item => ({
          ...item,
          price: item.price + (Math.random() - 0.5) * (item.price * 0.001),
          change: (Math.random() - 0.5) * 5,
          changePercent: (Math.random() - 0.5) * 5
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-dark-navy border-b border-border-dark px-4 py-2">
      <div className="flex items-center space-x-6 overflow-x-auto">
        {marketData.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 whitespace-nowrap">
            <span className="text-soft-gray text-sm">{item.symbol}</span>
            <span className="text-white font-medium">
              ${item.price.toFixed(item.price < 1 ? 4 : 2)}
            </span>
            <span className={cn(
              "text-sm",
              item.changePercent >= 0 ? "text-success-green" : "text-warning-red"
            )}>
              {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
