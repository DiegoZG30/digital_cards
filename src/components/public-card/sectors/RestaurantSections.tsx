import { VideoSection } from "../VideoSection";

interface RestaurantSectionsProps {
  customData: Record<string, string>;
  videoUrl?: string | null;
  isPro?: boolean;
}

export function RestaurantSections({ customData, videoUrl, isPro = false }: RestaurantSectionsProps) {
  // Extract menu items from customData
  const menuItems = [
    { name: customData.menuItem1Name, desc: customData.menuItem1Desc, price: customData.menuItem1Price, image: customData.menuItem1Image },
    { name: customData.menuItem2Name, desc: customData.menuItem2Desc, price: customData.menuItem2Price, image: customData.menuItem2Image },
    { name: customData.menuItem3Name, desc: customData.menuItem3Desc, price: customData.menuItem3Price, image: customData.menuItem3Image },
  ].filter(item => item.name);

  // Extract hours from customData
  const hours = [
    { day: customData.hours1Day, time: customData.hours1Time, status: customData.hours1Status },
    { day: customData.hours2Day, time: customData.hours2Time, status: customData.hours2Status },
    { day: customData.hours3Day, time: customData.hours3Time, status: customData.hours3Status },
    { day: customData.hours4Day, time: customData.hours4Time, status: customData.hours4Status },
    { day: customData.hours5Day, time: customData.hours5Time, status: customData.hours5Status },
  ].filter(h => h.day);

  const menuSectionTitle = customData.menuSectionTitle || "Menú del Día";
  const hoursSectionTitle = customData.hoursSectionTitle || "Horarios";

  return (
    <div className="space-y-6">
      {/* Video Section */}
      {isPro && videoUrl && <VideoSection youtubeUrl={videoUrl} />}

      {/* Menu Section */}
      {menuItems.length > 0 && (
        <section className="px-6 py-6 bg-muted/30">
          <h2 className="text-lg font-semibold text-foreground mb-4 text-center">
            {menuSectionTitle}
          </h2>
          <div className="space-y-4">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-sm border border-border"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">{item.name}</h3>
                  {item.desc && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.desc}</p>
                  )}
                </div>
                {item.price && (
                  <span className="text-primary font-semibold flex-shrink-0">{item.price}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hours Section */}
      {hours.length > 0 && (
        <section className="px-6 py-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 text-center">
            {hoursSectionTitle}
          </h2>
          <div className="space-y-2">
            {hours.map((hour, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <span className="font-medium text-foreground">{hour.day}</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{hour.time}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      hour.status === "open" || hour.status === "Abierto"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {hour.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
