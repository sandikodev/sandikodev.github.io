import React from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const Youtube = ({
  id,
  title,
  ...rest
}: {
  [key: string]: any;
  id: string;
  title: string;
}) => {
  return (
    <LiteYouTubeEmbed
      id={id}
      title={title}
      wrapperClass="yt-lite rounded-lg"
      {...rest}
    />
  );
};

export default Youtube;
