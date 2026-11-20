"use client";

import { Children, cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from "react";

export default function ServiceCarousel({ children, arabic }: { children: ReactNode; arabic: boolean }) {
  return (
    <div className="service-carousel" role="region" aria-label={arabic ? "خدماتنا" : "Our services"}>
      <div className="service-carousel-deck">
        {Children.toArray(children).map((slide, index) => {
          if (!isValidElement(slide)) return null;
          const element = slide as ReactElement<{ style?: CSSProperties; children?: ReactNode }>;
          return cloneElement(element, {
            style: { ...element.props.style, "--paper-index": index, zIndex: index + 1 } as CSSProperties,
            children: <><span className="service-card-number" aria-hidden="true" data-preserve-font="true">{String(index + 1).padStart(2, "0")}</span>{element.props.children}</>,
          });
        })}
      </div>
    </div>
  );
}
