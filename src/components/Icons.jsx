import { ICONS, ICON_COLOR } from "../icons";

export function IconScatter({ count = 24 }) {
  return (
    <div className="icon-layer" aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const Icon = ICONS[i % ICONS.length];
        const left = Math.random() * 100 + "%";
        const top = Math.random() * 100 + "%";
        return (
          <div className="icon" key={i} style={{ left, top }}>
            <Icon size={22} color={ICON_COLOR} />
          </div>
        );
      })}
    </div>
  );
}

export function IconRow() {
  return (
    <div className="icon-layer" aria-hidden data-parallax="0.35">
      {ICONS.map((Icon, i) => (
        <div
          key={i}
          className="icon"
          style={{ left: 8 + i * 14 + "%", top: 10 + (i % 3) * 22 + "%" }}
        >
          <Icon size={22} color={ICON_COLOR} />
        </div>
      ))}
    </div>
  );
}
