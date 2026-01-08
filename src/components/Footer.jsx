import React, { useEffect, useState } from "react";

const API_URL = "https://ksrubber-backend.vercel.app/afx/pro_ksrubber/v1/email";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [rewardsClaimed, setRewardsClaimed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // ✅ Check localStorage on load
  useEffect(() => {
    const claimed = localStorage.getItem("rewardsClaimed");
    if (claimed === "1") setRewardsClaimed(true);
  }, []);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleActivate = async () => {
    setError("");
    setSuccessMsg("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok && data.detail === "Email already registered") {
        setError("This email has already claimed rewards. Try another email.");
        return;
      }

      localStorage.setItem("rewardsClaimed", "1");
      setRewardsClaimed(true);
      setSuccessMsg("🎉 Rewards claimed successfully!");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-green-800 min-h-screen flex flex-col">
      {/* Grid Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(242,237,237,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(242,237,237,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Hero Card */}
      <div className="relative bg-gray-100 rounded-b-[3rem] px-6 py-12 shadow-2xl text-center">
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg">
          Activate Your Ellectra Rewards
        </h1>

        <img
          src="https://res.cloudinary.com/dosahgtni/image/upload/v1767888271/ChatGPT_Image_Jan_8__2026__07_03_28_PM-removebg-preview_xp6nkd.png"
          alt="Ellectra Rewards"
          className="mx-auto mt-6 w-32 h-32 lg:w-40 lg:h-40 rounded-full shadow-xl ring-4 ring-yellow-400 ring-offset-4"
        />

        {/* Email Section */}
        <div className="mt-8 flex justify-center px-4">
          <div className="relative w-full max-w-md">
            <div
              className={`absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-full blur-lg transition-opacity duration-500 ${
                isFocused ? "opacity-30" : "opacity-0"
              }`}
            />

            {rewardsClaimed ? (
              <div className="text-green-600 font-semibold text-lg mt-6 text-center">
                Rewards redeemed. Thank you!
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter your email"
                  className="relative w-full px-6 py-3 lg:py-4 rounded-full bg-white text-gray-800
                             border-2 border-yellow-300 shadow-lg
                             focus:outline-none focus:border-yellow-500 focus:shadow-2xl
                             placeholder-gray-400 transition-all duration-300"
                />

                {error && (
                  <p className="text-red-500 text-sm mt-2 text-center">
                    {error}
                  </p>
                )}

                {successMsg && (
                  <p className="text-green-600 text-sm mt-2 text-center">
                    {successMsg}
                  </p>
                )}

                <button
  onClick={handleActivate}
  disabled={loading}
  className="mt-4 z-[100] relative bg-black text-white px-8 py-3 rounded-full
             hover:scale-105 transition disabled:opacity-60 cursor-pointer"
>
  {loading ? "Activating..." : "Activate"}
</button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="relative flex-1 flex items-center justify-center px-6 py-12">
        <div
          className="text-center text-4xl md:text-6xl lg:text-8xl tracking-wider
                     bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600
                     bg-clip-text text-transparent
                     drop-shadow-[0_4px_12px_rgba(212,175,55,0.7)]"
          style={{ fontFamily: "'Oooh Baby', cursive" }}
        >
          Built to support you at every step.
        </div>
      </div>
    </div>
  );
}
