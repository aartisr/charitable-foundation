import {
  Star,
  Shield,
  Zap,
  Check,
  Heart,
  Globe,
  Code,
  Palette,
  Briefcase,
  Users,
  Clock,
  Award,
  Target,
  TrendingUp,
  Settings,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  star: Star,
  shield: Shield,
  zap: Zap,
  check: Check,
  heart: Heart,
  globe: Globe,
  code: Code,
  palette: Palette,
  briefcase: Briefcase,
  users: Users,
  clock: Clock,
  award: Award,
  target: Target,
  "trending-up": TrendingUp,
  settings: Settings,
  "message-circle": MessageCircle,
};

export function Icon({
  name,
  size = 24,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const LucideIcon = icons[name.toLowerCase()];
  if (!LucideIcon) {
    return <span className={className}>{name}</span>;
  }
  return <LucideIcon size={size} className={className} />;
}
