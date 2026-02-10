import { marked } from "marked";
import React, { useEffect, useRef, useState } from "react";

marked.use({
  async: false,
});

const Tabs = ({ children }: { children: React.ReactElement }) => {
  const [active, setActive] = useState<number>(0);
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    tabRefs.current[active]?.focus();
  }, [active]);

  const tabLinks = Array.from(
    children.props.value.matchAll(
      /<div\s+data-name="([^"]+)"[^>]*>(.*?)<\/div>/gs,
    ),
    (match: RegExpMatchArray) => ({ children: match[0], name: match[1] }),
  );

  const handleKeyDown = (
    event: React.KeyboardEvent<EventTarget>,
    index: number,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      setActive(index);
    } else if (event.key === "ArrowRight") {
      setActive((active + 1) % tabLinks.length);
    } else if (event.key === "ArrowLeft") {
      setActive((active - 1 + tabLinks.length) % tabLinks.length);
    }
  };

  return (
    <div className="tab">
      <ul className="tab-nav">
        {tabLinks.map(
          (item: { children: string; name: string }, index: number) => (
            <li
              className={`tab-nav-item ${index === active && "active"}`}
              key={index}
              onClick={() => setActive(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(ref) => (tabRefs.current[index] = ref)}
              role="tab"
              tabIndex={index === active ? 0 : -1}
            >
              {item.name}
            </li>
          ),
        )}
      </ul>
      {tabLinks.map((item: { children: string; name: string }, i: number) => (
        <div
          className={active === i ? "tab-content block px-5" : "hidden"}
          dangerouslySetInnerHTML={{
            __html: marked.parse(item.children),
          }}
          key={i}
        />
      ))}
    </div>
  );
};

export default Tabs;
