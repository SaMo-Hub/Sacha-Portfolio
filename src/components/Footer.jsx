import React, { createRef } from "react";
import { data, Link } from "react-router";

export const Footer = ({ primaryColor }) => {
  const navLinks = [
    { label: "home", to: "/" },
    { label: "à propos", to: "/about" },
    // { label: "portfolio", to: "/portfolio" },
  ];

  const socialLinks = [
    { label: "github", to: "https://github.com/SaMo-Hub" },
    { label: "linkedin", to: "https://www.linkedin.com/in/sacha-moricet-245128196/" },
  ];

  const renderLinks = (links, offset) =>
    links.map((link, i) => (
      <li key={i} className="relative w-fit group overflow-hidden">
        <Link to={link.to}>
          <p>{link.label}</p>
          <div
            style={{ backgroundColor: primaryColor }}
            className={`-translate-x-[70px] group-hover:translate-x-0 transition duration-500 h-[1.5px] w-full`}
          />
        </Link>
      </li>
    ));
  return (
    <footer className="z-10 flex-wrap gap-12 mt-20 relative mx-8 md:mx-12 py-12 border-t-2 flex justify-between font-supply items-end text-xs uppercase">
      <div className="flex flex-wrap items-end gap-12">
        <ul>{renderLinks(navLinks, 40)}</ul>
        <ul>{renderLinks(socialLinks, 70)}</ul>
      </div>

      <a
        className="relative group overflow-hidden"
        href="mailto:smoricet.contact@gmail.com"
      >
        <p>smoricet.contact@gmail.com</p>
        <div
          style={{ backgroundColor: primaryColor }}
          className="-translate-x-[190px] group-hover:translate-x-0 transition duration-300 h-[1.5px] w-full"
        />
      </a>
    </footer>
  );
};
