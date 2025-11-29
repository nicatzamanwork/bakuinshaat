import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Download, FileText } from 'lucide-react';
import { InquiryModal } from './InquiryModal';

// This would be fetched from backend in production
const productsData = [
  {
    id: 1,
    category: 'Armatur',
    name: 'İnşaat Armaturu A400',
    description: 'Yüksək möhkəmlikli, qaynaqlanan armatur, tikinti işləri üçün',
    standards: ['GOST 5781-82', 'DSTU 3760:2006', 'AZS 012-2019'],
    specifications: {
      class: 'A400 (A-III)',
      diameter: '6, 8, 10, 12, 14, 16, 18, 20, 22, 25, 28, 32mm',
      length: '6m, 11.7m (standart)',
      yield: '400 MPa (min)',
      tensile: '590 MPa (min)',
    },
    certificates: ['ISO-9001.pdf', 'GOST-Certificate.pdf', 'Test-Report.pdf'],
  },
  {
    id: 2,
    category: 'Armatur',
    name: 'İnşaat Armaturu A500',
    description: 'Yüksək keyfiyyətli, aşağı karbonlu polad armatur',
    standards: ['GOST 5781-82', 'DSTU 3760:2006', 'AZS 012-2019'],
    specifications: {
      class: 'A500 (A500C)',
      diameter: '8, 10, 12, 14, 16, 18, 20, 22, 25, 28, 32mm',
      length: '6m, 11.7m (standart)',
      yield: '500 MPa (min)',
      tensile: '600 MPa (min)',
    },
    certificates: ['ISO-9001.pdf', 'GOST-Certificate.pdf', 'Test-Report.pdf'],
  },
  {
    id: 3,
    category: 'Borular',
    name: 'Elektrik Qaynaq Borusu',
    description: 'Su, qaz və struktur konstruksiyalar üçün polad borular',
    standards: ['GOST 10704-91', 'EN 10255', 'AZS 024-2018'],
    specifications: {
      type: 'ERW (Electric Resistance Welded)',
      diameter: 'DN 15-630mm (21.3-630mm xarici)',
      thickness: '1.5-12mm',
      length: '6m, 12m (standart)',
      material: 'St3sp, 09G2S, St20',
    },
    certificates: ['ISO-9001.pdf', 'EN-Certificate.pdf', 'Pressure-Test.pdf'],
  },
  {
    id: 4,
    category: 'Borular',
    name: 'Seamless Polad Boru',
    description: 'Qaynaqsız soyuq haddelenmiş və isti haddelenmiş borular',
    standards: ['GOST 8732-78', 'GOST 8734-75', 'EN 10216'],
    specifications: {
      type: 'Seamless (Hot/Cold Rolled)',
      diameter: 'DN 8-426mm (10-426mm xarici)',
      thickness: '1-40mm',
      length: '4-12m',
      material: 'St20, 20X, 09G2S, 12X18H10T',
    },
    certificates: ['ISO-9001.pdf', 'GOST-Certificate.pdf', 'Material-Test.pdf'],
  },
  {
    id: 5,
    category: 'Polad',
    name: 'Polad Lövhələr',
    description: 'Isti və soyuq haddelenmiş polad lövhələr',
    standards: ['GOST 19903-74', 'GOST 16523-97', 'EN 10025'],
    specifications: {
      type: 'Hot/Cold Rolled Sheet',
      thickness: '2-40mm',
      width: '1000-2500mm',
      length: '2000-12000mm',
      grade: 'S235, S275, S355',
    },
    certificates: ['ISO-9001.pdf', 'EN-Certificate.pdf', 'Impact-Test.pdf'],
  },
  {
    id: 6,
    category: 'Polad',
    name: 'Polad Profillar və Balka',
    description: 'I-şəkilli tir, kanallar, bucaq profillar',
    standards: ['GOST 8239-89', 'GOST 8240-97', 'EN 10025'],
    specifications: {
      type: 'I-Beam, Channel, Angle',
      sizes: 'I10-I40, U5-U40, L20x20-L200x200',
      length: '6-12m',
      material: 'S235JR, S275JR, S355JR',
      surface: 'Hot Rolled, Primer',
    },
    certificates: ['ISO-9001.pdf', 'EN-Certificate.pdf', 'Dimension-Report.pdf'],
  },
];

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<typeof productsData[0] | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  const categories = ['all', ...Array.from(new Set(productsData.map(p => p.category)))];
  
  const filteredProducts = selectedCategory === 'all' 
    ? productsData 
    : productsData.filter(p => p.category === selectedCategory);

  const handleDownload = (cert: string) => {
    // Mock download
    alert(`Yüklənir: ${cert}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="text-sm tracking-[0.2em] text-blue-200 mb-4">
              MƏHSULLAR
            </div>
            <h1 className="mb-6">
              Texniki Məhsul Kataloqu
            </h1>
            <p className="text-blue-100 text-lg">
              Beynəlxalq standartlara uyğun sertifikatlaşdırılmış məhsullar. 
              GOST, DSTU, AZS və EN normativləri.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={selectedCategory === category ? 'bg-blue-900 hover:bg-blue-800' : ''}
              >
                {category === 'all' ? 'Bütün Məhsullar' : category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="mb-3">{product.category}</Badge>
                  <h3 className="text-gray-900 mb-2">{product.name}</h3>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Standards */}
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-2">Standartlar:</div>
                <div className="flex flex-wrap gap-2">
                  {product.standards.map((standard, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {standard}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Specifications Table */}
              <div className="mb-6 border border-gray-200">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} className="border-b border-gray-200 last:border-0">
                        <td className="py-2 px-4 bg-gray-50 text-gray-600 capitalize w-1/3">
                          {key}
                        </td>
                        <td className="py-2 px-4 text-gray-900">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Certificates */}
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-3">Sertifikatlar və Sınaq Nəticələri:</div>
                <div className="space-y-2">
                  {product.certificates.map((cert, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDownload(cert)}
                      className="flex items-center gap-2 text-sm text-blue-900 hover:text-blue-700"
                    >
                      <FileText size={16} />
                      <span>{cert}</span>
                      <Download size={14} className="ml-auto" />
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Button
                onClick={() => {
                  setSelectedProduct(product);
                  setInquiryModalOpen(true);
                }}
                className="w-full bg-blue-900 hover:bg-blue-800"
              >
                Sorğu göndər
              </Button>
            </div>
          ))}
        </div>
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
