import React from "react";

const LinkCard = ({
  description,
  href,
  img,
  title,
}: {
  description?: string;
  href: string;
  img?: string;
  title: string;
}) => {
  return (
    <a
      className="not-prose hover:border-primary/50 group my-8 block overflow-hidden rounded-lg border border-border bg-surface transition-all hover:shadow-md"
      href={href}
      style={{ textDecoration: "none" }}
    >
      <div className="flex items-center gap-4 p-4">
        {img && (
          <div className="flex-shrink-0">
            <img
              alt={title}
              className="h-16 w-16 rounded-md object-cover"
              src={img}
            />
          </div>
        )}
        <div className="flex-grow">
          <div className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">
            Related Article
          </div>
          <h4 className="text-text-main m-0 text-lg font-bold transition-colors group-hover:text-primary">
            {title}
          </h4>
          {description && (
            <p className="text-text-muted m-0 mt-1 line-clamp-1 text-sm">
              {description}
            </p>
          )}
        </div>
        <div className="text-text-muted flex-shrink-0 transition-colors group-hover:text-primary">
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
};

export default LinkCard;
