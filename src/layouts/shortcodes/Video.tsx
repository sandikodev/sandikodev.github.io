import React from "react";
function Video({
  height = "auto",
  src,
  title,
  width = 500,
  ...rest
}: {
  [key: string]: any;
  height: "auto" | number;
  src: string;
  title: string;
  width: number;
}) {
  return (
    <video
      className="overflow-hidden rounded-lg"
      controls
      height={height}
      width={width}
      {...rest}
    >
      <source
        src={src.match(/^http/) ? src : `/videos/${src}`}
        type="video/mp4"
      />
      {title}
    </video>
  );
}

export default Video;
