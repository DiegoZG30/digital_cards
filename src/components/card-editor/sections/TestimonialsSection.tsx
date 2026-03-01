import { useState } from "react";
import { Plus, Star, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useCardData } from "@/hooks/useCardData";

const MAX_QUOTE_CHARS = 240;
const MAX_TESTIMONIALS = 8;

export function TestimonialsSection() {
  const { cardData, addTestimonial, updateTestimonial, removeTestimonial, updateReviewUrl } = useCardData();
  const testimonials = cardData.testimonials || [];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    content: "",
    rating: 5,
  });

  const openAddDialog = () => {
    setEditingIndex(null);
    setFormData({ name: "", content: "", rating: 5 });
    setIsDialogOpen(true);
  };

  const openEditDialog = (index: number) => {
    const t = testimonials[index];
    setEditingIndex(index);
    setFormData({
      name: t.name,
      content: t.content,
      rating: t.rating,
    });
    setIsDialogOpen(true);
  };

  const saveTestimonial = () => {
    if (!formData.name.trim() || !formData.content.trim()) return;

    if (editingIndex !== null) {
      updateTestimonial(editingIndex, {
        name: formData.name,
        content: formData.content,
        rating: formData.rating,
      });
    } else {
      addTestimonial({
        name: formData.name,
        content: formData.content,
        rating: formData.rating,
      });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (index: number) => {
    removeTestimonial(index);
  };

  const canAddMore = testimonials.length < MAX_TESTIMONIALS;

  return (
    <div className="space-y-4">
      {/* Counter */}
      <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
        <span className="text-xs text-muted-foreground">Testimonios</span>
        <span className={`text-xs font-medium ${testimonials.length >= MAX_TESTIMONIALS ? 'text-destructive' : 'text-foreground'}`}>
          {testimonials.length}/{MAX_TESTIMONIALS}
        </span>
      </div>

      {/* Leave Review URL */}
      <div className="space-y-2">
        <Label htmlFor="leaveReview" className="text-foreground text-sm">
          URL para dejar review (Google Business)
        </Label>
        <Input
          id="leaveReview"
          placeholder="https://g.page/r/..."
          value={cardData.reviewUrl || ""}
          onChange={(e) => updateReviewUrl(e.target.value)}
          className="bg-background border-border"
        />
        <p className="text-xs text-muted-foreground">
          Los visitantes podrán dejarte una reseña en Google
        </p>
      </div>

      {/* Testimonials List */}
      {testimonials.length > 0 && (
        <div className="space-y-2">
          <Label className="text-foreground text-sm">Reviews manuales</Label>
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background border-border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? "text-primary fill-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-foreground mb-2 line-clamp-2">
                      "{testimonial.content}"
                    </p>
                    <p className="text-xs text-muted-foreground">
                      — {testimonial.name}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => openEditDialog(index)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Button 
        variant="gold-outline" 
        size="sm" 
        className="w-full" 
        onClick={openAddDialog}
        disabled={!canAddMore}
      >
        <Plus className="w-4 h-4 mr-2" />
        Agregar testimonio
      </Button>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingIndex !== null ? "Editar testimonio" : "Agregar testimonio"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="author" className="text-foreground">Nombre del autor</Label>
              <Input
                id="author"
                placeholder="Nombre del cliente"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="quote" className="text-foreground">Testimonio</Label>
                <span className={`text-xs ${formData.content.length >= MAX_QUOTE_CHARS ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {formData.content.length}/{MAX_QUOTE_CHARS}
                </span>
              </div>
              <Textarea
                id="quote"
                placeholder="Escribe el testimonio..."
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  content: e.target.value.slice(0, MAX_QUOTE_CHARS) 
                }))}
                className="bg-background border-border min-h-[80px] resize-none"
                maxLength={MAX_QUOTE_CHARS}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Calificación</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= formData.rating
                          ? "text-primary fill-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              variant="gold" 
              onClick={saveTestimonial}
              disabled={!formData.name.trim() || !formData.content.trim()}
            >
              {editingIndex !== null ? "Guardar cambios" : "Agregar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
