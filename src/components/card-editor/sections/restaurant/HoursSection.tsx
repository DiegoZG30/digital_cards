import { Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCardData } from "@/hooks/useCardData";

export function HoursSection() {
  const { cardData, updateField } = useCardData();

  const hoursRows = [
    { dayKey: "hours1Day", timeKey: "hours1Time", statusKey: "hours1Status", num: 1 },
    { dayKey: "hours2Day", timeKey: "hours2Time", statusKey: "hours2Status", num: 2 },
    { dayKey: "hours3Day", timeKey: "hours3Time", statusKey: "hours3Status", num: 3 },
    { dayKey: "hours4Day", timeKey: "hours4Time", statusKey: "hours4Status", num: 4 },
    { dayKey: "hours5Day", timeKey: "hours5Time", statusKey: "hours5Status", num: 5 },
  ];

  const getValue = (key: string): string => {
    return ((cardData as Record<string, unknown>)[key] as string) || "";
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-foreground flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          Horarios de atención
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Configura los horarios de tu restaurante
        </p>
      </div>

      {/* Section Title */}
      <div className="space-y-2">
        <Label htmlFor="hoursSectionTitle" className="text-foreground">
          Título de la sección
        </Label>
        <Input
          id="hoursSectionTitle"
          placeholder="Hours"
          value={getValue("hoursSectionTitle")}
          onChange={(e) => updateField("hoursSectionTitle", e.target.value)}
          className="bg-background border-border"
        />
      </div>

      {/* Hours Rows */}
      <div className="space-y-2">
        {hoursRows.map((row) => (
          <div key={row.num} className="grid grid-cols-12 gap-2 items-center">
            <Input
              placeholder={row.num === 1 ? "Monday - Thursday" : row.num === 5 ? "Holidays" : "Day"}
              value={getValue(row.dayKey)}
              onChange={(e) => updateField(row.dayKey, e.target.value)}
              className="bg-background border-border col-span-4 h-9 text-sm"
            />
            <Input
              placeholder="11:00 AM - 10:00 PM"
              value={getValue(row.timeKey)}
              onChange={(e) => updateField(row.timeKey, e.target.value)}
              className="bg-background border-border col-span-5 h-9 text-sm"
            />
            <Select
              value={getValue(row.statusKey) || "open"}
              onValueChange={(value) => updateField(row.statusKey, value)}
            >
              <SelectTrigger className="col-span-3 h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Abierto
                  </span>
                </SelectItem>
                <SelectItem value="closed">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Cerrado
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
}
