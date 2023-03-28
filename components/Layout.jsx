import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-1/2">{children[0]}</div>
      <div className="w-1/2">{children[1]}</div>
    </div>
  );
};

export default Layout;
