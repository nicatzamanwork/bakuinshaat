import { Page } from "../App";
import { HeroSlider } from "./HeroSlider";
import { StatisticsSection } from "./StatisticsSection";
import { CategoryCards } from "./CategoryCards";
import { Button } from "./ui/button";
import { useEffect } from "react";
import pdf1 from "../pdfs/pdf1.jpeg";
import pdf2 from "../pdfs/pdf2.jpeg";
import pdf3 from "../pdfs/pdf3.jpeg";
import pdf4 from "../pdfs/pdf4.jpeg";
import pdf5 from "../pdfs/pdf5.jpeg";
import pdf6 from "../pdfs/pdf6.png";

import {
  MessageSquare,
  Award,
  Shield,
  Users,
  TrendingUp,
  CheckCircle2,
  Star,
  X,
} from "lucide-react";
import { InquiryModal } from "./InquiryModal";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import React from "react";

interface HomeProps {
  onNavigate: (page: Page) => void;
}
type Certificate = {
  name: string;
  desc: string;
  url: string; // PDF və ya image linki
};

export function Home({ onNavigate }: HomeProps) {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const emailAddress = "info@metalsteel.az";
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2500); // 2.5 seconds

      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopyEmail = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(emailAddress)
        .then(() => {
          setCopied(true); // Set state to show the success message
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
          fallbackCopyTextToClipboard(emailAddress); // Clipboard API uğursuz olduqda
        });
    } else {
      // Fallback implementation if needed
      console.warn("Clipboard API not available.");
      fallbackCopyTextToClipboard(emailAddress); // Clipboard API mövcud olmadıqda
    }
  };

  // Funksiya tərifini arqument qəbul edəcək şəkildə dəyişin
  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    // ... (Gizlətmə stilləri) ...
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      // ... (Console log) ...
      if (successful) {
        setCopied(true); // Fallback uğurlu olduqda 'Copied' mesajını göstər
      }
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
  };

  return (
    <div>
      <HeroSlider />

      {/* Intro Section */}
      <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
            PRECISION ENGINEERING
          </div>
          <h1 className="text-gray-900 mb-6">
            Yüksək Keyfiyyətli Metal Məhsullarının İstehsalı
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Müasir texnologiyalar və beynəlxalq standartlar əsasında armaturu,
            boru və polad məhsulların istehsalı. Avropa dəqiqliyi ilə industrial
            həllər.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={() => setInquiryModalOpen(true)}
              size="lg"
              className="bg-blue-900 hover:bg-blue-800 h-12 px-8"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Sorğu göndər
            </Button>
            <Button
              onClick={() => onNavigate("products")}
              variant="outline"
              size="lg"
              className="h-12 px-8 border-gray-300"
            >
              Məhsullar
            </Button>
          </div>
        </div>
      </section>

      <StatisticsSection />

      {/* Why Choose Us */}
      <section className="bg-white py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
              ÜSTÜNLÜKLƏRIMIZ
            </div>
            <h2 className="text-gray-900 mb-4">Niyə Bizi Seçməlisiniz?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              18 illik təcrübə, beynəlxalq sertifikatlar və müştəri məmnuniyyəti
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-900 mx-auto mb-6 flex items-center justify-center">
                <Award className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-gray-900 mb-3">Premium Keyfiyyət</h3>
              <p className="text-gray-600 text-sm">
                ISO 9001:2015, CE Marking və digər beynəlxalq sertifikatlar. Hər
                partiya laboratoriya sınaqlarından keçir.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-900 mx-auto mb-6 flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-gray-900 mb-3">Etibarlılıq</h3>
              <p className="text-gray-600 text-sm">
                18 illik təcrübə və 1000+ layihə. Vaxtında çatdırılma və tam
                texniki dəstək zəmanəti.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-900 mx-auto mb-6 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-gray-900 mb-3">Peşəkar Komanda</h3>
              <p className="text-gray-600 text-sm">
                500+ işçi, 80+ mühəndis və texniki mütəxəssis. Fərdi yanaşma və
                konsultasiya xidməti.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-900 mx-auto mb-6 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-gray-900 mb-3">Rəqabətli Qiymətlər</h3>
              <p className="text-gray-600 text-sm">
                İstehsalçıdan birbaşa satış. Topdan sifarişlərə xüsusi
                endirimlər və çevik ödəniş şərtləri.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CategoryCards onNavigate={onNavigate} />

      {/* Certifications */}
      <section className="bg-gray-50 py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
              SERTİFİKATLAR
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Beynəlxalq Standartlara Uyğunluq
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Məhsullarımız dünya səviyyəli keyfiyyət standartlarına cavab verir
            </p>
          </div>

          {/* GRID — 3-3 düzülüşü üçün max-w-5xl və lg:grid-cols-3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "ISO 9001:2015",
                desc: "Keyfiyyət İdarəetmə Sistemi",
                url: pdf1,
              },
              { name: "ISO 14001:2015", desc: "Ekoloji İdarəetmə", url: pdf2 },
              { name: "OHSAS 18001", desc: "Əmək Təhlükəsizliyi", url: pdf3 },
              { name: "CE Marking", desc: "Avropa Uyğunluğu", url: pdf4 },
              { name: "CE Marking", desc: "Avropa Uyğunluğu", url: pdf5 },
              { name: "CE Marking", desc: "Avropa Uyğunluğu", url: pdf6 },
            ].map((cert, idx) => (
              <div
                key={idx}
                type="button"
                onClick={() => setActiveCert(cert)}
                className="bg-white border-2 border-gray-200 p-8 text-center 
                     hover:border-blue-900 transition-all duration-300 
                     cursor-pointer flex flex-col items-center justify-center
                     aspect-[4/3] shadow-sm hover:shadow-md"
              >
                <Award
                  className="w-12 h-12 text-blue-900 mx-auto mb-4"
                  strokeWidth={1.5}
                />
                <div className="text-gray-900 font-bold mb-2">{cert.name}</div>
                <div className="text-sm text-gray-600">{cert.desc}</div>
              </div>
            ))}
          </div>

          {/* Modal hissəsi eyni qalır */}
          {activeCert && (
            <div
              className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300"
              onClick={() => setActiveCert(null)}
            >
              <div
                className="relative bg-black/95 rounded-xl shadow-2xl overflow-hidden w-[90vw] max-w-sm sm:max-w-lg lg:w-[70vw] lg:max-w-6xl lg:h-auto max-h-[95vh] h-[70vh] sm:h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setActiveCert(null)}
                  className="absolute top-3 right-3 z-20 rounded-full bg-black/60 text-white p-2 hover:bg-black transition"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="w-full h-full flex items-center justify-center bg-black p-3 sm:p-4 lg:p-6">
                  <img
                    src={activeCert.url}
                    alt={activeCert.name}
                    className="object-contain w-full h-full rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Bütün məhsullara test sertifikatları və uyğunluq bəyannamələri
              əlavə olunur
            </p>
            <Button
              onClick={() => onNavigate("products")}
              variant="outline"
              className="border-gray-300"
            >
              Sertifikatları görün
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="text-center mb-16">
          <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
            MÜŞTƏRİ RƏYLƏRİ
          </div>
          <h2 className="text-gray-900">Partnyorlarımız Haqqımızda</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              company: "Azərbaycan Dəmir Yolları",
              person: "İnşaat Departamenti",
              text: "Artıq 5 ildir ki, Metal Steel-dən armatur alırıq. Keyfiyyət daim yüksək səviyyədədir, çatdırılma vaxtında həyata keçirilir. Böyük həcmli sifarişlərdə də heç bir problem olmur.",
              rating: 5,
            },
            {
              company: "Gilan İnşaat MMC",
              person: "Təchizat Meneceri",
              text: "Tikinti layihələrimiz üçün mütəmadi olaraq müraciət edirik. Rəqabətli qiymətlər, geniş çeşid və peşəkar texniki dəstək. Tövsiyə edirəm!",
              rating: 5,
            },
            {
              company: "AzərSu ASC",
              person: "Baş Mühəndis",
              text: "Su və kanalizasiya şəbəkələri üçün yüksək keyfiyyətli borular alırıq. Bütün standartlara uyğunluq, sertifikatların əlavə olunması bizim üçün çox önəmlidir.",
              rating: 5,
            },
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-white border border-gray-200 p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
              <div className="border-t border-gray-200 pt-4">
                <div className="text-gray-900">{testimonial.company}</div>
                <div className="text-sm text-gray-500">
                  {testimonial.person}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="bg-gray-50 py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
              PARTNYORLAR
            </div>
            <h2 className="text-gray-900 mb-4">Bizimlə Əməkdaşlıq Edənlər</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Azərbaycanın və regionun aparıcı şirkətləri ilə uğurlu əməkdaşlıq
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              "Azərbaycan Dəmir Yolları",
              "SOCAR",
              "Gilan Holding",
              "AzərSu",
              "Akkord İnşaat",
              "PaşaBank",
              "AzerGold",
              "Baku Steel Company",
            ].map((partner, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 p-6 flex items-center justify-center h-24"
              >
                <div className="text-gray-600 text-center text-sm">
                  {partner}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="text-center mb-16">
          <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
            TƏTBİQ SAHƏLƏRİ
          </div>
          <h2 className="text-gray-900">Məhsullarımızın İstifadə Sahələri</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Tikinti və İnşaat",
              items: [
                "Yaşayış binaları",
                "Ticarət mərkəzləri",
                "Sənaye obyektləri",
                "Körpülər və yollar",
              ],
            },
            {
              title: "İnfrastruktur",
              items: [
                "Su və kanalizasiya",
                "Qaz xətləri",
                "İstilik şəbəkələri",
                "Elektrik stansiyaları",
              ],
            },
            {
              title: "Sənaye",
              items: [
                "Zavod və fabriklər",
                "Anbar kompleksləri",
                "Texnoloji qurğular",
                "Neft-qaz sektoru",
              ],
            },
          ].map((application, idx) => (
            <div key={idx} className="bg-gray-50 p-8 border border-gray-200">
              <h3 className="text-gray-900 mb-4">{application.title}</h3>
              <ul className="space-y-2">
                {application.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-sm tracking-[0.2em] text-blue-200 mb-4">
              B2B ƏMƏKDAŞLIQ
            </div>
            <h2 className="mb-6">
              Beynəlxalq Standartlar və Etibarlı Çatdırılma
            </h2>
            <p className="text-blue-100 mb-8">
              GOST, DSTU, AZS standartlarına uyğun məhsullar. Topdan satış və
              ixrac üçün bizə müraciət edin.
            </p>

            {/* Button və Bildiriş üçün konteyner */}
            <div className="relative inline-block">
              <Button
                onClick={handleCopyEmail}
                size="lg"
                variant="outline"
                className="h-12 px-8 border-white text-white hover:bg-white hover:text-blue-900"
              >
                Sorğu göndər
              </Button>

              {/* 👇 Kopyalama Bildirişi 👇 */}
              {copied && (
                <div
                  className="absolute top-full mt-3 left-1/2 -translate-x-1/2 
                       bg-white text-blue-900 text-sm font-semibold py-2 px-4 rounded-lg shadow-xl 
                       animate-fade-in-down whitespace-nowrap"
                  role="alert"
                >
                  Mail address Kopyalandı!
                </div>
              )}
            </div>
            {/* 👆 Kopyalama Bildirişi 👆 */}
          </div>
        </div>
      </section>

      <InquiryModal
        open={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </div>
  );
}
