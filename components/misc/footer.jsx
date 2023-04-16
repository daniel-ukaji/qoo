import React from "react";

const Footer = () => {
  return (
    <footer className="mx-auto flex flex-col md:flex-row max-w-[90rem] items-center justify-between border-t border-t-gray-200 px-20 py-7 text-sm font-normal text-secondary">
      <div className="flex flex-col-reverse items-center md:flex-row space-x-4">
        <h1>© 2022 Qoospayce, Inc.</h1>
        <ul className="flex space-x-3 cursor-pointer">
          <li>Terms</li>
          <li>Privacy</li>
          <li>Sitemap</li>
        </ul>
      </div>
      <div>
        <div>
          <ul className="flex space-x-3 cursor-pointer">
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
