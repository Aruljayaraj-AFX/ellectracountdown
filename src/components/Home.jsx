import React, { useState, useEffect } from 'react';
import ellectra from '../assets/ellectra.png'


const FlipDigit = ({ digit, prevDigit }) => {
  const [isFlipping, setIsFlipping] = React.useState(false);

  React.useEffect(() => {
    if (prevDigit !== digit) {
      setIsFlipping(true);
      const timer = setTimeout(() => setIsFlipping(false), 600);
      return () => clearTimeout(timer);
    }
  }, [digit, prevDigit]);

  return (
    <div className="relative w-20 h-24 sm:w-20 sm:h-26 md:w-32 lg:w-32 lg:h-40 md:h-40">
      <style>{`
        @keyframes flipDown {
          0% {
            transform: rotateX(0deg);
          }
          100% {
            transform: rotateX(-90deg);
          }
        }
        
        @keyframes flipUp {
          0% {
            transform: rotateX(90deg);
          }
          100% {
            transform: rotateX(0deg);
          }
        }
        
        .flip-card-top {
          position: absolute;
          width: 100%;
          height: 0%;
          overflow: hidden;
          top: 0;
        }
        
        .flip-card-bottom {
          position: absolute;
          width: 100%;
          height: 90%;
          overflow: hidden;
          bottom: 0;
        }
        
        .flip-card-top-flip {
          position: absolute;
          width: 100%;
          height: 0%;
          overflow: hidden;
          top: 0;
          z-index: 2;
          animation: flipDown 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955);
          transform-origin: 0% 100%;
        }
        
        .flip-card-bottom-flip {
          position: absolute;
          width: 100%;
          height: 10%;
          overflow: hidden;
          bottom: 0;
          z-index: 1;
          transform-origin: 0% 0%;
        }
      `}</style>
      
      
      
      {/* Static bottom half - shows current digit */}
      <div className="flip-card-bottom bg-black rounded-lg">
        <div className="absolute inset-0 flex items-start justify-center ">
          <span className="text-7xl sm:text-8xl md:text-9xl lg:text-12xl font-bold text-red-600">{digit}</span>
        </div>
      </div>
      
      
      {/* Center divider line */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-800 transform -translate-y-1/2 z-10"></div>
    </div>
  );
};

export default function ComingSoonPage() {

  // 🎯 FIXED TARGET DATE → 23 Jan 2026, 12:00 PM
  const TARGET_DATE = new Date(2026, 0, 23, 12, 0, 0);

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = TARGET_DATE - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);
  const [prevTimeLeft, setPrevTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(current => {
        setPrevTimeLeft(current);
        return calculateTimeLeft();
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const secondsStr = String(timeLeft.seconds).padStart(2, "0");
  const prevSecondsStr = String(prevTimeLeft.seconds).padStart(2, "0");

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <img
        src={ellectra}
        alt="Ellectra Logo"
        className="absolute top-5 left-5 w-32 h-auto z-20"
      />

      {/* Background text */}
      <div className="absolute inset-0 mt-20 sm:mt-20 md:-mt-3 lg:-mt-29 
                flex items-start justify-center 
                lg:items-center lg:justify-start 
                pointer-events-none overflow-hidden">
  <h1 className="text-[3rem] md:text-[7rem] font-black text-gray-200 
                 whitespace-nowrap slide-from-right">
    COMING
  </h1>
</div>

      <div className="absolute inset-0 lg:-mt-29 mt-30 
                flex items-center justify-center lg:justify-end 
                pointer-events-none overflow-hidden">
  <h1 className="text-[3rem] md:text-[7rem] font-black text-gray-200 
                 whitespace-nowrap slide-from-left">
    SOON
  </h1>
</div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl ">

        {/* Top timer */}
        <div className="mb-3 mt-26 text-center">
          <div className="flex items-center gap-6 text-3xl sm:text-4xl font-bold text-gray-900">
            <div className="flex flex-col items-center">
              <span>{String(timeLeft.days).padStart(2, "0")}</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mt-1">Days</span>
            </div>
            <span>:</span>
            <div className="flex flex-col items-center">
              <span>{String(timeLeft.hours).padStart(2, "0")}</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mt-1">Hours</span>
            </div>
            <span>:</span>
            <div className="flex flex-col items-center">
              <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mt-1">Min</span>
            </div>
          </div>
        </div>

        {/* Flip seconds */}
        <div className="mb-3 text-center heartbeat">
          <div className="flex gap-3">
            <FlipDigit digit={secondsStr[0]} prevDigit={prevSecondsStr[0]} />
            <FlipDigit digit={secondsStr[1]} prevDigit={prevSecondsStr[1]} />
          </div>
        </div>

        <div className="text-xs text-gray-400 uppercase tracking-[0.5em] mb-10 text-center">
          Seconds
        </div>

        {/* Text */}
        <div className="max-w-xl">
  <h2 className="text-xl lg:text-4xl font-bold mb-4 mt-10 text-left typing">
    Components. Projects. Products.
  </h2>

  <p
    className="text-gray-500 leading-relaxed text-left fade-in"
    style={{ animationDelay: "3.2s" }}
  >
    Ellectra is your trusted technology partner for electronic components,
    project guidance, and product development. We help ideas move from
    concept to reality — with precision, performance, and purpose.
  </p>
</div>
</div>
    </div>
  );
}
