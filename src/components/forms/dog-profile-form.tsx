'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button-ui'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { DogProfile } from '@prisma/client'
import { toast } from 'sonner'

interface DogProfileFormProps {
  profile?: DogProfile | null
  mode?: 'create' | 'edit'
}

const dogBreeds = [
  'Golden Retriever',
  'Labrador Retriever',
  'German Shepherd',
  'French Bulldog',
  'Bulldog',
  'Poodle',
  'Beagle',
  'Rottweiler',
  'Yorkshire Terrier',
  'Boxer',
  'Dachshund',
  'Siberian Husky',
  'Great Dane',
  'Doberman Pinscher',
  'Australian Shepherd',
  'Border Collie',
  'Shih Tzu',
  'Boston Terrier',
  'Pomeranian',
  'Cavalier King Charles Spaniel',
  'Other',
]

export default function DogProfileForm({
  profile,
  mode = 'create',
}: DogProfileFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: profile?.name || '',
    breed: profile?.breed || '',
    sex: profile?.sex || '',
    age: profile?.age?.toString() || '',
    registeredName: profile?.registeredName || '',
    titles: profile?.titles || '',
    achievements: profile?.achievements || '',
    showExperience: profile?.showExperience || 'FIRST_TIMER',
    temperament: profile?.temperament || '',
    specialNeeds: profile?.specialNeeds || '',
    preferredHandlerTraits: profile?.preferredHandlerTraits || '',
    upcomingShows: profile?.upcomingShows || '',
    isActive: profile?.isActive ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url =
        mode === 'edit' && profile
          ? `/api/dog-profiles/${profile.id}`
          : '/api/dog-profiles'
      const method = mode === 'edit' ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save dog profile')
      }

      toast.success(
        mode === 'edit'
          ? 'Dog profile updated successfully!'
          : 'Dog profile created successfully!'
      )
      router.push('/dashboard/dogs')
      router.refresh()
    } catch (error) {
      toast.error('Failed to save dog profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Essential details about your dog for handlers to know
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Dog&apos;s Call Name *</Label>
              <Input
                id="name"
                placeholder="Max"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="registeredName">Registered Name (Optional)</Label>
              <Input
                id="registeredName"
                placeholder="CH MyKennel's Maximum Overdrive"
                value={formData.registeredName}
                onChange={(e) =>
                  setFormData({ ...formData, registeredName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="breed">Breed *</Label>
              <Select
                value={formData.breed}
                onValueChange={(value) =>
                  setFormData({ ...formData, breed: value })
                }
                required
              >
                <SelectTrigger id="breed">
                  <SelectValue placeholder="Select breed" />
                </SelectTrigger>
                <SelectContent>
                  {dogBreeds.map((breed) => (
                    <SelectItem key={breed} value={breed}>
                      {breed}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sex">Sex *</Label>
              <Select
                value={formData.sex}
                onValueChange={(value) =>
                  setFormData({ ...formData, sex: value })
                }
                required
              >
                <SelectTrigger id="sex">
                  <SelectValue placeholder="Select sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age (years) *</Label>
              <Input
                id="age"
                type="number"
                min="0"
                max="20"
                placeholder="3"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Titles & Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Titles & Achievements</CardTitle>
          <CardDescription>
            Show off your dog&apos;s accomplishments - handlers love working
            with champions!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titles">Titles</Label>
            <Input
              id="titles"
              placeholder="CH, GCH, GCHB, etc."
              value={formData.titles}
              onChange={(e) =>
                setFormData({ ...formData, titles: e.target.value })
              }
            />
            <p className="text-sm text-muted-foreground">
              List any conformation titles, performance titles, or
              certifications
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="achievements">Major Wins & Accomplishments</Label>
            <Textarea
              id="achievements"
              placeholder="Westminster Group Winner 2023, Multiple BOB wins, Regional Specialty Winner..."
              rows={4}
              value={formData.achievements}
              onChange={(e) =>
                setFormData({ ...formData, achievements: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Show Experience */}
      <Card>
        <CardHeader>
          <CardTitle>Show Experience</CardTitle>
          <CardDescription>
            Help handlers understand your dog&apos;s experience level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="showExperience">Experience Level *</Label>
            <Select
              value={formData.showExperience}
              onValueChange={(value) =>
                setFormData({ ...formData, showExperience: value })
              }
              required
            >
              <SelectTrigger id="showExperience">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FIRST_TIMER">
                  First-Timer (Never shown before)
                </SelectItem>
                <SelectItem value="BEGINNER">Beginner (1-5 shows)</SelectItem>
                <SelectItem value="INTERMEDIATE">
                  Intermediate (6-20 shows)
                </SelectItem>
                <SelectItem value="VETERAN">Veteran (20+ shows)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="upcomingShows">Upcoming Shows</Label>
            <Textarea
              id="upcomingShows"
              placeholder="Westminster KC - Feb 10-13, 2024&#10;Santa Barbara KC - June 3, 2024&#10;Golden Gate KC - Aug 15-16, 2024"
              rows={4}
              value={formData.upcomingShows}
              onChange={(e) =>
                setFormData({ ...formData, upcomingShows: e.target.value })
              }
            />
            <p className="text-sm text-muted-foreground">
              List any shows you&apos;re planning to attend - helps handlers
              coordinate
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Temperament & Special Needs */}
      <Card>
        <CardHeader>
          <CardTitle>Temperament & Special Needs</CardTitle>
          <CardDescription>
            Important information for handlers to work effectively with your dog
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="temperament">Temperament & Behavior Notes</Label>
            <Textarea
              id="temperament"
              placeholder="Friendly and outgoing, loves people. Can be shy around other male dogs. Responsive to treats and praise..."
              rows={4}
              value={formData.temperament}
              onChange={(e) =>
                setFormData({ ...formData, temperament: e.target.value })
              }
            />
            <p className="text-sm text-muted-foreground">
              Describe your dog&apos;s personality, how they interact with
              people and other dogs, any triggers or sensitivities
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialNeeds">
              Special Needs & Grooming Requirements
            </Label>
            <Textarea
              id="specialNeeds"
              placeholder="Requires daily medication for allergies at 8am. Needs gentle ear cleaning before showing. Sensitive to hot weather..."
              rows={4}
              value={formData.specialNeeds}
              onChange={(e) =>
                setFormData({ ...formData, specialNeeds: e.target.value })
              }
            />
            <p className="text-sm text-muted-foreground">
              Include medications, allergies, grooming quirks, dietary
              restrictions, etc.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Handler Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Handler Preferences (Optional)</CardTitle>
          <CardDescription>
            Specify any preferences for handler traits or experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="preferredHandlerTraits">
              Preferred Handler Characteristics
            </Label>
            <Textarea
              id="preferredHandlerTraits"
              placeholder="Prefer female handlers, breed specialist preferred, experience with nervous dogs helpful..."
              rows={3}
              value={formData.preferredHandlerTraits}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  preferredHandlerTraits: e.target.value,
                })
              }
            />
            <p className="text-sm text-muted-foreground">
              E.g., gender preference, breed specialization, handling style,
              etc.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading
            ? 'Saving...'
            : mode === 'edit'
              ? 'Update Profile'
              : 'Create Profile'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push('/dashboard/dogs')}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
