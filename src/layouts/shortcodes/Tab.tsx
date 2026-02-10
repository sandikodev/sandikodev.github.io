import React from "react";

function Tab({ children, name }: { children: React.ReactNode; name: string }) {
  return <div data-name={name}>{children}</div>;
}

export default Tab;
