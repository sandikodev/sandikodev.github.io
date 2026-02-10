import React from "react";

const Button = ({
  label,
  link,
  rel,
  style,
}: {
  label: string;
  link: string;
  rel?: string;
  style?: string;
}) => {
  return (
    <a
      className={`btn mb-4 me-4 no-underline hover:text-white ${
        style === "outline" ? "btn-outline-primary" : "btn-primary"
      }`}
      href={link}
      rel={`noopener noreferrer ${
        rel ? (rel === "follow" ? "" : rel) : "nofollow"
      }`}
      target="_blank"
    >
      {label}
    </a>
  );
};

export default Button;
