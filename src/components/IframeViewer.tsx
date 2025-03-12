
import React, { useEffect, useState } from "react";

interface IframeViewerProps {
  url: string;
  title?: string;
  className?: string;
}

const IframeViewer = ({ url, title = "External content", className = "" }: IframeViewerProps) => {
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    // Détecte si notre application est déjà dans une iframe
    try {
      setIsInIframe(window.self !== window.top);
    } catch (e) {
      // Si une erreur se produit (par exemple, pour des raisons de sécurité cross-origin),
      // nous supposons par prudence que nous sommes dans une iframe
      setIsInIframe(true);
    }
  }, []);

  if (isInIframe) {
    return (
      <div className="w-full p-6 border border-border rounded-lg bg-muted">
        <p className="text-center text-muted-foreground">
          L'intégration dans une iframe est désactivée lorsque l'application est déjà dans une iframe 
          pour éviter une mise en abîme.
        </p>
      </div>
    );
  }

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
