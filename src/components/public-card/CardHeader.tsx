import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CardHeaderProps {
  coverImage?: string;
  profileImage?: string;
  fullName: string;
  jobTitle?: string;
  bio?: string;
}

export function CardHeader({
  coverImage,
  profileImage,
  fullName,
  jobTitle,
  bio,
}: CardHeaderProps) {
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-48 w-full overflow-hidden bg-gradient-to-br from-card to-muted">
        {coverImage && (
          <img
            src={coverImage}
            alt="Cover"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Profile Section */}
      <div className="relative px-6 pb-6">
        {/* Profile Photo */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            <AvatarImage src={profileImage} alt={fullName} />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Name and Info */}
        <div className="pt-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">{fullName}</h1>
          {jobTitle && (
            <p className="mt-1 text-lg text-primary font-medium">{jobTitle}</p>
          )}
          {bio && (
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto line-clamp-3">
              {bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
