import { Cog, Workflow, Shield, CheckCircle2, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

const equipment = [
  {
    id: 1,
    name: 'Prokat Dəzgahı (Rolling Mill)',
    description: 'Avtomatlaşdırılmış valslama kompleksi',
    specs: [
      'Gücə: 18-32mm armatur',
      'Məhsuldarlıq: 25 ton/saat',
      'İstehsalçı: Danieli (İtaliya)',
      'İl: 2018',
    ],
  },
  {
    id: 2,
    name: 'Fasiləsiz Tökükxana (Continuous Casting)',
    description: 'CCM texnologiyası ilə billet istehsalı',
    specs: [
      '4 kanallı sistem',
      'Billet: 150x150mm',
      'Məhsuldarlıq: 350 ton/gün',
      'İstehsalçı: SMS Group (Almaniya)',
    ],
  },
  {
    id: 3,
    name: 'Elektrik Qaynaq Xətti',
    description: 'Yüksək tezlikli boru qaynaq avadanlığı',
    specs: [
      'ERW texnologiyası',
      'Diametr: DN 20-400mm',
      'Məhsuldarlıq: 15 ton/saat',
      'İstehsalçı: Thermatool (ABŞ)',
    ],
  },
  {
    id: 4,
    name: 'Keyfiyyət Nəzarət Laboratoriyası',
    description: 'Tam avadanlıqla təchiz olunmuş sınaq laboratoriyası',
    specs: [
      'Mexaniki sınaqlar',
      'Kimyəvi analiz',
      'Ultrasəs defektoskopiya',
      'Akkreditasiya: ISO 17025',
    ],
  },
];

const processSteps = [
  {
    id: 1,
    title: 'Xammal Qəbulu',
    description: 'Yüksək keyfiyyətli polad hurda və dəmirin seçilməsi və yoxlanması',
  },
  {
    id: 2,
    title: 'Ərimə Prosesi',
    description: 'Elektrik qövs sobalarında 1600°C temperaturda əridilmə',
  },
  {
    id: 3,
    title: 'Fasiləsiz Tökük',
    description: 'CCM maşınında mayenin billet formasına salınması',
  },
  {
    id: 4,
    title: 'Qızdırma və Valslama',
    description: 'Billetlərin 1200°C-ə qədər qızdırılması və prokat dəzgahında haddelənməsi',
  },
  {
    id: 5,
    title: 'Soyutma və Kəsmə',
    description: 'Məhsulların hava ilə soyudulması və avtomatik ölçüləndirmə',
  },
  {
    id: 6,
    title: 'Keyfiyyət Nəzarəti',
    description: 'Hər partiyadan nümunələrin laboratoriyada sınaqdan keçirilməsi',
  },
  {
    id: 7,
    title: 'Markalanma və Paketləmə',
    description: 'Standartlara uyğun markalanma və çəki/uzunluq qruplaşdırması',
  },
  {
    id: 8,
    title: 'Anbar və Göndərmə',
    description: 'Təhlükəsiz saxlama və müştəriyə çatdırılma',
  },
];

export function Production() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="text-sm tracking-[0.2em] text-blue-200 mb-4">
              İSTEHSAL PROSESİ
            </div>
            <h1 className="mb-6">
              Müasir Texnologiyalar və Dəqiqlik
            </h1>
            <p className="text-blue-100 text-lg">
              Avropa standartlarına uyğun avtomatlaşdırılmış istehsal xətləri 
              və keyfiyyət nəzarət sistemləri.
            </p>
          </div>
        </div>
      </section>

      {/* Video/Photo Section */}
      <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
              İSTEHSAL GÖRÜNTÜLƏRI
            </div>
            <h2 className="text-gray-900 mb-6">
              Zavodumuzun Virtual Turu
            </h2>
            <p className="text-gray-600 mb-6">
              Müasir avadanlıqlarımız və istehsal proseslərimizi videoda izləyin. 
              Hər mərhələdə keyfiyyət nəzarəti və təhlükəsizlik tədbirləri 
              tətbiq olunur.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-900" />
                <span className="text-gray-600">Avtomatlaşdırılmış istehsal xətləri</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-900" />
                <span className="text-gray-600">24/7 keyfiyyət monitorinqi</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-900" />
                <span className="text-gray-600">Ekoloji təmiz texnologiyalar</span>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] bg-gray-900 flex items-center justify-center">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1747999060057-89b7a533f347?w=800"
              alt="Production Line"
              className="w-full h-full object-cover"
            />
            {!videoPlaying && (
              <button
                onClick={() => setVideoPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-blue-900/50 hover:bg-blue-900/60 transition-colors group"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-blue-900 ml-1" fill="currentColor" />
                </div>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="bg-gray-50 py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
              AVADANLIQLAR
            </div>
            <h2 className="text-gray-900">
              Texniki Baza
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {equipment.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Cog className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {item.specs.map((spec, idx) => (
                      <div key={idx} className="text-gray-600">• {spec}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="text-center mb-16">
          <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
            İŞ PROSESI
          </div>
          <h2 className="text-gray-900">
            8 Mərhələli İstehsal Dövrü
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {processSteps.map((step, index) => (
            <div key={step.id} className="flex gap-6 mb-8 last:mb-0">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center">
                  {step.id}
                </div>
                {index < processSteps.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-200 mt-2" />
                )}
              </div>
              <div className="pb-8">
                <h3 className="text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quality Control */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Shield className="w-16 h-16 text-blue-400" strokeWidth={1.5} />
              <div>
                <h2 className="mb-2">Keyfiyyət Təminatı</h2>
                <p className="text-gray-300">
                  İstehsal prosesinin hər mərhələsində ciddi nəzarət
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm p-6 border border-white/10">
                <h3 className="mb-3">Laboratoriya Sınaqları</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Dartılma və axma həddi</li>
                  <li>• Uzanma və bükülmə sınağı</li>
                  <li>• Kimyəvi tərkib analizi</li>
                  <li>• Mikrostruktur yoxlanışı</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 border border-white/10">
                <h3 className="mb-3">Sertifikasiya</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• ISO 9001:2015 - Keyfiyyət İdarəetməsi</li>
                  <li>• ISO 14001:2015 - Ekoloji İdarəetmə</li>
                  <li>• OHSAS 18001 - Əmək Təhlükəsizliyi</li>
                  <li>• CE Marking - Avropa Uyğunluğu</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="text-center mb-16">
          <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
            FOTO QALEREİYA
          </div>
          <h2 className="text-gray-900">
            İstehsal Anları
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            'https://images.unsplash.com/photo-1734864220078-c7354732aa7d?w=500',
            'https://images.unsplash.com/photo-1747999060057-89b7a533f347?w=500',
            'https://images.unsplash.com/photo-1758873263528-6dbd0422cf84?w=500',
            'https://images.unsplash.com/photo-1758798349125-5c297b18b8b2?w=500',
            'https://images.unsplash.com/photo-1734864220078-c7354732aa7d?w=500',
            'https://images.unsplash.com/photo-1747999060057-89b7a533f347?w=500',
          ].map((img, idx) => (
            <div key={idx} className="relative h-64 bg-gray-100 overflow-hidden group">
              <ImageWithFallback
                src={img}
                alt={`Production ${idx + 1}`}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
