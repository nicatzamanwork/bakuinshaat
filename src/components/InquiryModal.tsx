import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface InquiryModalProps {
  open: boolean;
  onClose: () => void;
  productName?: string;
}

export function InquiryModal({ open, onClose, productName }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: productName || '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    toast.success('Sorğunuz uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.');
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      product: '',
      message: '',
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Sorğu göndər</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Ad, Soyad *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="company">Şirkət</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="phone">Telefon *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="product">Məhsul</Label>
            <Input
              id="product"
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="message">Mesaj *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={4}
              className="mt-1.5"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Ləğv et
            </Button>
            <Button type="submit" className="flex-1 bg-blue-900 hover:bg-blue-800">
              Göndər
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
