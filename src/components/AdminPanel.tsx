import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  FileText,
  Package,
  Settings,
  Save,
  Loader2,
  AlertTriangle,
  Send,
  Layers3,
  UploadCloud,
  ImageIcon,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useEffect } from "react";
import React from "react";

// Məhsul interfeysi
interface Product {
  id: number;
  name: string;
  category: string;
  status: "active" | "draft";
}
// Əlavə (Sertifikat/Hesabat) interfeysi
interface Attachment {
  id: number;
  fileName: string;
  productName: string;
  type: "CERTIFICATE" | "TEST_REPORT" | string;
  url: string;
  uploadDate: string;
  productId: number;
}
interface CompanyInfo {
  id: number;
  companyName: string;
  phoneNumber: string;
  email: string;
  address: string;
  whatsappNumber: string;
}
// --- API ENDPOINTS ---
const PRODUCTS_API_URL =
  "https://baki-insaat-senaye.onrender.com/private/products";
const ATTACHMENTS_API_URL =
  "https://baki-insaat-senaye.onrender.com/private/attachments";
const COMPANY_INFO_API_URL =
  "https://baki-insaat-senaye.onrender.com/private/company-info";
const SLIDER_API_URL =
  "https://baki-insaat-senaye.onrender.com/slider?type=SLIDER";
const SLIDER_API_URL_DELETE = "https://baki-insaat-senaye.onrender.com";

const initialSettingsForm = {
  companyName: "",
  phoneNumber: "",
  email: "",
  address: "",
  whatsappNumber: "",
};
type SettingsKeys = keyof typeof initialSettingsForm;
export function AdminPanel() {
  // --- Məhsulun State'ləri ---
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    description: "",
    standards: "",
    specifications: "",
  });

  // --- Sertifikatın State'ləri ---
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loadingAttachments, setLoadingAttachments] = useState(false);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [certificateType, setCertificateType] = useState<string>("");
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  // --- Şirkət Məlumatı State'ləri ---
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [settingsForm, setSettingsForm] = useState(initialSettingsForm);
  const [loadingCompanyInfo, setLoadingCompanyInfo] = useState(false);
  const [savingCompanyInfo, setSavingCompanyInfo] = useState(false);
  const [companyInfoError, setCompanyInfoError] = useState<string | null>(null);

  const [sliders, setSliders] = useState([]);
  const [newSliderData, setNewSliderData] = useState({
    title: "",
    description: "",
    file: null as File | null,
  });
  const [loadingSliders, setLoadingSliders] = useState(false);
  // --- 1. Slayderləri Gətirmək (GET /slider) ---
  const fetchSliders = async () => {
    try {
      const response = await fetch(`${SLIDER_API_URL}`);
      if (!response.ok) {
        throw new Error("Slayderlər gətirilərkən xəta baş verdi");
      }
      const data = await response.json();
      setSliders(data);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Slayderləri yükləmək mümkün olmadı.");
    }
  };

  // Komponent yüklənən zaman slayderləri gətir.
  useEffect(() => {
    fetchSliders();
  }, []);

  // --- 2. Yeni Slayder Yaratmaq (POST /private/slider) ---
  const handleCreateSlider = async () => {
    const { title, description, file } = newSliderData;

    if (!title || !description || !file) {
      alert("Zəhmət olmasa bütün sahələri doldurun və şəkil seçin.");
      return;
    }

    // FormData istifadə edərək şəkil və məlumatları göndəririk (multipart/form-data)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    try {
      // Düzəldilmiş URL-i SLIDER_API_URL_DELETE sabitindən istifadə edərək qururuq.
      // Düzgün format: https://baki-insaat-senaye.onrender.com/private/slider?title=test&description=test
      const apiEndpoint = `${SLIDER_API_URL_DELETE}/private/slider?title=${encodeURIComponent(
        title
      )}&description=${encodeURIComponent(description)}`;

      const response = await fetch(apiEndpoint, {
        method: "POST",
        // Swagger-ə əsasən, title və description query parameter-lərdir,
        // file isə body (multipart/form-data) hissəsidir.
        body: formData,
        headers: {
          // Məsələn: 'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        console.error("Slayder API Xətası:", errorDetail);
        throw new Error("Slayder əlavə edilərkən xəta baş verdi.");
      }

      alert("Yeni slayder uğurla əlavə edildi!");
      setNewSliderData({ title: "", description: "", file: null }); // Sahələri təmizlə
      fetchSliders(); // Siyahını yenilə
    } catch (error) {
      console.error("POST error:", error);
      alert(`Slayder yaratmaq mümkün olmadı: ${error.message}`);
    }
  };

  // --- 3. Slayderi Silmək (DELETE /private/slider) ---
  const handleDeleteSlider = async (sliderId) => {
    if (!window.confirm(`ID ${sliderId} olan slayderi silməyə əminsiniz?`)) {
      return;
    }

    try {
      const response = await fetch(
        `${SLIDER_API_URL_DELETE}/private/slider?sliderId=${sliderId}`,
        {
          method: "DELETE",
          headers: {
            // Məsələn: 'Authorization': `Bearer ${token}`
            Accept: "*/*",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Slayder silinərkən xəta baş verdi.");
      }

      alert(`Slayder (ID: ${sliderId}) uğurla silindi.`);
      fetchSliders(); // Siyahını yenilə
    } catch (error) {
      console.error("DELETE error:", error);
      alert("Slayderi silmək mümkün olmadı.");
    }
  };

  // --- MƏHSUL FUNKSİYALARI (YENİLƏNMİŞ) ---

  // Yeni Məhsul Əlavə Etmək (POST /private/products)
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.category) {
      toast.error("Məhsul Adı və Kateqoriya sahələri mütləq doldurulmalıdır.");
      return;
    }

    try {
      // 1. Texniki Xüsusiyyətlər (JSON) sahəsini obyektdə çevirmək
      let specsObject: any = {};
      if (newProduct.specifications) {
        try {
          specsObject = JSON.parse(newProduct.specifications);
        } catch (error) {
          toast.error("Texniki Xüsusiyyətlər düzgün JSON formatında deyil.");
          return;
        }
      }

      // 2. API-nin tələb etdiyi formatda məlumatları hazırlamaq
      const dataToSend = {
        name: newProduct.name,
        description: newProduct.description,
        category: newProduct.category,
        standards: newProduct.standards,

        // Spesifikasiyalardan gələn dəyərləri əlavə et
        type: specsObject.type || undefined,
        grade: specsObject.grade || undefined,
        thickness: specsObject.thickness || undefined,
        width: specsObject.width || undefined,
        diameter: specsObject.diameter || undefined,
        material: specsObject.material || undefined,
        surface: specsObject.surface || undefined,
        size: specsObject.size || undefined,
        length: specsObject.length || undefined,
        yield: specsObject.yield || undefined,
        tensile: specsObject.tensile || undefined,
        class: specsObject.class || undefined,
      };

      const response = await fetch(PRODUCTS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // QEYD: Əgər API Auth tələb edirsə, burada Authorization header-i əlavə edin
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        console.error("Məhsul API Xətası:", errorDetail);
        throw new Error(`Məhsul əlavə edilmədi. Xəta: ${response.status}`);
      }

      // Uğur mesajı
      toast.success(`Məhsul "${newProduct.name}" uğurla əlavə edildi!`);

      // Formanı təmizləmək
      setNewProduct({
        name: "",
        category: "",
        description: "",
        standards: "",
        specifications: "",
      });

      // Məhsul siyahısını yeniləmək
      await fetchProducts();
    } catch (error) {
      console.error("Məhsul əlavə edilərkən xəta:", error);
      toast.error(`Məhsul əlavə edilərkən xəta baş verdi: ${error.message}`);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    // Silinmə əməliyyatını təsdiqləmək üçün sorğu
    if (!window.confirm(`ID ${id} olan məhsulu silməyə əminsiniz?`)) {
      return;
    }

    try {
      // 1. API-yə DELETE sorğusu göndəririk. (Swagger-də göstərilən format: productId=5)
      const response = await fetch(`${PRODUCTS_API_URL}?productId=${id}`, {
        method: "DELETE",
        headers: {
          Accept: "*/*",
          // QEYD: Əgər API Auth tələb edirsə, burada Authorization header-i əlavə edin
          // Məsələn: 'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        // Əgər cavab 200-dən fərqlidirsə, xəta mesajı göstəririk
        const errorDetail = await response.text();
        console.error("Məhsul Silinməsi API Xətası:", errorDetail);
        throw new Error(`Məhsul silinərkən xəta baş verdi: ${response.status}`);
      }

      // 2. Uğurlu olduqdan sonra məhsulu yerli (local) state-dən silirik.
      setProducts(products.filter((p) => p.id !== id));

      // 3. Bildiriş
      toast.success(`Məhsul (ID: ${id}) uğurla silindi.`);

      // Əlavə: Məhsullar siyahısını tamamilə yeniləyə bilərsiniz (təhlükəsizlik üçün)
      // await fetchProducts();
    } catch (error) {
      console.error("DELETE error:", error);
      toast.error(`Məhsulu silmək mümkün olmadı: ${error.message}`);
    }
  };

  // ... (Digər funksiyalar)

  // --- SERTİFİKAT FUNKSİYALARI (Yükləmə / Silmə) ---

  // Sertifikat Yükləmək (POST)
  const handleUploadCertificate = async () => {
    if (selectedProductId === null || fileToUpload === null) {
      toast.error("Zəhmət olmasa, məhsul və fayl seçin.");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileToUpload);

    const standardValue = certificateType || "Unspecified";

    try {
      const response = await fetch(
        // API URL-də productId, type və standard parametrlərini göndəririk
        `${ATTACHMENTS_API_URL}?productId=${selectedProductId}&type=CERTIFICATE&standard=${standardValue}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Sertifikat yüklənmədi.");
      }

      toast.success(`Sertifikat "${fileToUpload.name}" uğurla yükləndi.`);

      setFileToUpload(null);
      setCertificateType("");
      // Yükləmədən sonra avtomatik yenilənməsi üçün selectedProductId-ni yeniləyirik
      // Bu, Sertifikatları Gətirən useEffect-i yenidən işə salacaq.
      setSelectedProductId(selectedProductId);
    } catch (error) {
      toast.error(`Yüklənmə Xətası: ${error.message}`);
    }
  };

  // Sertifikat Silmək (DELETE)
  const handleDeleteAttachment = async (attachmentId: number) => {
    try {
      const response = await fetch(
        `${ATTACHMENTS_API_URL}?attachmentId=${attachmentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Sertifikat silinərkən səhv baş verdi.");
      }

      setAttachments(attachments.filter((att) => att.id !== attachmentId));
      toast.success("Sertifikat uğurla silindi.");
    } catch (error) {
      toast.error(`Silinmə Xətası: ${error.message}`);
    }
  };

  // --- MƏHSULLARI GƏTİRMƏK (API) ---
  const fetchProducts = async () => {
    setLoadingProducts(true);
    setProductError(null);
    try {
      const response = await fetch(PRODUCTS_API_URL);
      if (!response.ok) {
        throw new Error(`API cavabı uğursuz oldu: ${response.status}`);
      }

      const apiData: { [key: string]: string } = await response.json();

      // API cavabını Product interfeysinə uyğun formatlayırıq:
      const transformedProducts: Product[] = Object.entries(apiData).map(
        ([id, name]) => ({
          id: Number(id),
          name: name,
          category: "Əsas məhsul", // Default category name
          status: "active",
        })
      );

      setProducts(transformedProducts);
    } catch (e) {
      console.error("Məhsul yüklənməsi xətası:", e);
      setProductError("Məhsul siyahısını yükləmək mümkün olmadı.");
    } finally {
      setLoadingProducts(false);
    }
  };

  // --- ŞİRKƏT MƏLUMATINI GƏTİRMƏK (API GET) ---
  const handleSettingsChange = (key: SettingsKeys, value: string) => {
    setSettingsForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const fetchCompanyInfo = async () => {
    setLoadingCompanyInfo(true);
    setCompanyInfoError(null);
    try {
      const response = await fetch(COMPANY_INFO_API_URL);
      if (!response.ok) {
        throw new Error(`API cavabı uğursuz oldu: ${response.status}`);
      }

      const data: CompanyInfo = await response.json();
      setCompanyInfo(data);
      // Formu gələn məlumatlarla doldururuq
      setSettingsForm({
        companyName: data.companyName || "",
        phoneNumber: data.phoneNumber || "",
        email: data.email || "",
        address: data.address || "",
        whatsappNumber: data.whatsappNumber || "",
      });
    } catch (e) {
      console.error("Şirkət məlumatı yüklənməsi xətası:", e);
      setCompanyInfoError("Şirkət məlumatlarını yükləmək mümkün olmadı.");
    } finally {
      setLoadingCompanyInfo(false);
    }
  };

  // --- ŞİRKƏT MƏLUMATINI YADDA SAXLAMAQ (API PUT) ---
  const handleSaveSettings = async () => {
    if (!companyInfo) {
      toast.error(
        "Şirkət məlumatları hələ yüklənməyib. Zəhmət olmasa gözləyin."
      );
      return;
    }

    // Göndəriləcək obyekt settingsFormdan gəlir
    const dataToSend = {
      companyName: settingsForm.companyName,
      phoneNumber: settingsForm.phoneNumber,
      email: settingsForm.email,
      address: settingsForm.address,
      whatsappNumber: settingsForm.whatsappNumber,
    };

    setSavingCompanyInfo(true);

    try {
      const response = await fetch(COMPANY_INFO_API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Məlumatlar yadda saxlanılmadı.");
      }

      // Uğurlu olduqdan sonra məlumatı yenidən yükləyirik
      await fetchCompanyInfo();
      toast.success("Parametrlər uğurla yadda saxlandı!");
    } catch (error) {
      toast.error(`Yadda Saxlama Xətası: ${error.message}`);
    } finally {
      setSavingCompanyInfo(false);
    }
  };
  // 1. MƏHSULLARI YÜKLƏMƏK (Komponent ilk dəfə yüklənəndə)
  useEffect(() => {
    fetchProducts();
    fetchCompanyInfo();
  }, []);

  // 2. İLK MƏHSULU AVTOMATİK SEÇMƏK (products API-dən dolduqda)
  useEffect(() => {
    // Yalnız products array-i doludursa və hələ heç nə seçilməyibsə avtomatik seçir.
    if (products.length > 0 && selectedProductId === null) {
      setSelectedProductId(products[0].id);
    }
  }, [products, selectedProductId]);

  // 3. SERTİFİKATLARI SEÇİLMİŞ MƏHSULA ƏSASƏN GƏTİRMƏK
  useEffect(() => {
    if (selectedProductId !== null) {
      const fetchAttachments = async () => {
        try {
          setLoadingAttachments(true);
          setAttachmentError(null);

          const response = await fetch(
            `${ATTACHMENTS_API_URL}?type=CERTIFICATE&productId=${selectedProductId}`
          );

          if (!response.ok) {
            throw new Error(
              `Sertifikatlar gətirilərkən səhv baş verdi: ${response.status}`
            );
          }

          const apiData: Attachment[] = await response.json();
          setAttachments(apiData);
        } catch (e) {
          console.error("Sertifikatlar yüklənərkən səhv:", e);
          setAttachmentError("Sertifikat siyahısını yükləmək mümkün olmadı.");
        } finally {
          setLoadingAttachments(false);
        }
      };

      fetchAttachments();
    }
  }, [selectedProductId]); // Yalnız selectedProductId dəyişdikdə çalışır.
  // --- MƏHSUL FUNKSİYALARI ---

  // --- MƏHSUL FUNKSİYALARI ---

  // ... (Digər funksiyalar)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">Admin Panel</h1>
              <p className="text-gray-600">Məhsul və məzmun idarəetməsi</p>
            </div>
            <Badge variant="outline" className="text-blue-900 border-blue-900">
              Administrator
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <Tabs defaultValue="products" className="space-y-8">
          <TabsList>
            <TabsTrigger value="products" className="gap-2">
              <Package size={16} />
              Məhsullar
            </TabsTrigger>
            <TabsTrigger value="certificates" className="gap-2">
              <FileText size={16} />
              Sertifikatlar
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-2">
              <Edit size={16} />
              Məzmun
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings size={16} />
              Parametrlər
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-8">
            {/* Add New Product */}
            <div className="bg-white border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Plus className="w-6 h-6 text-blue-900" />
                <h2 className="text-gray-900">Yeni Məhsul Əlavə Et</h2>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="product-name">Məhsul Adı *</Label>
                    <Input
                      id="product-name"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-category">Kateqoriya *</Label>
                    <Input
                      id="product-category"
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          category: e.target.value,
                        })
                      }
                      required
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="product-description">Təsvir</Label>
                  <Textarea
                    id="product-description"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="product-standards">
                    Standartlar (vergüllə ayırın)
                  </Label>
                  <Input
                    id="product-standards"
                    value={newProduct.standards}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        standards: e.target.value,
                      })
                    }
                    placeholder="GOST 5781-82, DSTU 3760:2006, AZS 012-2019"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="product-specs">
                    Texniki Xüsusiyyətlər (JSON format)
                  </Label>
                  <Textarea
                    id="product-specs"
                    value={newProduct.specifications}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        specifications: e.target.value,
                      })
                    }
                    rows={4}
                    placeholder='{"diameter": "6-32mm", "length": "6m, 11.7m"}'
                    className="mt-1.5 font-mono text-sm"
                  />
                </div>

                <Button
                  onClick={handleAddProduct}
                  type="submit"
                  className="bg-blue-900 hover:bg-blue-800"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Məhsul Əlavə Et
                </Button>
              </form>
            </div>

            {/* Product List */}
            <div className="bg-white border border-gray-200 p-8">
              <h2 className="text-gray-900 mb-6">Mövcud Məhsullar</h2>
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 border border-gray-200 hover:border-blue-900 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Package className="w-8 h-8 text-gray-400" />
                      <div>
                        <div className="text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">
                          {product.category}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          product.status === "active" ? "default" : "secondary"
                        }
                      >
                        {product.status === "active" ? "Aktiv" : "Qaralama"}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-8">
            <div className="bg-white border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Upload className="w-6 h-6 text-blue-900" />
                <h2 className="text-gray-900">Sertifikat Yüklə</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <Label htmlFor="cert-product">Məhsul seç *</Label>
                  {loadingProducts && (
                    <p className="text-gray-500 flex items-center gap-2 mt-1.5">
                      <Loader2 className="h-4 w-4 animate-spin" /> Məhsullar
                      yüklənir...
                    </p>
                  )}
                  {productError && (
                    <p className="text-red-600 mt-1.5">{productError}</p>
                  )}
                  {!loadingProducts && !productError && (
                    <select
                      id="cert-product"
                      value={selectedProductId || ""}
                      onChange={(e) =>
                        setSelectedProductId(Number(e.target.value))
                      }
                      className="w-full mt-1.5 h-10 px-3 border border-gray-300 rounded-md"
                      disabled={products.length === 0}
                    >
                      {products.length === 0 && (
                        <option value="" disabled>
                          Heç bir məhsul tapılmadı
                        </option>
                      )}
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <Label htmlFor="cert-type">Standart (Növü)</Label>
                  <Input
                    id="cert-type"
                    value={certificateType}
                    onChange={(e) => setCertificateType(e.target.value)}
                    placeholder="ISO 9001, GOST Certificate, Test Report"
                    className="mt-1.5"
                  />
                </div>

                {/* Fayl Seçimi Sahəsi */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-900 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    id="file-upload"
                    onChange={(e) =>
                      setFileToUpload(e.target.files ? e.target.files[0] : null)
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".pdf, .doc, .docx" // Qəbul edilən fayl növləri
                  />
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    {fileToUpload
                      ? `Seçilmiş fayl: ${fileToUpload.name}`
                      : "PDF/DOC faylı yükləyin"}
                  </p>
                  <p className="text-sm text-gray-500">və ya bura sürükləyin</p>
                </div>

                <Button
                  onClick={handleUploadCertificate}
                  disabled={selectedProductId === null || fileToUpload === null}
                  className="bg-blue-900 hover:bg-blue-800"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Yüklə
                </Button>
              </div>
            </div>

            {/* Certificate List */}
            <div className="bg-white border border-gray-200 p-8">
              <h2 className="text-gray-900 mb-6">
                Yüklənmiş Sertifikatlar (
                {products.find((p) => p.id === selectedProductId)?.name ||
                  "Məhsul seçilməyib"}
                )
              </h2>

              {loadingAttachments && (
                <div className="text-center py-5">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-600 mx-auto" />
                  <p className="text-gray-600">Sertifikatlar yüklənir...</p>
                </div>
              )}

              {attachmentError && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <AlertTriangle className="h-5 w-5 inline mr-2" />
                  {attachmentError}
                </div>
              )}

              {!loadingAttachments &&
                !attachmentError &&
                attachments.length > 0 && (
                  <div className="space-y-3">
                    {attachments.map((cert) => (
                      <div
                        key={cert.id}
                        className="flex items-center justify-between p-4 border border-gray-200"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileText className="w-6 h-6 text-blue-900 flex-shrink-0" />
                          <div>
                            <div className="text-gray-900 truncate">
                              {cert.fileName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {cert.type} -{" "}
                              {products.find((p) => p.id === cert.productId)
                                ?.name || "Məhsul yox"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-sm text-gray-500">
                            {new Date(cert.uploadDate).toLocaleDateString(
                              "az-AZ"
                            )}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteAttachment(cert.id)}
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              {!loadingAttachments &&
                !attachmentError &&
                attachments.length === 0 &&
                selectedProductId && (
                  <div className="text-center py-10 text-gray-500">
                    Seçilmiş məhsul üçün heç bir sertifikat tapılmadı.
                  </div>
                )}
            </div>
          </TabsContent>

          {/* Content Tab (Yenilənmiş Versiya) */}
          <TabsContent value="content" className="space-y-8">
            {/* --- Slayder İdarəetmə Paneli --- */}
            <div className="bg-white border border-gray-200 p-8 space-y-8">
              <h2 className="text-gray-900 mb-6 flex items-center">
                Slayder İdarəetmə Paneli
              </h2>

              {/* 2. Yeni Slayder Yüklə (POST /private/slider) */}
              <div className="border-b border-gray-200 pb-6 space-y-4">
                <h3 className="text-lg font-semibold text-green-700">
                  ➕ Yeni Slayder Əlavə Et
                </h3>

                <div>
                  <Label htmlFor="slider-title">Başlıq *</Label>
                  <Input
                    id="slider-title"
                    placeholder="Slayder Başlığı daxil edin"
                    value={newSliderData.title}
                    onChange={(e) =>
                      setNewSliderData({
                        ...newSliderData,
                        title: e.target.value,
                      })
                    }
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="slider-description">Təsvir *</Label>
                  <Textarea
                    id="slider-description"
                    rows={3}
                    placeholder="Slayder Təsvirini daxil edin"
                    value={newSliderData.description}
                    onChange={(e) =>
                      setNewSliderData({
                        ...newSliderData,
                        description: e.target.value,
                      })
                    }
                    className="mt-1.5"
                  />
                </div>

                {/* Slayder Şəkli Yükləmə Sahəsi */}
                <div className="border border-dashed border-gray-300 p-10 text-center hover:border-blue-900 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    id="file-upload-slider"
                    onChange={(e) =>
                      setNewSliderData({
                        ...newSliderData,
                        file: e.target.files ? e.target.files[0] : null,
                      })
                    }
                    className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
                    accept="image/*"
                  />
                  <UploadCloud className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    {newSliderData.file
                      ? `Seçilmiş Fayl: ${newSliderData.file.name}`
                      : "**Şəkil Faylı** (Image/PNG) yükləyin"}
                  </p>
                </div>

                <Button
                  onClick={handleCreateSlider}
                  disabled={
                    !newSliderData.title ||
                    !newSliderData.description ||
                    !newSliderData.file
                  }
                  className="bg-blue-900 hover:bg-blue-800 w-full"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  YÜKLƏ
                </Button>
              </div>

              {/* 3. Yüklənmiş Slayderlər Siyahısı (API Data ilə) */}
              <div className="pt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Yüklənmiş Slayderlər
                </h3>

                {/* Yüklənmə və Boş Siyahı Statusları */}
                {loadingSliders && (
                  <div className="text-center py-5">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-600 mx-auto" />
                    <p className="text-gray-600">Slayderlər yüklənir...</p>
                  </div>
                )}

                {!loadingSliders && sliders.length === 0 && (
                  <div className="text-center py-5 text-gray-500">
                    Heç bir slayder tapılmadı.
                  </div>
                )}
                {/* Slayder Siyahısı (API Data ilə map edilir) */}
                <div className="space-y-3">
                  {sliders.map((slider: any) => (
                    <div
                      key={slider.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <ImageIcon className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {slider.title}
                          </p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">
                            {slider.fileName || "Fayl adı yoxdur"} | ID: **
                            {slider.id}**
                          </p>
                          {/* Şəkilə baxmaq üçün link (Optional) */}
                          {slider.url && (
                            <a
                              href={slider.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-500 hover:underline block"
                            >
                              Şəkilə Bax
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 flex-shrink-0">
                        <span className="text-sm text-gray-400">
                          {/* API-dən gələn tarixdən istifadə edirik */}
                          {new Date(
                            slider.updatedAt || slider.createdAt
                          ).toLocaleDateString("az-AZ")}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:bg-red-100"
                          onClick={() => handleDeleteSlider(slider.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* --------------------- PARAMETRLƏR TABI --------------------- */}
          <TabsContent value="settings" className="space-y-8">
            <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-medium text-gray-900 mb-6">
                Ümumi Parametrlər
              </h2>

              {loadingCompanyInfo && (
                <div className="text-center py-10">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-600 mx-auto" />
                  <p className="text-gray-600 mt-2">Məlumatlar yüklənir...</p>
                </div>
              )}

              {companyInfoError && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
                  <AlertTriangle className="h-5 w-5 inline mr-2" />
                  {companyInfoError}
                </div>
              )}

              {!loadingCompanyInfo && !companyInfoError && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="settings-company">Şirkət Adı</Label>
                    <Input
                      id="settings-company"
                      value={settingsForm.companyName}
                      onChange={(e) =>
                        handleSettingsChange("companyName", e.target.value)
                      }
                      className="mt-1.5"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="settings-phone">Telefon</Label>
                      <Input
                        id="settings-phone"
                        value={settingsForm.phoneNumber}
                        onChange={(e) =>
                          handleSettingsChange("phoneNumber", e.target.value)
                        }
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="settings-email">Email</Label>
                      <Input
                        id="settings-email"
                        value={settingsForm.email}
                        onChange={(e) =>
                          handleSettingsChange("email", e.target.value)
                        }
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="settings-address">Ünvan</Label>
                    <Textarea
                      id="settings-address"
                      rows={3}
                      value={settingsForm.address}
                      onChange={(e) =>
                        handleSettingsChange("address", e.target.value)
                      }
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="settings-whatsapp">WhatsApp Nömrəsi</Label>
                    <Input
                      id="settings-whatsapp"
                      value={settingsForm.whatsappNumber}
                      onChange={(e) =>
                        handleSettingsChange("whatsappNumber", e.target.value)
                      }
                      className="mt-1.5"
                    />
                  </div>

                  <Button
                    onClick={handleSaveSettings}
                    disabled={savingCompanyInfo}
                    className="bg-blue-900 hover:bg-blue-800"
                  >
                    {savingCompanyInfo ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-5 w-5" />
                    )}
                    {savingCompanyInfo
                      ? "Yadda Saxlanılır..."
                      : "Parametrləri Yadda Saxla"}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
