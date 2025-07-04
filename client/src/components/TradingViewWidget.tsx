import { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol?: string;
  width?: string;
  height?: string;
  interval?: string;
  theme?: 'light' | 'dark';
  style?: string;
  locale?: string;
  toolbar_bg?: string;
  enable_publishing?: boolean;
  hide_top_toolbar?: boolean;
  hide_legend?: boolean;
  save_image?: boolean;
  container_id?: string;
}

export function TradingViewWidget({
  symbol = 'BINANCE:BTCUSDT',
  width = '100%',
  height = '400',
  interval = '1',
  theme = 'dark',
  style = '1',
  locale = 'en',
  toolbar_bg = '#1E1E2F',
  enable_publishing = false,
  hide_top_toolbar = false,
  hide_legend = false,
  save_image = false,
  container_id = 'tradingview_chart'
}: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (typeof TradingView !== 'undefined') {
        new TradingView.widget({
          width,
          height,
          symbol,
          interval,
          timezone: 'Etc/UTC',
          theme,
          style,
          locale,
          toolbar_bg,
          enable_publishing,
          hide_top_toolbar,
          hide_legend,
          save_image,
          container_id,
          studies: [
            'MASimple@tv-basicstudies',
            'RSI@tv-basicstudies'
          ],
          overrides: {
            'mainSeriesProperties.candleStyle.upColor': '#00C853',
            'mainSeriesProperties.candleStyle.downColor': '#FF5252',
            'mainSeriesProperties.candleStyle.borderUpColor': '#00C853',
            'mainSeriesProperties.candleStyle.borderDownColor': '#FF5252',
            'mainSeriesProperties.candleStyle.wickUpColor': '#00C853',
            'mainSeriesProperties.candleStyle.wickDownColor': '#FF5252',
            'paneProperties.background': '#121212',
            'paneProperties.vertGridProperties.color': '#2A2A3A',
            'paneProperties.horzGridProperties.color': '#2A2A3A',
            'symbolWatermarkProperties.transparency': 90,
            'scalesProperties.textColor': '#B0B0C0',
            'scalesProperties.backgroundColor': '#1E1E2F'
          }
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [symbol, width, height, interval, theme, style, locale, toolbar_bg, enable_publishing, hide_top_toolbar, hide_legend, save_image, container_id]);

  return <div ref={container} id={container_id} className="w-full h-full rounded-lg overflow-hidden" />;
}
