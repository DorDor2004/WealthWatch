import React, { useEffect } from "react";
import "../stocks.css";

// Extend the window interface to include TradingView
declare global {
  interface Window {
    TradingView: any;
  }
}

function StockWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          width: 980,
          height: 610,
          symbol: "NASDAQ:AAPL",
          interval: "D",
          timezone: "Etc/UTC",
          theme: "light",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_c8b6f",
        });
      }
    };

    document.body.appendChild(script);

    // Cleanup function to remove the script
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <p className="message">
        Here is a free tool from TradingView that you can use to check the
        real-time value of any stock!
      </p>
      <div className="tradingview-widget-container">
        <div id="tradingview_c8b6f"></div>
        <div className="tradingview-widget-copyright">
          <a href="https://www.tradingview.com" rel="noopener" target="_blank">
            <span className="blue-text">TradingView</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default StockWidget;
