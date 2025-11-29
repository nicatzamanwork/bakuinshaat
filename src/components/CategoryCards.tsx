import { Page } from '../App';
import { Construction, Circle, Box, Grid2x2 } from 'lucide-react';

interface CategoryCardsProps {
  onNavigate: (page: Page) => void;
}

const categories = [
  {
    id: 1,
    icon: Construction,
    title: 'Armatur',
    description: 'A240, A400, A500 siniflərində diametr 6-32mm',
    specs: ['GOST 5781-82', 'DSTU 3760', 'AZS 012-2019'],
  },
  {
    id: 2,
    icon: Circle,
    title: 'Borular',
    description: 'Elektrik qaynaq və seamless borular',
    specs: ['GOST 10704', 'GOST 8732', 'DN 15-630mm'],
  },
  {
    id: 3,
    icon: Box,
    title: 'Polad Məhsullar',
    description: 'Lövhələr, profillar, balka və yaylar',
    specs: ['S235-S355', 'GOST 27772', '2-40mm qalınlıq'],
  },
  {
    id: 4,
    icon: Grid2x2,
    title: 'Xüsusi Sifarişlər',
    description: 'Fərdi texniki tələblərə uyğun istehsal',
    specs: ['Custom specs', 'B2B həllər', 'Texniki dəstək'],
  },
];

export function CategoryCards({ onNavigate }: CategoryCardsProps) {
  return (
    <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
      <div className="text-center mb-16">
        <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
          MƏHSUL KATEQORİYALARI
        </div>
        <h2 className="text-gray-900">
          Geniş Məhsul Çeşidi
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => onNavigate('products')}
            className="bg-white border border-gray-200 hover:border-blue-900 transition-all cursor-pointer group p-8"
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-50 flex items-center justify-center group-hover:bg-blue-900 transition-colors">
                <category.icon className="w-8 h-8 text-blue-900 group-hover:text-white transition-colors" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-gray-900 mb-3">
              {category.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {category.description}
            </p>
            <div className="space-y-2">
              {category.specs.map((spec, index) => (
                <div key={index} className="text-xs text-gray-500 tracking-wide">
                  {spec}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}