import {
  Target,
  Eye,
  Users,
  Cog,
  Award,
  TrendingUp,
  Trophy,
  Zap,
  Globe,
  Briefcase,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const management = [
  {
    id: 1,
    name: "Elçin Əliyev",
    position: "Baş Direktor",
    description: "25 il metal sənayesində təcrübə",
  },
  {
    id: 2,
    name: "Rəşad Məmmədov",
    position: "Texniki Direktor",
    description: "İstehsal proseslərinin optimallaşdırılması",
  },
  {
    id: 3,
    name: "Leyla Quliyeva",
    position: "Keyfiyyət Meneceri",
    description: "ISO və beynəlxalq sertifikasiya",
  },
  {
    id: 4,
    name: "Vüqar Həsənov",
    position: "Satış Direktoru",
    description: "B2B əlaqələr və ixrac əməliyyatları",
  },
];

const equipment = [
  {
    id: 1,
    name: "Prokat Dəzgahları",
    description: "Müasir avtomatlaşdırılmış valslama xətləri",
    capacity: "18-32mm armatur istehsalı",
  },
  {
    id: 2,
    name: "Fasiləsiz Tökükxana",
    description: "Continuous casting machine, 4 kanallı",
    capacity: "350 ton/gün",
  },
  {
    id: 3,
    name: "Elektrik Qaynaq Xətti",
    description: "Yüksək tezlikli boru qaynaq avadanlığı",
    capacity: "DN 20-400mm",
  },
  {
    id: 4,
    name: "Kəsmə və Paketləmə",
    description: "Avtomatik ölçüləndirmə və paketləmə kompleksi",
    capacity: "±2mm dəqiqlik",
  },
];

const timeline = [
  {
    year: "2005",
    title: "Dəyirmi Məhsullar, Kvadrat, Yumru Və Uçbucaq Profillər",
    description:
      "Bir qayda olaraq dairəvi məhsullar, kvadrat, yumru və üçbucaq profillər adi qazlı polad təbəqələrdən isliyin ayılması üsulu ilə istehsal olunur. Yuxarıda qeyd edilmiş bütün məhsullar GOST 535-2005 tələblərinə uyğun olaraq hazırlanır.",
  },
  {
    year: "2008",
    title: "Avtomatik rəngləndirmə xətti",
    description:
      "Hər il biz dünya miqyasında böyük inkişaf müşahidə edirik, qabaqcıl texnologiya köhnələri əvəz edir. Yeni texnologiyadan istifadə müasir dövrdə Azərbaycanda da əsas tələbata çevrilmişdir. Yuxarıda qeyd edilənləri nəzərə alaraq, müəssisənin rəhbərliyi ilk dəfə Azərbaycanda avtomatik quğu ilə boru və profilləri rəngləyən texnologiyanı quraşdırmağı qarşısına hədəf qoymuşdur və buna müvəffəqiyyətlə nail olmuşdur.",
  },
  {
    year: "2012",
    title: "Avtomatik Metal Vərəq Açma Xətti",
    description:
      "Boru və profil istehsalını daha da inkişaf etdirmək üçün müxtəlif sahələrdə dəstək tələb olunur. Boru və profil məhsullarının satışını artırmaq məqsədi ilə yeni əlavə olaraq avtomatik metal vərəq açma xətti əldə edildi. Bu xətt müxtəlif ölçülü və qalınlıqlı metal vərəqləri düzləndirmək və ölçüyə kəsilmək üçün istifadə edilir",
  },
];

const values = [
  {
    icon: Award,
    title: "Keyfiyyət",
    description:
      "Hər mərhələdə yüksək standartlara riayət və davamlı təkmilləşdirmə",
  },
  {
    icon: Zap,
    title: "İnnovasiya",
    description:
      "Yeni texnologiyalara investisiya və proseslərin modernləşdirilməsi",
  },
  {
    icon: Users,
    title: "Komanda",
    description: "Peşəkar kadrların inkişafı və motivasiyası",
  },
  {
    icon: Globe,
    title: "Davamlılıq",
    description: "Ekoloji məsuliyyət və ətraf mühitin qorunması",
  },
  {
    icon: Briefcase,
    title: "Partnyorluq",
    description: "Uzunmüddətli, qarşılıqlı faydalı əməkdaşlıq münasibətləri",
  },
];

const achievements = [
  {
    year: "2023",
    title: "Ən Yaxşı İstehsalçı",
    organization: "Azərbaycan Sənaye Assosasiyası",
  },
  {
    year: "2022",
    title: "İxrac Lideri",
    organization: "İqtisadiyyat Nazirliyi",
  },
  {
    year: "2021",
    title: "Keyfiyyət Mükafatı",
    organization: "Standartlaşdırma, Metrologiya və Patent üzrə Komitə",
  },
  {
    year: "2020",
    title: "Sosial Məsuliyyət",
    organization: "Azərbaycan Sahibkarlar Konfederasiyası",
  },
];

export function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="text-sm tracking-[0.2em] text-blue-200 mb-4">
              HAQQIMIZDA
            </div>
            <h1 className="mb-6">Metal Sənayesində Lider</h1>
            <p className="text-blue-100 text-lg">
              “Bakı İnşaat Sənaye” ASC Müəssisə AZS Milli Sertifikatlaşdırma
              Sisteminə uyğun olaraq Azərbaycan Respublikasının
              Standartlaşdırma, Metrologiya və Patent üzrə Dövlət Komitəsi
              tərəfindən Uyğunluq SertifikaG ilə təltif edilib.
            </p>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
              TARİXİMİZ
            </div>
            <h2 className="text-gray-900 mb-6">18 İllik Təcrübə və İnkişaf</h2>
            <div className="space-y-6 text-gray-600">
              <p>
                “Bakı İnşaat Sənaye” Bakı İnşaat Sənaye Açıq Səhmdar Cəmiyyəti
                2002-ci ildən fəaliyyətə başlayıb. Əsas istehsalat sahəsi
                tikinti və digər sahələrdə istifadə edilən qara metaldan uqolnik
                (künclük), kvadrat, yumru və müxtəlif formalı məhsulları, mismar
                və naqilləri istehsal etməkdir.
              </p>
              <p>
                Qara metal məhsullar yuvarlanma üsulu ilə yüksək texnologiyadan
                istifadə edərək müxtəlif forma və ölçülərdə hazırlanır. Müəssisə
                dünya standartlarına uyğun olan müxtəlif ölçü və növlərdə geniç
                miqdarda su və qaz boruları, inşaat profilləri istehsal edir.
              </p>
              <p>
                Müəssisə AZS Milli Sertifikatlaşdırma Sisteminə uyğun olaraq
                Azərbaycan Respublikasının Standartlaşdırma, Metrologiya və
                Patent üzrə Dövlət Komitəsi tərəfindən Uyğunluq SertifikaG ilə
                təltif edilib.
              </p>
              <p>
                “Bakı İnşaat Sənaye” ASC Müəssisə AZS Milli Sertifikatlaşdırma
                Sisteminə uyğun olaraq Azərbaycan Respublikasının
                Standartlaşdırma, Metrologiya və Patent üzrə Dövlət Komitəsi
                tərəfindən Uyğunluq SertifikaG ilə təltif edilib.
              </p>
            </div>
          </div>
          <div className="relative h-[500px] bg-gray-100">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1734864220078-c7354732aa7d?w=800"
              alt="Factory"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gray-50 py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
              İŞLƏRIMIZ
            </div>
            <h2 className="text-gray-900 mb-4">Əsas İşlərimiz</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              2005-ci ildən bu günə qədər keçdiyimiz yol və əldə etdiyimiz
              nailiyyətlər
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-8 mb-12 last:mb-0">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-20 h-20 bg-blue-900 text-white flex items-center justify-center">
                    <span className="text-lg">{item.year}</span>
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-300 mt-4" />
                  )}
                </div>
                <div className="pb-12">
                  <h3 className="text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white p-12 border border-gray-200">
            <Target
              className="w-12 h-12 text-blue-900 mb-6"
              strokeWidth={1.5}
            />
            <h3 className="text-gray-900 mb-4">Missiyamız</h3>
            <p className="text-gray-600 mb-6">
              Müasir texnologiyalar və beynəlxalq keyfiyyət standartları
              əsasında etibarlı metal məhsulları istehsal edərək, tikinti və
              infrastruktur layihələrinin uğuruna töhfə vermək.
            </p>
            <p className="text-gray-600">
              Müştəri məmnuniyyəti, əməkdaşların inkişafı və ekoloji məsuliyyət
              prioritetlərimizdir. Biz sadəcə keyfiyyətli məhsul istehsal
              etmirik, həm də davamlı inkişafa və cəmiyyətin rifahına töhfə
              veririk.
            </p>
          </div>
          <div className="bg-white p-12 border border-gray-200">
            <Eye className="w-12 h-12 text-blue-900 mb-6" strokeWidth={1.5} />
            <h3 className="text-gray-900 mb-4">Vizyonumuz</h3>
            <p className="text-gray-600 mb-6">
              Regional metal sənayesində lider mövqeyi qorumaq və beynəlxalq
              bazarda tanınan marka olmaq. İnnovasiya və davamlı inkişaf yolu
              ilə ixrac həcmini artırmaq, yeni məhsul xətləri əlavə etmək və
              sənaye 4.0 texnologiyalarını tətbiq etmək.
            </p>
            <p className="text-gray-600">
              2030-cu ilə qədər istehsal gücünü 500,000 ton/ilə çatdırmaq, yeni
              ixrac bazarları əldə etmək və regionun ən texnoloji cəhətdən
              inkişaf etmiş metal istehsalçısı kimi tanınmaq.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
              DƏYƏRLƏRİMİZ
            </div>
            <h2 className="text-gray-900 mb-4">Bizi İdarə Edən Prinsiplər</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fəaliyyətimizin əsasını təşkil edən dəyərlər və prinsiplər
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white p-8 border border-gray-200">
                <value.icon
                  className="w-10 h-10 text-blue-900 mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management */}
      <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="text-center mb-16">
          <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
            RƏHBƏRLIK
          </div>
          <h2 className="text-gray-900">Peşəkar İdarəetmə Komandası</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {management.map((person) => (
            <div key={person.id} className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-16 h-16 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-gray-900 mb-1">{person.name}</h3>
              <div className="text-sm text-blue-900 mb-2">
                {person.position}
              </div>
              <div className="text-sm text-gray-600">{person.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-white py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
              NAİLİYYƏTLƏR
            </div>
            <h2 className="text-gray-900 mb-4">Mükafatlar və Tanınma</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Keyfiyyətimiz və töhfələrimiz dövlət və peşə təşkilatları
              tərəfindən qiymətləndirilir
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-8 border border-gray-200 text-center"
              >
                <Trophy
                  className="w-12 h-12 text-blue-900 mx-auto mb-4"
                  strokeWidth={1.5}
                />
                <div className="text-2xl text-blue-900 mb-2">
                  {achievement.year}
                </div>
                <h3 className="text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-600">
                  {achievement.organization}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capacity */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="text-sm tracking-[0.2em] text-gray-400 mb-4">
              İSTEHSAL GÜCLƏRİ
            </div>
            <h2 className="mb-6">Yüksək Texnoloji İmkanlar</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="flex items-start gap-4">
              <Award
                className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="mb-2">Sertifikatlar</h3>
                <p className="text-gray-300 text-sm">
                  ISO 9001:2015, ISO 14001:2015, OHSAS 18001, CE Marking və
                  digər beynəlxalq sertifikatlar
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <TrendingUp
                className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="mb-2">İllik Artım</h3>
                <p className="text-gray-300 text-sm">
                  İstehsal həcmi son 5 ildə 35% artım göstərib, gələcək planlar
                  daha ambisiozludur
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Cog
                className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="mb-2">Texnoloji Baza</h3>
                <p className="text-gray-300 text-sm">
                  Avropa və Yaponiya istehsalı müasir avadanlıqlar,
                  avtomatlaşdırılmış istehsal xətləri
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Users
                className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="mb-2">Kadr Potensialı</h3>
                <p className="text-gray-300 text-sm">
                  500+ işçi, o cümlədən 80+ mühəndis və texniki mütəxəssis,
                  davamlı təlim proqramları
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="text-center mb-16">
          <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
            AVADANLIQLAR
          </div>
          <h2 className="text-gray-900">İstehsal Texnologiyaları</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {equipment.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 p-8">
              <h3 className="text-gray-900 mb-3">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="text-sm text-blue-900">Güc: {item.capacity}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
