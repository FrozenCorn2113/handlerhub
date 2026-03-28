import {
  Bell,
  Briefcase,
  Calendar,
  CaretLeft,
  CaretRight,
  ChatCircle,
  ClockCounterClockwise,
  Dog,
  DotsThreeVertical,
  Envelope,
  FileText,
  Flag,
  Info,
  Lock,
  MagnifyingGlass,
  MapPin,
  PaperPlaneRight,
  Paperclip,
  Phone,
  ShareNetwork,
  Shield,
  ShieldCheck,
  Smiley,
  Star,
  Trophy,
  Trophy as TrophyIcon,
} from '@phosphor-icons/react/dist/ssr'

export const WebmakerIcons = {
  Award: Trophy,
  Bell,
  Briefcase,
  Calendar,
  ChevronLeft: CaretLeft,
  ChevronRight: CaretRight,
  Dog,
  FileText,
  Flag,
  History: ClockCounterClockwise,
  Info,
  Lock,
  Mail: Envelope,
  MapPin,
  MessageCircle: ChatCircle,
  MoreVertical: DotsThreeVertical,
  Paperclip,
  Phone,
  Search: MagnifyingGlass,
  Send: PaperPlaneRight,
  Shield,
  ShieldCheck,
  Share2: ShareNetwork,
  Smile: Smiley,
  Star,
  Trophy: TrophyIcon,
} as const

export interface WebmakerHandler {
  id: string
  name: string
  title: string
  rating: number
  reviewsCount: number
  location: string
  region: string
  avatar: string
  isVerified: boolean
  level: 'Master Handler' | 'Professional' | 'Junior Handler'
  specialties: string[]
  yearsExperience: number
  breedsCount: number
  winsCount: number
  description: string
}

export const WEBMAKER_SAMPLE_HANDLERS: WebmakerHandler[] = [
  {
    id: '1',
    name: 'Marcus Thorne',
    title: 'AKC Registered Handler',
    rating: 4.9,
    reviewsCount: 82,
    location: 'PA',
    region: 'Northeast Region',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDXCxt6bTDL5-q9WRj4oahqIKXixOIjWZdzOABfXWSrqvsALib21r6pNR6W3-XiPYqA4QSNjZ9LR7KiRGDPW6YGUJdw0yKB8K4FcU6uSDWyrt1OiV4lMBlEPEFT2PNbAAwacJWqWI3i0pwMzGunwSX2UWZ3iiufeUgjaoNP2MouZMIFOF4johVG4zld_z0sxKIGVTBEXRT4oyqn5ApKweRk2oJ165nOfAn3MzV-DjjmNY9iP1p2SEbo4y1W0PVL7zG2Ol5eWEsKsQ',
    isVerified: true,
    level: 'Master Handler',
    specialties: ['Golden Retrievers', 'Boxers'],
    yearsExperience: 20,
    breedsCount: 45,
    winsCount: 300,
    description:
      'Expertise across all seven show groups with a focus on working dogs.',
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    title: 'Professional AKC All-Breed Handler',
    rating: 4.7,
    reviewsCount: 124,
    location: 'CT',
    region: 'Northeast Region',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDLBktDYS2Es1yKb7ffgoH_W662zzKxFjWGHeRXaZxCut4AFaiJ4MSucPHxW813ov9LMjFloYMCwe9wdhEta1_i-IHVGNDIgtkKS4xYZIiZbyHxtofdz0suUv4_nRik3z_ecPvX0mNLaHlOg142nyUfPHjiMYY-9R5ZiiFlQ1C95mVYAA1ekdSabFKIf3iTLFswac5X2-ikMwDYPd4VrOFH-tavLHeAfOKILu9bfouxhrL8FsmNXVTDLJUElwGcqqsoLreQmDXOog',
    isVerified: true,
    level: 'Professional',
    specialties: ['Sporting', 'Working', 'Herding'],
    yearsExperience: 15,
    breedsCount: 82,
    winsCount: 450,
    description:
      'Specializing in Sporting and Working groups, she brings a focus on meticulous grooming and strategic ring presentation.',
  },
]
