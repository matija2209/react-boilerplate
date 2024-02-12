import { useState, useEffect } from "react";

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the device is mobile
    const checkIsMobile = () => {
      return window.innerWidth < 768;
    };

    // Initial check
    setIsMobile(checkIsMobile());

    // Handler to call on window resize
    function handleResize() {
      setIsMobile(checkIsMobile());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
