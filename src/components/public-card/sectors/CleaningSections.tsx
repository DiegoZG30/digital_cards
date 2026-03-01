import { ImageGallery } from "../ImageGallery";

interface CleaningSectionsProps {
  customData: Record<string, string>;
  services: Array<{ icon: string; name: string }>;
  gallery?: Array<{ id: string; url: string }>;
  isPro?: boolean;
}

export function CleaningSections({ customData, services, gallery, isPro = false }: CleaningSectionsProps) {
  const servicesSectionTitle = customData.servicesSectionTitle || "Nuestros Servicios";
  const gallerySectionTitle = customData.gallerySectionTitle || "Antes y Después";

  // Extract individual services from customData if profile services not available
  const fallbackServices = [
    customData.service1Name,
    customData.service2Name,
    customData.service3Name,
    customData.service4Name,
    customData.service5Name,
    customData.service6Name,
    customData.service7Name,
    customData.service8Name,
    customData.service9Name,
  ].filter(Boolean);

  const displayServices = services.length > 0 
    ? services 
    : fallbackServices.map(name => ({ icon: "fa-broom", name }));

  // Extract certifications
  const certifications = [
    { icon: customData.cert1Icon, line1: customData.cert1Line1, line2: customData.cert1Line2 },
    { icon: customData.cert2Icon, line1: customData.cert2Line1, line2: customData.cert2Line2 },
    { icon: customData.cert3Icon, line1: customData.cert3Line1, line2: customData.cert3Line2 },
  ].filter(c => c.line1);

  return (
    <div className="space-y-6">
      {/* Emergency 24/7 Badge (if applicable) */}
      {customData.emergencyAvailable && (
        <section className="px-6">
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-center">
            <span className="text-destructive font-semibold">
              ⚡ Servicio de Emergencia 24/7
            </span>
          </div>
        </section>
      )}

      {/* Services Grid */}
      {displayServices.length > 0 && (
        <section className="px-6 py-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 text-center">
            {servicesSectionTitle}
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {displayServices.slice(0, 9).map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 bg-card rounded-xl border border-border hover:border-primary transition-colors"
              >
                <i className={`fas ${typeof service === "string" ? "fa-broom" : service.icon} text-primary text-xl mb-2`} />
                <span className="text-xs text-foreground font-medium line-clamp-2">
                  {typeof service === "string" ? service : service.name}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && isPro && (
        <section className="px-6 py-6 bg-muted/30">
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-card rounded-lg px-4 py-3 border border-border"
              >
                {cert.icon && <i className={`fas ${cert.icon} text-primary text-lg`} />}
                <div>
                  <div className="font-medium text-foreground text-sm">{cert.line1}</div>
                  {cert.line2 && (
                    <div className="text-xs text-muted-foreground">{cert.line2}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Before/After Gallery */}
      {isPro && gallery && gallery.length > 0 && (
        <section className="py-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 text-center px-6">
            {gallerySectionTitle}
          </h2>
          <ImageGallery images={gallery} />
        </section>
      )}
    </div>
  );
}
