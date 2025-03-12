
import React from "react";

interface IframeViewerProps {
  url: string;
  title?: string;
  className?: string;
}

const IframeViewer = ({ url, title = "External content", className = "" }: IframeViewerProps) => {
  return (
    <div className="w-full h-full flex flex-col">
      <iframe 
        src={url}
        title={title}
        className={`w-full flex-1 min-h-[500px] border border-border rounded-lg ${className}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default IframeViewer;
