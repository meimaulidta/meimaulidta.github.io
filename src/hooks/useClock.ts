import { useEffect, useState } from "react";

const formatter = (() => {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
})();

const now = () => `SBY ${formatter.format(new Date())}`;

export function useClock() {
  const [time, setTime] = useState(now);

  useEffect(() => {
    const id = window.setInterval(() => setTime(now()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}
