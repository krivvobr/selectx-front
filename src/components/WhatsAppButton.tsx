import { Button } from "@/components/ui/button";

import property1 from "@/assets/whatsapp.apng";
const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/554832633090"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50"
    >
      <Button variant="luxury" size="lg" className="rounded-full w-16 h-16 p-0">
        <img src={property1} alt="WhatsApp" className="w-10 h-10" />
      </Button>
    </a>
  );
};

export default WhatsAppButton;
