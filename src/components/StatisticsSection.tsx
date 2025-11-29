import { Factory, TrendingUp, Users, Grid3x3 } from 'lucide-react';

const statistics = [
  {
    id: 1,
    icon: Factory,
    value: '250,000',
    unit: 'ton/il',
    label: 'İllik İstehsal Gücü',
  },
  {
    id: 2,
    icon: TrendingUp,
    value: '40%',
    unit: 'ixrac',
    label: 'İxrac Həcmi',
  },
  {
    id: 3,
    icon: Users,
    value: '500+',
    unit: 'işçi',
    label: 'Peşəkar Komanda',
  },
  {
    id: 4,
    icon: Grid3x3,
    value: '75,000',
    unit: 'm²',
    label: 'Zavod Sahəsi',
  },
];

export function StatisticsSection() {
  return (
    <section className="bg-gray-50 py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
            SAYLARLA BİZİM GÜÇÜMÜZ
          </div>
          <h2 className="text-gray-900">
            İstehsal Göstəriciləri
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat) => (
            <div
              key={stat.id}
              className="bg-white p-8 border border-gray-200 hover:border-blue-900 transition-colors group"
            >
              <div className="mb-6">
                <stat.icon className="w-10 h-10 text-blue-900" strokeWidth={1.5} />
              </div>
              <div className="mb-2">
                <span className="text-4xl text-gray-900">{stat.value}</span>
                <span className="ml-2 text-gray-500">{stat.unit}</span>
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
