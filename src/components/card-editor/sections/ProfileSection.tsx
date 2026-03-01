import { useState, useRef } from "react";
import { User, Upload, Loader2, X, Link2 } from "lucide-react";
import { DebouncedInput } from "@/components/ui/debounced-input";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCardData } from "@/hooks/useCardData";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { profileSchema, slugSchema, formatSlug, getValidationError } from "@/lib/validations";

export function ProfileSection() {
  const { cardData, updateProfile, updateField, updateSlug, selectedSector } = useCardData();
  const { profile, slug } = cardData;
  const { user } = useAuth();
  
  // Show badge field only for restaurant sector
  const showCuisineBadge = selectedSector === "restaurant";
  
  const [isUploadingProfile, setIsUploadingProfile] = useState(false);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Solo se permiten archivos de imagen");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen debe ser menor a 5MB");
      return;
    }

    setIsUploadingProfile(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/profile-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("card-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("card-images")
        .getPublicUrl(fileName);

      if (urlData?.publicUrl) {
        // Add cache-busting query param
        const versionedUrl = `${urlData.publicUrl}?v=${Date.now()}`;
        updateProfile("profileImage", versionedUrl);
        toast.success("Foto de perfil subida");
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
      toast.error("Error al subir la imagen");
    } finally {
      setIsUploadingProfile(false);
      if (profileInputRef.current) {
        profileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveProfileImage = () => {
    updateProfile("profileImage", "");
  };

  return (
    <div className="space-y-4">
      {/* Profile Photo */}
      <div className="space-y-2">
        <Label className="text-foreground">Foto de perfil / Logo</Label>
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center overflow-hidden group">
            {profile.profileImage ? (
              <>
                <img 
                  src={profile.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full"
                />
                <button
                  onClick={handleRemoveProfileImage}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </>
            ) : (
              <User className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <input
            ref={profileInputRef}
            type="file"
            accept="image/*"
            onChange={handleProfileImageUpload}
            className="hidden"
          />
          <Button 
            variant="gold-outline" 
            size="sm"
            onClick={() => profileInputRef.current?.click()}
            disabled={isUploadingProfile || !user}
          >
            {isUploadingProfile ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Subir foto
              </>
            )}
          </Button>
        </div>
        {!user && (
          <p className="text-xs text-destructive">
            Debes iniciar sesión para subir imágenes
          </p>
        )}
      </div>

      {/* Slug / URL de la tarjeta */}
      <div className="space-y-2">
        <Label htmlFor="slug" className="text-foreground flex items-center gap-2">
          <Link2 className="w-4 h-4" />
          URL de tu tarjeta
        </Label>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm whitespace-nowrap">
            tudominio.com/
          </span>
          <Input
            id="slug"
            placeholder="tu-nombre"
            className="bg-background border-border flex-1"
            value={slug || ""}
            onChange={(e) => {
              const formatted = formatSlug(e.target.value);
              updateSlug(formatted);
            }}
            onBlur={() => {
              if (slug) {
                const error = getValidationError(slugSchema, slug);
                if (error) {
                  toast.error(error);
                }
              }
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Solo letras minúsculas, números y guiones. Ej: juan-garcia
        </p>
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-foreground">
          Nombre completo <span className="text-destructive">*</span>
        </Label>
        <DebouncedInput
          id="fullName"
          placeholder="Tu nombre completo"
          className="bg-background border-border"
          value={profile.fullName}
          onValueChange={(value) => {
            const error = getValidationError(profileSchema.shape.fullName, value);
            if (error) {
              toast.error(error);
              return;
            }
            updateProfile("fullName", value);
          }}
          debounceMs={300}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="company" className="text-foreground">Empresa (opcional)</Label>
        <DebouncedInput
          id="company"
          placeholder="Nombre de tu empresa"
          className="bg-background border-border"
          value={profile.company}
          onValueChange={(value) => {
            const error = getValidationError(profileSchema.shape.company, value);
            if (error) {
              toast.error(error);
              return;
            }
            updateProfile("company", value);
          }}
          debounceMs={300}
        />
      </div>

      {/* Job Title */}
      <div className="space-y-2">
        <Label htmlFor="jobTitle" className="text-foreground">Título / Cargo (opcional)</Label>
        <DebouncedInput
          id="jobTitle"
          placeholder="Ej: Director de Marketing"
          className="bg-background border-border"
          value={profile.title}
          onValueChange={(value) => {
            const error = getValidationError(profileSchema.shape.title, value);
            if (error) {
              toast.error(error);
              return;
            }
            updateProfile("title", value);
          }}
          debounceMs={300}
        />
      </div>

      {/* Cuisine Badge - Only for Restaurant sector */}
      {showCuisineBadge && (
        <div className="space-y-2">
          <Label htmlFor="cuisineBadge" className="text-foreground">
            Tipo de cocina (badge)
          </Label>
          <DebouncedInput
            id="cuisineBadge"
            placeholder="Ej: French Cuisine, Mexican Food, Italian..."
            className="bg-background border-border"
            value={(cardData.cuisineBadge as string) || ""}
            onValueChange={(value) => updateField("cuisineBadge", value)}
            debounceMs={300}
          />
          <p className="text-xs text-muted-foreground">
            Se muestra como badge debajo de tu título
          </p>
        </div>
      )}
    </div>
  );
}
