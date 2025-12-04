import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Download, FileText, Loader2, AlertTriangle } from "lucide-react"; // Yeni ikonlar
import { InquiryModal } from "./InquiryModal";
import React from "react";

// API-dən gələn məlumat strukturuna uyğun tip
interface ProductApiData {
  id: number;
  name: string;
  category: string;
  description: string;
  standards?: string; // API-də bəzən string, bəzən yox
  diameter?: string;
  length?: string;
  yield?: string;
  tensile?: string;
  class?: string;
  productType: string;
  type?: string;
  thickness?: string;
  material?: string;
  grade?: string;
  width?: string;
  size?: string;
  surface?: string;
  imageUrl?: string;
  attachments: {
    id: number;
    fileName: string;
    productName: string;
    type: string;
    standard: string;
    url: string;
    uploadDate: string;
    productId: number;
  }[];
}

// Komponent daxilində istifadə olunacaq təmizlənmiş (transformed) tip
interface Product {
  id: number;
  category: string;
  name: string;
  imageUrl: string;
  description: string;
  standards: string[];
  specifications: Record<string, string>;
  certificates: { name: string; url: string }[];
}

// API endpoint
const PRODUCTS_API_URL = "https://baki-insaat-senaye.onrender.com/products";

export function Products() {
  // Yeni state-lər
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  // 1. Məlumatı API-dən gətirmək üçün `useEffect`
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(PRODUCTS_API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const apiData: ProductApiData[] = await response.json();

        // 2. API məlumatını komponentin istifadə etdiyi formata uyğunlaşdırmaq (Transformasiya)
        const transformedData: Product[] = apiData.map((product) => {
          // Spesifikasiyaların təmizlənməsi və formatlanması
          const specs: Record<string, string> = {};
          if (product.class) specs["class"] = product.class;
          if (product.type) specs["type"] = product.type;
          if (product.diameter) specs["diametr"] = product.diameter;
          if (product.thickness) specs["qalınlıq"] = product.thickness;
          if (product.length) specs["uzunluq"] = product.length;
          if (product.yield) specs["axma həddi"] = product.yield;
          if (product.tensile) specs["dartılma həddi"] = product.tensile;
          if (product.material) specs["material"] = product.material;
          if (product.grade) specs["marka"] = product.grade;
          if (product.width) specs["eni"] = product.width;
          if (product.size) specs["ölçü"] = product.size;
          if (product.surface) specs["səth"] = product.surface;

          // Standartlar bəzən string, bəzən yoxdur, onu massivə çevirək
          const standardsArray = product.standards
            ? product.standards.split(",").map((s) => s.trim())
            : [];

          // Attachmentsları Sertifikat formatına çevirək
          const certificatesArray = product.attachments.map((att) => ({
            name: att.fileName,
            url: att.url,
          }));

          // API-də category "Polad" və "Borular" üçün bəzi məlumatlar qarışıqdır,
          // təmizlənmə lazım ola bilər. Burada API-dən gələn category saxlanılır.

          return {
            id: product.id,
            category: product.category,
            name: product.name,
            description: product.description,
            standards: standardsArray,
            specifications: specs,
            certificates: certificatesArray,
            imageUrl: product.imageUrl,
          };
        });

        setProductsData(transformedData);
      } catch (e) {
        console.error("Məlumat gətirilərkən səhv:", e);
        setError("Məhsul məlumatlarını yükləmək mümkün olmadı.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Komponent mount edildikdə bir dəfə işə düşür

  // Qalan hissələr eyni qalır, lakin artıq `productsData` API-dən gələn məlumatdır.

  const categories = [
    "all",
    ...Array.from(new Set(productsData.map((p) => p.category))),
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

  const DOWNLOAD_API_BASE_URL =
    "https://baki-insaat-senaye.onrender.com/files/download";

  // Yükləmə funksiyasını yeniləyirik:
  const handleDownload = (url: string) => {
    // 1. Sertifikatın Cloudinary URL-ni URL-kodlaşdırma
    const encodedUrl = encodeURIComponent(url);

    // 2. Yükləmə API-sinin tam URL-ni yaratmaq
    const downloadUrl = `${DOWNLOAD_API_BASE_URL}?url=${encodedUrl}`;

    // --- DƏYİŞİKLİK BURADADIR: Yeni tab açmaq əvəzinə gizli link istifadə edirik ---

    // 3. Gizli <a> elementi yaratmaq
    const link = document.createElement("a");

    // 4. Linkin href xüsusiyyətini API yükləmə URL-inə təyin etmək
    link.href = downloadUrl;

    // Fayl adı kimi sadə bir ad qoyuruq.
    // Brauzer fayl adını API-dən gələn Content-Disposition header-i əsasında müəyyənləşdirməlidir.
    link.download = "file_download";

    // 5. Linkə proqramlı şəkildə klikləmək (Bu, yükləməni başladır)
    document.body.appendChild(link);
    link.click();

    // 6. Təmizləmə: Linki DOM-dan silmək
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="text-sm tracking-[0.2em] text-blue-200 mb-4">
              MƏHSULLAR
            </div>
            <h1 className="mb-6">Texniki Məhsul Kataloqu</h1>
            <p className="text-blue-100 text-lg">
              Beynəlxalq standartlara uyğun sertifikatlaşdırılmış məhsullar.
              GOST, DSTU, AZS və EN normativləri.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
        {/* Yüklənmə Vəziyyəti */}
        {loading && (
          <div className="text-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-3" />
            <p className="text-gray-600">Məhsullar yüklənir...</p>
          </div>
        )}
        {/* Səhv Vəziyyəti */}
        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
            role="alert"
          >
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-3" />
              <p className="font-bold">Xəta baş verdi</p>
            </div>
            <p className="ml-8">{error}</p>
          </div>
        )}
        {/* Məhsullar Vəziyyəti */}
        {!loading && !error && productsData.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600">Heç bir məhsul tapılmadı.</p>
          </div>
        )}
        {/* Məhsul Filtrləri (Əgər ehtiyac olsa, bu hissəni yuxarıya əlavə edin) */}
        {/* Məhsul siyahısı */}
        {!loading && !error && productsData.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                // DƏYİŞİKLİK: Hündürlüyü təmin etmək üçün h-full və flex flex-col
                className="bg-white border border-gray-200 p-8 h-full flex flex-col"
              >
                {product.imageUrl && (
                  <div className="mb-4 w-full h-48 overflow-hidden rounded-lg border border-gray-100">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                )}
                <p className="text-gray-600 mb-6">{product.description}</p>

                {/* --- MƏZMUNUN ƏSAS HİSSƏSİ (BU HİSSƏ BÜTÜN BOŞLUĞU TUTMALIDIR) --- */}
                <div className="flex-grow">
                  {/* Standards */}
                  {product.standards.length > 0 && (
                    <div className="mb-6">
                      <div className="text-sm text-gray-500 mb-2">
                        Standartlar:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {product.standards.map((standard, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {standard}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Specifications Table */}
                  {Object.keys(product.specifications).length > 0 && (
                    <div className="mb-6 border border-gray-200">
                      <table className="w-full text-sm">
                        <tbody>
                          {Object.entries(product.specifications).map(
                            ([key, value]) => (
                              <tr
                                key={key}
                                className="border-b border-gray-200 last:border-0"
                              >
                                <td className="py-2 px-4 bg-gray-50 text-gray-600 capitalize w-1/3">
                                  {key}
                                </td>
                                <td className="py-2 px-4 text-gray-900">
                                  {value}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Certificates */}
                  {product.certificates.length > 0 && (
                    <div className="mb-6">
                      <div className="text-sm text-gray-500 mb-3">
                        Sertifikatlar və Sınaq Nəticələri:
                      </div>
                      <div className="space-y-2">
                        {product.certificates.map((cert, idx) => (
                          <button
                            key={idx}
                            // Hələ də `cert.url` göndərilir, lakin `handleDownload` fərqli işləyir
                            onClick={() => handleDownload(cert.url)}
                            className="flex items-center gap-2 text-sm text-blue-900 hover:text-blue-700 w-full text-left"
                          >
                            <FileText size={16} className="flex-shrink-0" />
                            <span className="truncate">{cert.name}</span>
                            <Download
                              size={14}
                              className="ml-auto flex-shrink-0"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {/* --- MƏZMUNUN ƏSAS HİSSƏSİNİN SONU --- */}

                {/* CTA */}
                <Button
                  onClick={() => {
                    setSelectedProduct(product);
                    setInquiryModalOpen(true);
                  }}
                  // CTA düyməsi flex-grow sayəsində avtomatik olaraq ən dibə düşür
                  className="w-full bg-blue-900 hover:bg-blue-800"
                >
                  Sorğu göndər
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      <InquiryModal
        open={inquiryModalOpen}
        onClose={() => {
          setInquiryModalOpen(false);
          setSelectedProduct(null);
        }}
        productName={selectedProduct?.name}
      />
    </div>
  );
}
