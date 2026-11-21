import { Fragment } from "react";

const MARQUEE_ITEMS = [
  "Content creation",
  "Digital marketing",
  "Social media strategy",
  "Brand storytelling",
  "Community building",
  "Content creation",
  "Digital marketing",
  "Social media strategy",
];

function MarqueeGroup() {
  return (
    <div className="marquee__group">
      {MARQUEE_ITEMS.map((item, index) => (
        <Fragment key={`${item}-${index}`}>
          <span>{item}</span>
          <i></i>
        </Fragment>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true" data-reveal>
      <div className="marquee__track">
        <MarqueeGroup />
        <MarqueeGroup />
      </div>
    </div>
  );
}
