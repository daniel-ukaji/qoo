import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-full">{children[0]}</div>
      <div className="w-1/2 h-full">{children[1]}</div>
    </div>
  );
};


export default Layout;
