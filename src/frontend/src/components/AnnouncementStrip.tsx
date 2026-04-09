import { X } from "lucide-react";
import { useState } from "react";

interface AnnouncementStripProps {
  message?: string;
  onDismiss?: () => void;
}

const DEFAULT_MESSAGE =
  "🎉 New Arrivals: Kundan & Temple Jewellery Collections | MOQ 50 Pcs | WhatsApp +91 7976341419 for wholesale pricing";

export default function AnnouncementStrip({
  message = DEFAULT_MESSAGE,
  onDismiss,
}: AnnouncementStripProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      className="w-full py-2 px-4 text-center text-sm font-medium flex items-center justify-center gap-2 relative"
      style={{
        background:
          "linear-gradient(90deg, #D4AF37 0%, #f0c940 50%, #D4AF37 100%)",
        color: "#1A237E",
      }}
      data-ocid="announcement.strip"
    >
      <span className="flex-1 leading-snug">{message}</span>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/10 transition-colors flex-shrink-0"
        data-ocid="announcement.dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
