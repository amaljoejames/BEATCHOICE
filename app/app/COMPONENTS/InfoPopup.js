// COMPONENTS/InfoPopup.tsx
import { Card } from "@/components/ui/card";

const InfoPopup = ({ title, description }) => {
  return (
    <Card className="p-4 shadow-lg bg-black/40 backdrop-blur-md text-white max-w-xs mx-auto mb-4 border border-white/20">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </Card>
  );
};

export default InfoPopup;
