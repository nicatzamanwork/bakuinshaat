import { MapPin, Phone, Mail, Clock, Send, HelpCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mesajınız göndərildi! Tezliklə cavab verəcəyik.");
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const faqs = [
    {
      question: "Minimum sifariş həcmi nə qədərdir?",
      answer:
        "Armatur üçün minimum sifariş həcmi 10 tondur. Borular üçün isə 5 ton. Xüsusi hallarda fərdi yanaşma tətbiq edilir. Topdan sifarişlərdə xüsusi endirimlər mövcuddur.",
    },
    {
      question: "Çatdırılma nə qədər vaxt aparır?",
      answer:
        "Standart məhsullar üçün çatdırılma müddəti 5-7 iş günüdür. Böyük həcmli sifarişlər və ya xüsusi tələblər üçün müddət 10-15 iş günü ola bilər. Bakı daxilində çatdırılma pulsuzdur.",
    },
    {
      question: "Hansı ödəniş üsulları mövcuddur?",
      answer:
        "Bank köçürməsi, nağd ödəniş, və müqavilə əsasında kredit xətti. Daimi müştərilər üçün təxirəsalma şərtləri də mövcuddur. B2B müştərilərə xüsusi ödəniş şərtləri tətbiq olunur.",
    },
    {
      question: "Məhsullara zəmanət verilirmi?",
      answer:
        "Bəli, bütün məhsullarımıza beynəlxalq standartlara uyğunluq zəmanəti verilir. Hər partiyaya test sertifikatları və keyfiyyət göstəriciləri əlavə olunur. İstehsal qüsuru olduqda tam əvəz etmə həyata keçirilir.",
    },
    {
      question: "İxrac sifarişləri qəbul edirsinizmi?",
      answer:
        "Bəli, məhsullarımız Gürcüstan, Türkiyə, Rusiya və Mərkəzi Asiya ölkələrinə ixrac olunur. Bütün lazımi sənədlərin hazırlanması və logistikada dəstək təmin edirik.",
    },
    {
      question: "Xüsusi ölçülərdə sifariş vermək mümkündürmü?",
      answer:
        "Xüsusi tələblərə uyğun istehsal xidməti göstəririk. Fərdi ölçülər, xüsusi texniki xüsusiyyətlər və sair. Texniki departamentimizlə əlaqə saxlayaraq detal məlumat əldə edə bilərsiniz.",
    },
    {
      question: "Zavodu ziyarət etmək mümkündürmü?",
      answer:
        "Bəli, müştərilərimiz və potensial partnyorlar üçün zavod turları təşkil edirik. Görüş təyin etmək üçün əvvəlcədən əlaqə saxlamalısınız. İstehsal prosesləri və avadanlıqları görə bilərsiniz.",
    },
    {
      question: "Texniki məsləhət xidməti varmı?",
      answer:
        "Bəli, mühəndis-texniki işçilərimiz layihələriniz üçün pulsuz məsləhət xidməti göstərir. Material seçimi, hesablamalar və texniki spesifikasiyalar üzrə dəstək təmin edirik.",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="text-sm tracking-[0.2em] text-blue-200 mb-4">
              ƏLAQƏ
            </div>
            <h1 className="mb-6">Bizimlə Əlaqə Saxlayın</h1>
            <p className="text-blue-100 text-lg">
              B2B əməkdaşlıq, topdan satış və texniki məsləhətlər üçün
              komandamızla əlaqə qurun.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
              ƏLAQƏ MƏLUMATLARı
            </div>
            <h2 className="text-gray-900 mb-8">Ofis və Zavod</h2>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <div className="text-gray-900 mb-1">Ünvan</div>
                  <div className="text-gray-600 text-sm">
                    Bakı, Azərbaycan
                    <br />
                    Sumqayıt yolu, km 25
                    <br />
                    Metal Steel Industrial Complex
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <div className="text-gray-900 mb-1">Telefon</div>
                  <div className="text-gray-600 text-sm space-y-1">
                    <div>(+994 12) 514-60-82</div>
                    <div>(+994 12) 514-65-28</div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <div className="text-gray-900 mb-1">Email</div>
                  <div className="text-gray-600 text-sm space-y-1">
                    <div>info@metalsteel.az</div>
                    <div className="text-blue-900">
                      sales@metalsteel.az (B2B)
                    </div>
                    <div>export@metalsteel.az</div>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <div className="text-gray-900 mb-1">İş Saatları</div>
                  <div className="text-gray-600 text-sm space-y-1">
                    <div>Bazar ertəsi - Cümə: 09:00 - 18:00</div>
                    <div>Şənbə: 09:00 - 14:00</div>
                    <div>Bazar: Bağlı</div>
                  </div>
                </div>
              </div>
            </div>

            {/* B2B Note */}
            <div className="mt-8 p-6 bg-blue-50 border border-blue-100">
              <h3 className="text-gray-900 mb-2">B2B Əməkdaşlıq</h3>
              <p className="text-gray-600 text-sm">
                Topdan satış, ixrac və xüsusi sifarişlər üçün B2B
                departamentimizlə bilavasitə əlaqə saxlayın:{" "}
                <strong>sales@metalsteel.az</strong>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 p-8">
              <h3 className="text-gray-900 mb-6">Sorğu Forması</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="contact-name">Ad, Soyad *</Label>
                    <Input
                      id="contact-name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-company">Şirkət</Label>
                    <Input
                      id="contact-company"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">Telefon *</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact-subject">Mövzu *</Label>
                  <Input
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="contact-message">Mesaj *</Label>
                  <Textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={6}
                    className="mt-1.5"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-900 hover:bg-blue-800 h-12"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Göndər
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
                TEZLIKLƏ VERILƏN SUALLAR
              </div>
              <h2 className="text-gray-900 mb-4">Ən Çox Soruşulan Suallar</h2>
              <p className="text-gray-600">
                Sifarişlər, çatdırılma və məhsullarımız haqqında ətraflı məlumat
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="bg-white border border-gray-200 px-6"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-900">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pl-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 text-center p-8 bg-white border border-gray-200">
              <h3 className="text-gray-900 mb-3">
                Sualınızın cavabını tapmadınız?
              </h3>
              <p className="text-gray-600 mb-6">
                Bizə yazın və ya zəng edin, komandamız sizə kömək etməkdən
                məmnun olacaq.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={() =>
                    (window.location.href = "mailto:info@metalsteel.az")
                  }
                  variant="outline"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Email göndər
                </Button>
                <Button
                  onClick={() => (window.location.href = "tel:+994121234567")}
                  className="bg-blue-900 hover:bg-blue-800"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Zəng et
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <div className="text-sm tracking-[0.2em] text-gray-500 mb-4">
              MƏKAN
            </div>
            <h2 className="text-gray-900">Zavodumuzun Yeri</h2>
          </div>

          <div className="w-full h-[500px] bg-gray-200 relative">
            {/* Google Maps Embed - Replace with actual coordinates */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194473.42135039626!2d49.69115!3d40.39439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6bd6211cf9%3A0x343f6b5e7ae56c6b!2sBaku%2C%20Azerbaijan!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Factory Location"
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Zavod və ofisimizi ziyarət etmək üçün əvvəlcədən görüş təyin edin.
            </p>
            <Button variant="outline" size="lg">
              <Phone className="mr-2 h-5 w-5" />
              Görüş təyin et
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
