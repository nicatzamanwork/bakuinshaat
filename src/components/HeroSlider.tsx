import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// API-dən gələn məlumat strukturuna uyğun interface
interface SliderItem {
  id: number;
  fileName: string;
  type: string;
  url: string; // Şəkil URL-i
  publicId: string;
  createdAt: string;
  updatedAt: string;
}

// Slayderin istifadə edəcəyi məlumat strukturu
interface Slide {
  id: number;
  image: string; // API-dən gələn url
  title: string;
  subtitle: string;
}

// Slayder başlığı üçün statik məlumatlar (API yalnız URL verir)
// Bu məlumatlar hər slayda uyğun olaraq index vasitəsilə təyin edilir
const staticContent = [
  {
    title: "Müasir İstehsal Kompleksi",
    subtitle:
      "Avropa texnologiyaları ilə yüksək keyfiyyətli metal məhsulların istehsalı",
  },
  {
    title: "Fasiləsiz Tökükxana Texnologiyası",
    subtitle: "Yüksək məhsuldarlıq və dəqiqlik",
  },
  {
    title: "Peşəkar Komanda",
    subtitle: "500+ ixtisaslı mütəxəssis və mühəndis",
  },
  {
    title: "Təhlükəsizlik və Keyfiyyət",
    subtitle: "Beynəlxalq standartlara tam uyğunluq",
  },
  {
    title: "Yenilikçi Həllər", // 5-ci slayddan sonra əlavə edilir
    subtitle: "Sənayenin gələcəyini formalaşdırırıq",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  // API-dən çəkilmiş və formatlanmış slayd məlumatları
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API məlumatlarını çəkmək üçün useEffect hook-u
  useEffect(() => {
    const API_URL =
      "https://baki-insaat-senaye.onrender.com/slider?type=SLIDER";

    const fetchSlides = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: SliderItem[] = await response.json();

        // API-dən gələn URL-ləri statik başlıq/altbaşlıq məlumatları ilə birləşdiririk
        const formattedSlides: Slide[] = data.map((item, index) => ({
          id: item.id,
          image: item.url,
          // Məlumatı statik massivdən index-ə görə götürürük
          title:
            staticContent[index % staticContent.length]?.title ||
            "Başlıq yoxdur",
          subtitle:
            staticContent[index % staticContent.length]?.subtitle ||
            "Altbaşlıq yoxdur",
        }));

        setSlides(formattedSlides);
      } catch (e) {
        console.error("Failed to fetch slides:", e);
        setError("Slaydlar yüklənərkən xəta baş verdi.");
        // Əgər API məlumatları çəkilməzsə, boş slayd göstərməmək üçün `setSlides([])` istifadə oluna bilər
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();

    // Avtomatik keçid funksiyası (yalnız məlumatlar uğurla çəkildikdən sonra işə düşsün)
    const timer = setInterval(() => {
      if (slides.length > 0) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]); // slides.length dəyişdikdə timer yenilənsin

  // Əgər məlumat yüklənirsə, yüklənmə göstəricisi göstərilir
  if (loading) {
    return (
      <div className="w-full h-[600px] lg:h-[700px] bg-gray-900 flex items-center justify-center text-white">
        Yüklənir...
      </div>
    );
  }

  // Əgər xəta varsa və ya slayd yoxdursa, xəta mesajı göstərilir
  if (error || slides.length === 0) {
    return (
      <div className="w-full h-[600px] lg:h-[700px] bg-gray-900 flex items-center justify-center text-white">
        {error || "Slayd məlumatı tapılmadı."}
      </div>
    );
  }

  // Naviqasiya funksiyaları
  const goToSlide = (index: number) => setCurrentSlide(index);
  const goToPrevious = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative w-full h-[600px] lg:h-[700px] bg-gray-900 overflow-hidden">
      {slides.map(
        (
          slide,
          index // DİNAMİK SLAYDLARDAN İSTİFADƏ
        ) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <ImageWithFallback
              src={slide.image} // API-dən gələn URL
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
        )
      )}

      {/* Naviqasiya düymələri və nöqtələri eyni qalır */}
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
        {slides.map(
          (
            _,
            index // DİNAMİK MƏLUMATA GÖRƏ NÖQTƏLƏR
          ) => (
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
          )
        )}
      </div>
    </div>
  );
}
