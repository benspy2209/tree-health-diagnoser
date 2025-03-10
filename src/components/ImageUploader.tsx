
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image as ImageIcon, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  className?: string;
}

const ImageUploader = ({ onImageUpload, className }: ImageUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    // Vérifier si le fichier est une image
    if (!file.type.startsWith("image/")) {
      console.error("Le fichier doit être une image");
      return;
    }

    // Créer l'URL de prévisualisation
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onImageUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const removeImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("w-full max-w-2xl mx-auto", className)}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">Téléchargez une photo</h2>
        <p className="text-muted-foreground">
          Prenez ou téléchargez une photo claire de l'arbre pour améliorer le diagnostic
        </p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {!previewUrl ? (
          <motion.div
            key="uploader"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "relative border-2 border-dashed rounded-xl p-8 transition-all duration-300",
              "hover:border-natural-leaf/50 hover:bg-accent/30",
              isDragging ? "border-natural-leaf/70 bg-accent/50" : "border-border",
              "flex flex-col items-center justify-center text-center h-64 md:h-80"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <div className="absolute inset-4 flex flex-col items-center justify-center cursor-pointer">
              <div className="rounded-full bg-muted/50 p-4 mb-4">
                <Upload size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">Déposer votre image ici</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Ou cliquez pour parcourir vos fichiers
              </p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG ou GIF • 10 MB maximum
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden group"
          >
            <img
              src={previewUrl}
              alt="Aperçu de l'image"
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button
                variant="outline"
                size="icon"
                className="bg-white/90 text-foreground hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
              >
                <X size={18} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={triggerFileInput}
        >
          <ImageIcon size={18} className="mr-2" />
          Parcourir les fichiers
        </Button>
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => {
            fileInputRef.current?.setAttribute("capture", "environment");
            triggerFileInput();
          }}
        >
          <Camera size={18} className="mr-2" />
          Prendre une photo
        </Button>
      </div>
    </motion.div>
  );
};

export default ImageUploader;
