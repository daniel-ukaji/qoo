import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row md:h-screen">
      <div className="md:w-1/2 md:h-full">{children[0]}</div>
      <div className="md:w-1/2 md:h-full">{children[1]}</div>
    </div>
  );
};


export default Layout;
