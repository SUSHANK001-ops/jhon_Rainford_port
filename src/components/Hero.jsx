import React from "react";
import { IconRow } from "./Icons";
import { useButtonRipplesReact } from "./animations";

export default function Hero() {
  useButtonRipplesReact(React);
  return (
    <header className="hero">
      <div className="container">
        <IconRow />
        <div className="stack-16">
          <div className="avatar-wrap reveal">
            <img
              className="avatar"
              src="/john-rainford.png"
              alt="John Rainford - Strategic Advisor & Educator"
            />
          </div>
          <h1 className="headline reveal">
            Strategic Advisor • Educator • Innovator
          </h1>
          <p className="sub reveal">
            30+ years transforming organizations through systems thinking,
            leadership development, and innovation strategy
          </p>
          <div
            className="stack-10"
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {["About", "Experience", "Portfolio", "Speaking", "Contact"].map(
              (id) => (
                <a
                  key={id}
                  href={`#${id.toLowerCase()}`}
                  className="btn ripple"
                >
                  {id}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
