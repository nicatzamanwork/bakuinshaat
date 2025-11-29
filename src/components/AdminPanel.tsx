import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  FileText, 
  Package, 
  Settings,
  Save
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Product {
  id: number;
  name: string;
  category: string;
  status: 'active' | 'draft';
}

export function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'İnşaat Armaturu A400', category: 'Armatur', status: 'active' },
    { id: 2, name: 'Elektrik Qaynaq Borusu', category: 'Borular', status: 'active' },
    { id: 3, name: 'Polad Lövhələr', category: 'Polad', status: 'draft' },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    description: '',
    standards: '',
    specifications: '',
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Məhsul əlavə edildi!');
    setNewProduct({
      name: '',
      category: '',
      description: '',
      standards: '',
      specifications: '',
    });
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Məhsul silindi');
  };

  const handleUploadCertificate = () => {
    toast.success('Sertifikat yükləndi');
  };

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
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-category">Kateqoriya *</Label>
                    <Input
                      id="product-category"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
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
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    rows={3}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="product-standards">Standartlar (vergüllə ayırın)</Label>
                  <Input
                    id="product-standards"
                    value={newProduct.standards}
                    onChange={(e) => setNewProduct({ ...newProduct, standards: e.target.value })}
                    placeholder="GOST 5781-82, DSTU 3760:2006, AZS 012-2019"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="product-specs">Texniki Xüsusiyyətlər (JSON format)</Label>
                  <Textarea
                    id="product-specs"
                    value={newProduct.specifications}
                    onChange={(e) => setNewProduct({ ...newProduct, specifications: e.target.value })}
                    rows={4}
                    placeholder='{"diameter": "6-32mm", "length": "6m, 11.7m"}'
                    className="mt-1.5 font-mono text-sm"
                  />
                </div>

                <Button type="submit" className="bg-blue-900 hover:bg-blue-800">
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
                        <div className="text-sm text-gray-500">{product.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                        {product.status === 'active' ? 'Aktiv' : 'Qaralama'}
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
                  <Label htmlFor="cert-product">Məhsul seç</Label>
                  <select 
                    id="cert-product"
                    className="w-full mt-1.5 h-10 px-3 border border-gray-300 rounded-md"
                  >
                    <option>İnşaat Armaturu A400</option>
                    <option>Elektrik Qaynaq Borusu</option>
                    <option>Polad Lövhələr</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="cert-type">Sertifikat növü</Label>
                  <Input
                    id="cert-type"
                    placeholder="ISO 9001, GOST Certificate, Test Report"
                    className="mt-1.5"
                  />
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-900 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">PDF faylı yükləyin</p>
                  <p className="text-sm text-gray-500">və ya bura sürükləyin</p>
                </div>

                <Button 
                  onClick={handleUploadCertificate}
                  className="bg-blue-900 hover:bg-blue-800"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Yüklə
                </Button>
              </div>
            </div>

            {/* Certificate List */}
            <div className="bg-white border border-gray-200 p-8">
              <h2 className="text-gray-900 mb-6">Yüklənmiş Sertifikatlar</h2>
              <div className="space-y-3">
                {[
                  { name: 'ISO-9001.pdf', product: 'İnşaat Armaturu A400', date: '2024-01-15' },
                  { name: 'GOST-Certificate.pdf', product: 'İnşaat Armaturu A400', date: '2024-01-10' },
                  { name: 'Test-Report.pdf', product: 'Elektrik Qaynaq Borusu', date: '2024-01-05' },
                ].map((cert, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-200">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-blue-900" />
                      <div>
                        <div className="text-gray-900">{cert.name}</div>
                        <div className="text-sm text-gray-500">{cert.product}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">{cert.date}</span>
                      <Button variant="ghost" size="sm">
                        <Trash2 size={16} className="text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-8">
            <div className="bg-white border border-gray-200 p-8">
              <h2 className="text-gray-900 mb-6">Səhifə Məzmunu Redaktə Et</h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="content-section">Bölmə seç</Label>
                  <select 
                    id="content-section"
                    className="w-full mt-1.5 h-10 px-3 border border-gray-300 rounded-md"
                  >
                    <option>Ana Səhifə - Hero</option>
                    <option>Haqqımızda - Missiya</option>
                    <option>Haqqımızda - Vizyon</option>
                    <option>Əlaqə - Ünvan</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="content-title">Başlıq</Label>
                  <Input
                    id="content-title"
                    defaultValue="Yüksək Keyfiyyətli Metal Məhsullarının İstehsalı"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="content-text">Mətn</Label>
                  <Textarea
                    id="content-text"
                    rows={6}
                    defaultValue="Müasir texnologiyalar və beynəlxalq standartlar əsasında armaturu, boru və polad məhsulların istehsalı. Avropa dəqiqliyi ilə industrial həllər."
                    className="mt-1.5"
                  />
                </div>

                <Button className="bg-blue-900 hover:bg-blue-800">
                  <Save className="mr-2 h-5 w-5" />
                  Dəyişiklikləri Yadda Saxla
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-8">
            <div className="bg-white border border-gray-200 p-8">
              <h2 className="text-gray-900 mb-6">Ümumi Parametrlər</h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="settings-company">Şirkət Adı</Label>
                  <Input
                    id="settings-company"
                    defaultValue="Metal Steel Industrial Group"
                    className="mt-1.5"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="settings-phone">Telefon</Label>
                    <Input
                      id="settings-phone"
                      defaultValue="+994 12 123 45 67"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="settings-email">Email</Label>
                    <Input
                      id="settings-email"
                      defaultValue="info@metalsteel.az"
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="settings-address">Ünvan</Label>
                  <Textarea
                    id="settings-address"
                    rows={3}
                    defaultValue="Bakı, Azərbaycan, Sumqayıt yolu, km 25, Metal Steel Industrial Complex"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="settings-whatsapp">WhatsApp Nömrəsi</Label>
                  <Input
                    id="settings-whatsapp"
                    defaultValue="+994501234567"
                    className="mt-1.5"
                  />
                </div>

                <Button className="bg-blue-900 hover:bg-blue-800">
                  <Save className="mr-2 h-5 w-5" />
                  Parametrləri Yadda Saxla
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
