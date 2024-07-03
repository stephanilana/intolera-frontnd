import React, { useState } from "react";
import Link from "next/link";

export default function ProfilePost({ setShowPostId, props }: any) {
  const [showOverlay, setShowOverlay] = useState(false);

  const FeedPost = (postId: number) => {
    setShowPostId(postId);
    return false;
  };

  return (
    <div
      className={`relative aspect-square w-[33.33%] overflow-hidden md:w-[32%]`}
      onMouseEnter={() => setShowOverlay(true)}
    >
      <Link
        href="#"
        onClick={() => {
          FeedPost(props._id);
          return false;
        }}
      >
        <div
          className={`absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-60 text-white ${
            showOverlay ? "" : "hidden"
          }`}
          onMouseLeave={() => setShowOverlay(false)}
        ></div>
      </Link>
      <img
        src={"data:image/svg;base64," + props.picture_publication}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
