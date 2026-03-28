export interface Handler {
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

export interface Review {
  id: string
  author: string
  role: string
  rating: number
  text: string
  date: string
  breed: string
  avatar: string
}

export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
  isMe: boolean
  attachment?: {
    name: string
    size: string
    type: 'pdf' | 'docx'
  }
}

export interface Conversation {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  avatar: string
  status: 'Inquiry' | 'Negotiating' | 'Booked'
  unread?: boolean
}
