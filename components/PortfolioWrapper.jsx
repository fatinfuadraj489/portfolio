"use client";

import { useState } from "react";
import Portfolio from "./Portfolio";
import VideoModal from "./VideoModal";

export default function PortfolioWrapper() {
  const [activeVideo, setActiveVideo] = useState(null);

  const handleOpenModal = (video) => {
    setActiveVideo(video);
  };

  const handleCloseModal = () => {
    setActiveVideo(null);
  };

  return (
    <>
      <Portfolio onOpenModal={handleOpenModal} />
      <VideoModal video={activeVideo} onClose={handleCloseModal} />
    </>
  );
}
