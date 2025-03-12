import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image as ImageIcon, Camera, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";

interface ImageUploaderProps {
  onImageUpload: (files: File[]) => void;
  className?: string;
}

const MAX_IMAGES = 5;
const MAX_SIZE_MB = 30;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const ImageUploader = ({ onImageUpload, className }: ImageUploaderProps) => {
  const { t } = useLanguage();
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(Array.from(files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    if (previewUrls.length + newFiles.length > MAX_IMAGES) {
      toast({
        title: "Limite atteinte",
        description: `Vous pouvez télécharger un maximum de ${MAX_IMAGES} images`,
        variant: "destructive"
      });
      return;
    }

    const validFiles = newFiles.filter(file => {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Format non supporté",
          description: "Seules les images sont acceptées",
          variant: "destructive"
        });
        return false;
      }

      if (file.size > MAX_SIZE_BYTES) {
        toast({
          title: "Fichier trop volumineux",
          description: `La taille maximale est de ${MAX_SIZE_MB} Mo`,
          variant: "destructive"
        });
        return false;
      }

      return true;
    });

    if (validFiles.length === 0) return;

    const newUrls = validFiles.map(file => URL.createObjectURL(file));
    const updatedUrls = [...previewUrls, ...newUrls];
    
    setPreviewUrls(updatedUrls);
    
    onImageUpload(validFiles);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(Array.from(files));
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    
    const updatedUrls = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(updatedUrls);
    
    onImageUpload([]);
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
        <h2 className="text-2xl font-semibold mb-2">{t("imageUploader.title")}</h2>
        <p className="text-muted-foreground">
          {t("imageUploader.description")}
        </p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />

      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {previewUrls.map((url, index) => (
            <motion.div
              key={`preview-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square rounded-lg overflow-hidden group"
            >
              <img
                src={url}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/90 text-foreground hover:bg-white"
                  onClick={() => removeImage(index)}
                >
                  <X size={18} />
                </Button>
              </div>
            </motion.div>
          ))}
          
          {previewUrls.length < MAX_IMAGES && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-natural-leaf/50 hover:bg-accent/30"
              onClick={triggerFileInput}
            >
              <Plus size={24} className="text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">{t("imageUploader.addMore")}</span>
            </motion.div>
          )}
        </div>
      )}

      <AnimatePresence mode="wait">
        {previewUrls.length === 0 && (
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
              <h3 className="text-lg font-medium mb-1">{t("imageUploader.dropzone.title")}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {t("imageUploader.dropzone.description")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("imageUploader.dropzone.fileTypes")}
              </p>
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
          {t("imageUploader.buttons.browse")}
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
          {t("imageUploader.buttons.camera")}
        </Button>
      </div>
    </motion.div>
  );
};

export default ImageUploader;
