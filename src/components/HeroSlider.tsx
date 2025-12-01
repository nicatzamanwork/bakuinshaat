import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1734864220078-c7354732aa7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmFjdG9yeSUyMHN0ZWVsfGVufDF8fHx8MTc2MzcyNTgzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Müasir İstehsal Kompleksi",
    subtitle:
      "Avropa texnologiyaları ilə yüksək keyfiyyətli metal məhsulların istehsalı",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1747999060057-89b7a533f347?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVlbCUyMHByb2R1Y3Rpb24lMjBsaW5lfGVufDF8fHx8MTc2MzcyNTgzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Fasiləsiz Tökükxana Texnologiyası",
    subtitle: "Yüksək məhsuldarlıq və dəqiqlik",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1758873263528-6dbd0422cf84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMG1hbnVmYWN0dXJpbmclMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYzNzI1ODQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Peşəkar Komanda",
    subtitle: "500+ ixtisaslı mütəxəssis və mühəndis",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1758798349125-5c297b18b8b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwd29ya2VycyUyMHNhZmV0eXxlbnwxfHx8fDE3NjM3MTgwMjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Təhlükəsizlik və Keyfiyyət",
    subtitle: "Beynəlxalq standartlara tam uyğunluq",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const goToPrevious = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative w-full h-[600px] lg:h-[700px] bg-gray-900 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <ImageWithFallback
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/40" />

          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="bg-blue-900/70 p-12 lg:p-12 w-full max-w-xl ml-auto rounded-l-lg transform translate-x-12 sm:translate-x-0">
                <div className="text-sm tracking-[0.2em] text-blue-200 mb-4">
                  INDUSTRIAL EXCELLENCE
                </div>
                <h1 className="text-white mb-4 text-4xl lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="text-blue-100 text-lg lg:text-xl max-w-2xl">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={goToPrevious}
        className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="text-white" size={24} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
