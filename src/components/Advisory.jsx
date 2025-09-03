import React from "react";
import { Building2, Users, LineChart } from "lucide-react";

export default function Advisory() {
  const items = [
    {
      icon: Building2,
      title: "Strategy & Governance",
      desc: "Board advisory, growth paths, risk & resilience.",
    },
    {
      icon: Users,
      title: "Leadership & Culture",
      desc: "Capability building, learning design, empowerment.",
    },
    {
      icon: LineChart,
      title: "Innovation & Systems",
      desc: "Diagnostics, systems mapping, investment cases.",
    },
  ];
  return (
    <section id="advisory" className="section-muted">
      <div className="container">
        <h2 className="slide-left">Advisory Focus</h2>
        <div
          className="stack-16"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
            gap: 16,
            marginTop: 12,
          }}
        >
          {items.map(({ icon: Icon, title, desc }, i) => {
            const I = Icon;
            return (
              <div className="card reveal" key={i}>
                <I size={22} color="#0f2544" />
                <div style={{ fontWeight: 700, marginTop: 8 }}>{title}</div>
                <div style={{ color: "", marginTop: 6 }}>
                  {desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
