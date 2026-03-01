interface RealEstateSectionsProps {
  customData: Record<string, string>;
  services: Array<{ icon: string; name: string }>;
  isPro?: boolean;
}

export function RealEstateSections({ customData, services, isPro = false }: RealEstateSectionsProps) {
  // Extract listings from customData
  const listings = [
    { image: customData.listing1Image, price: customData.listing1Price },
    { image: customData.listing2Image, price: customData.listing2Price },
    { image: customData.listing3Image, price: customData.listing3Price },
    { image: customData.listing4Image, price: customData.listing4Price },
  ].filter(l => l.image);

  // Extract stats from customData
  const stats = [
    { value: customData.stat1Value, label: customData.stat1Label },
    { value: customData.stat2Value, label: customData.stat2Label },
    { value: customData.stat3Value, label: customData.stat3Label },
  ].filter(s => s.value);

  const servicesSectionTitle = customData.servicesSectionTitle || "Servicios";
  const gallerySectionTitle = customData.gallerySectionTitle || "Propiedades Destacadas";

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      {stats.length > 0 && (
        <section className="px-6 py-6 bg-primary/5">
          <div className="grid grid-cols-3 gap-4 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Listings Section */}
      {listings.length > 0 && isPro && (
        <section className="px-6 py-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 text-center">
            {gallerySectionTitle}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {listings.map((listing, index) => (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden aspect-[4/3] group"
              >
                <img
                  src={listing.image}
                  alt={`Propiedad ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {listing.price && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <span className="text-white font-semibold text-sm">{listing.price}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Services Section */}
      {services.length > 0 && (
        <section className="px-6 py-6 bg-muted/30">
          <h2 className="text-lg font-semibold text-foreground mb-4 text-center">
            {servicesSectionTitle}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-card rounded-lg p-3 border border-border"
              >
                <i className={`fas ${service.icon} text-primary`} />
                <span className="text-sm text-foreground">{service.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
