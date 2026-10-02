import React from "react";
import { Link } from "react-router";
import { profile } from "../profile";

// Pied de page : navigation + coordonnées, mono xs, filet `border-t-2`.
// Chaque lien a le souligné qui glisse, de la couleur d'encre (`primaryColor`).
// Sur écran tactile (`pointer-coarse`), `py-3` porte la zone tactile à ~42 px.
export const Footer = ({ primaryColor }) => {
  const navLinks = [
    { label: "home", to: "/" },
    { label: "à propos", to: "/about" },
  ];

  // Liens externes : ouverts dans un nouvel onglet
  const socialLinks = [{ label: "linkedin", href: profile.linkedin }];

  // Souligné qui glisse : parent `overflow-hidden`, barre sortie à gauche
  const underline = (
    <div
      style={{ backgroundColor: primaryColor }}
      className="-translate-x-full group-hover:translate-x-0 group-focus-visible:translate-x-0 transition duration-500 h-[1.5px] w-full"
    />
  );

  return (
    <footer className="z-10 flex-wrap gap-12 mt-20 relative mx-8 md:mx-12 py-12 border-t-2 flex justify-between font-outfit items-end text-xs uppercase">
      <div className="flex flex-wrap items-end gap-12">
        <ul>
          {navLinks.map((link) => (
            <li key={link.to} className="relative w-fit group overflow-hidden">
              <Link to={link.to} className="block pointer-coarse:py-3">
                <p>{link.label}</p>
                {underline}
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          {socialLinks.map((link) => (
            <li key={link.href} className="relative w-fit group overflow-hidden">
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="block pointer-coarse:py-3">
                <p>{link.label}</p>
                {underline}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <a className="relative group overflow-hidden block pointer-coarse:py-3" href={`mailto:${profile.email}`}>
        <p>{profile.email}</p>
        {underline}
      </a>
    </footer>
  );
};
