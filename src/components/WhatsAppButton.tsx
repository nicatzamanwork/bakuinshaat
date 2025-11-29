import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phoneNumber = '+994501234567'; // Replace with actual number
  const message = 'Salam! Məhsullarınız haqqında məlumat almaq istəyirəm.';
  
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-40"
      aria-label="WhatsApp ilə əlaqə"
    >
      <MessageCircle className="text-white" size={28} />
    </button>
  );
}
