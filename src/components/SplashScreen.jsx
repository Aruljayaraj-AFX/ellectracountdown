import { useEffect } from "react";
import ellectraLogo from "../assets/ellectra.png";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2200); // animation duration

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0  bg-black flex items-center justify-center">
      <img
        src={ellectraLogo}
        alt="Ellectra"
        className="w-56 animate-logoReveal"
      />
    </div>
  );
}
