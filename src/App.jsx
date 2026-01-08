import { useEffect, useState } from "react";
import Home from "./components/Home";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading && <SplashScreen onFinish={() => setLoading(false)} />}

      {!loading && (
        <>
          <Home />
          <Footer />
        </>
      )}
    </>
  );
}
