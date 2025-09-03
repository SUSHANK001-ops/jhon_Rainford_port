import React, { useEffect, useRef } from "react";
import { IconScatter } from "./Icons";
import { scatterReform } from "./animations";

export default function Loader({ onReady }) {
  const rootRef = useRef(null);
  const textRef = useRef(null);
  useEffect(() => {
    if (!rootRef.current || !textRef.current) return;
    const tl = scatterReform(rootRef, textRef);
    const t = setTimeout(() => onReady?.(), 1800);
    return () => {
      tl.kill();
      clearTimeout(t);
    };
  }, [onReady]);

  return (
    <div className="loader" ref={rootRef} aria-label="Loading">
      <div
        style={{ position: "relative", width: "min(520px, 92vw)", height: 220 }}
      >
        <IconScatter count={24} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
          }}
        >
          <div className="stack-6" style={{ textAlign: "center" }}>
            <div
              className="name"
              ref={textRef}
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              John Rainford
            </div>
            <div className="subtitle">
              Strategic Advisor | Educator | Innovator
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
