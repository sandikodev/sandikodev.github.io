import Fuse from "fuse.js";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { BiCalendarEdit, BiCategoryAlt } from "react-icons/bi";

import config from "@/config/config.json";
import dateFormat from "@/lib/utils/dateFormat";
import { humanize, slugify } from "@/lib/utils/textConverter";
const { summary_length } = config.settings;

export interface SearchItem {
  content: any;
  data: any;
  slug: string;
}

interface Props {
  searchList: SearchItem[];
}

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

export default function SearchBar({ searchList }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState(() => {
    if (typeof window === "undefined") return "";
    const searchUrl = new URLSearchParams(window.location.search);
    return searchUrl.get("q") || "";
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const fuse = React.useMemo(
    () =>
      new Fuse(searchList, {
        includeMatches: true,
        keys: ["data.title", "data.categories", "data.tags"],
        minMatchCharLength: 2,
        threshold: 0.5,
      }),
    [searchList],
  );

  const searchResults = React.useMemo(() => {
    return inputVal.length > 2 ? fuse.search(inputVal) : [];
  }, [inputVal, fuse]);

  useEffect(() => {
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");

    setTimeout(function () {
      if (inputRef.current) {
        inputRef.current.selectionStart = inputRef.current.selectionEnd =
          searchStr?.length || 0;
      }
    }, 50);
  }, []);

  useEffect(() => {
    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newRelativePathQuery);
    } else {
      history.pushState(null, "", window.location.pathname);
    }
  }, [inputVal]);

  return (
    <div className="min-h-[45vh]">
      <input
        autoComplete="off"
        autoFocus
        className="form-input w-full text-center"
        name="search"
        onChange={handleChange}
        placeholder="Type here to Search posts"
        ref={inputRef}
        type="text"
        value={inputVal}
      />

      {inputVal.length > 1 && (
        <div className="my-6 text-center">
          Found {searchResults.length}
          {searchResults.length === 1 ? " result" : " results"} for '{inputVal}'
        </div>
      )}

      <div className="row">
        {searchResults.map(({ item }: SearchResult) => (
          <div className="col-12 sm:col-6 mb-8" key={item.slug}>
            {item.data.image && (
              <a
                className="group block overflow-hidden rounded-lg hover:text-primary"
                href={`/${item.slug}`}
              >
                <img
                  alt={item.data.title}
                  className="w-full transition duration-300 group-hover:scale-[1.03]"
                  height={230}
                  src={item.data.image}
                  width={445}
                />
              </a>
            )}

            <ul className="mb-4 mt-6 flex flex-wrap items-center text-text">
              <li className="mr-5 flex flex-wrap items-center font-medium">
                <BiCalendarEdit className="mr-1 h-5 w-5 text-gray-600" />
                <>{dateFormat(item.data.date)}</>
              </li>
              <li className="mr-5 flex flex-wrap items-center">
                <BiCategoryAlt className="mr-1 h-[18px] w-[18px] text-gray-600" />
                <>
                  <ul>
                    {item.data.categories.map((category: string, i: number) => (
                      <li className="inline-block" key={i}>
                        <a
                          className="mr-2 font-medium hover:text-primary"
                          href={`/categories/${slugify(category)}`}
                        >
                          {humanize(category)}
                          {i !== item.data.categories.length - 1 && ","}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              </li>
            </ul>

            <h3 className="mb-2">
              <a
                className="block transition duration-300 hover:text-primary"
                href={`/${item.slug}`}
              >
                {item.data.title}
              </a>
            </h3>
            <p className="text-text">
              {item.content?.slice(0, Number(summary_length))}
              ...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
