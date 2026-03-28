'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
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

import { Plus } from '@phosphor-icons/react'
import { DogProfile, HandlerProfile, User } from '@prisma/client'
import { toast } from 'sonner'

interface BookingRequestFormProps {
  user: User
  handler?: (User & { handlerProfile: HandlerProfile | null }) | null
  dogProfiles?: DogProfile[]
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
  'Other',
]

export default function BookingRequestForm({
  user,
  handler,
  dogProfiles = [],
}: BookingRequestFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [handlerId, setHandlerId] = useState(handler?.id || '')
  const [selectedDogProfileId, setSelectedDogProfileId] = useState<
    string | 'manual'
  >('manual')
  const [useManualEntry, setUseManualEntry] = useState(dogProfiles.length === 0)

  const [formData, setFormData] = useState({
    showName: '',
    showLocation: '',
    showDate: '',
    dogName: '',
    dogBreed: '',
    message: '',
  })

  // Auto-fill form when a dog profile is selected
  useEffect(() => {
    if (selectedDogProfileId !== 'manual') {
      const selectedDog = dogProfiles.find(
        (dog) => dog.id === selectedDogProfileId
      )
      if (selectedDog) {
        setFormData((prev) => ({
          ...prev,
          dogName: selectedDog.name,
          dogBreed: selectedDog.breed,
          message: generateMessageFromProfile(selectedDog),
        }))
        setUseManualEntry(false)
      }
    } else {
      setUseManualEntry(true)
      // Clear dog fields when switching to manual
      setFormData((prev) => ({
        ...prev,
        dogName: '',
        dogBreed: '',
        message: '',
      }))
    }
  }, [selectedDogProfileId, dogProfiles])

  const generateMessageFromProfile = (dog: DogProfile): string => {
    let message = `Hi! I'd like to inquire about handling services for my ${dog.breed}, ${dog.name}.`

    if (dog.registeredName) {
      message += `\n\nRegistered Name: ${dog.registeredName}`
    }

    if (dog.titles) {
      message += `\nTitles: ${dog.titles}`
    }

    if (dog.showExperience) {
      message += `\nShow Experience: ${dog.showExperience.replace('_', ' ')}`
    }

    if (dog.temperament) {
      message += `\n\nTemperament: ${dog.temperament}`
    }

    if (dog.specialNeeds) {
      message += `\n\nSpecial Needs: ${dog.specialNeeds}`
    }

    if (dog.preferredHandlerTraits) {
      message += `\n\nPreferred Handler Traits: ${dog.preferredHandlerTraits}`
    }

    message += '\n\nLooking forward to hearing from you!'

    return message
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!handlerId) {
      toast.error('Please select a handler')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/booking-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          handlerId,
          dogProfileId:
            selectedDogProfileId !== 'manual' ? selectedDogProfileId : null,
          showDate: new Date(formData.showDate),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send booking request')
      }

      toast.success('Booking request sent successfully!')
      router.push('/dashboard/bookings')
    } catch (error) {
      toast.error('Failed to send booking request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Handler Selection */}
      {handler ? (
        <Card>
          <CardHeader>
            <CardTitle>Handler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="size-12">
                <AvatarImage
                  src={handler.image || undefined}
                  alt={handler.name || 'Handler'}
                />
                <AvatarFallback>
                  {handler.name?.charAt(0) || 'H'}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{handler.name}</div>
                {handler.handlerProfile && (
                  <div className="text-sm text-muted-foreground">
                    {handler.handlerProfile.city},{' '}
                    {handler.handlerProfile.state}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Select Handler</CardTitle>
            <CardDescription>
              Choose a handler for this booking request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="handler">Handler</Label>
              <div className="flex gap-2">
                <Input
                  id="handlerId"
                  placeholder="Handler ID (from profile URL)"
                  value={handlerId}
                  onChange={(e) => setHandlerId(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.push('/handlers')}
                >
                  Browse
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Visit a handler&apos;s profile and click &quot;Request
                Booking&quot; or paste their ID here
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Show Information */}
      <Card>
        <CardHeader>
          <CardTitle>Show Information</CardTitle>
          <CardDescription>Provide details about the dog show</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="showName">Show Name</Label>
            <Input
              id="showName"
              placeholder="Westminster Kennel Club Dog Show"
              value={formData.showName}
              onChange={(e) =>
                setFormData({ ...formData, showName: e.target.value })
              }
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="showLocation">Show Location</Label>
              <Input
                id="showLocation"
                placeholder="New York, NY"
                value={formData.showLocation}
                onChange={(e) =>
                  setFormData({ ...formData, showLocation: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="showDate">Show Date</Label>
              <Input
                id="showDate"
                type="date"
                value={formData.showDate}
                onChange={(e) =>
                  setFormData({ ...formData, showDate: e.target.value })
                }
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dog Selection */}
      {dogProfiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Dog</CardTitle>
            <CardDescription>
              Choose a saved dog profile or enter information manually
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dogProfile">Dog Profile</Label>
              <Select
                value={selectedDogProfileId}
                onValueChange={setSelectedDogProfileId}
              >
                <SelectTrigger id="dogProfile">
                  <SelectValue placeholder="Select a dog" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Enter manually</SelectItem>
                  {dogProfiles.map((dog) => (
                    <SelectItem key={dog.id} value={dog.id}>
                      {dog.name} - {dog.breed}
                      {dog.titles ? ` (${dog.titles})` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-muted-foreground">
                  Saved profiles auto-fill dog information
                </p>
                <Button type="button" variant="outline" size="sm" asChild>
                  <Link href="/dashboard/dogs/new">
                    <Plus className="mr-1 size-3" />
                    Add Dog
                  </Link>
                </Button>
              </div>
            </div>

            {selectedDogProfileId !== 'manual' && (
              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="text-sm">
                  <p className="font-semibold">Selected Profile:</p>
                  {dogProfiles
                    .filter((dog) => dog.id === selectedDogProfileId)
                    .map((dog) => (
                      <div key={dog.id} className="mt-2 space-y-1">
                        <p>
                          <span className="font-medium">Name:</span> {dog.name}
                        </p>
                        <p>
                          <span className="font-medium">Breed:</span>{' '}
                          {dog.breed}
                        </p>
                        <p>
                          <span className="font-medium">Age:</span> {dog.age}{' '}
                          years
                        </p>
                        {dog.titles && (
                          <p>
                            <span className="font-medium">Titles:</span>{' '}
                            {dog.titles}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Dog Information */}
      {dogProfiles.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Dog Information</CardTitle>
            <CardDescription>
              Tell the handler about your dog
              <div className="mt-2">
                <Button type="button" variant="outline" size="sm" asChild>
                  <Link href="/dashboard/dogs/new">
                    <Plus className="mr-1 size-3" />
                    Save as Dog Profile
                  </Link>
                </Button>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dogName">Dog&apos;s Name</Label>
                <Input
                  id="dogName"
                  placeholder="Champion"
                  value={formData.dogName}
                  onChange={(e) =>
                    setFormData({ ...formData, dogName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dogBreed">Breed</Label>
                <Select
                  value={formData.dogBreed}
                  onValueChange={(value) =>
                    setFormData({ ...formData, dogBreed: value })
                  }
                  required
                >
                  <SelectTrigger id="dogBreed">
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message to Handler</Label>
              <Textarea
                id="message"
                placeholder="Provide any additional information about your dog, special requirements, or questions for the handler..."
                rows={6}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Message Section - shown when using saved profile */}
      {selectedDogProfileId !== 'manual' && (
        <Card>
          <CardHeader>
            <CardTitle>Message to Handler</CardTitle>
            <CardDescription>
              Review and edit the auto-generated message
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={12}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
              <p className="text-sm text-muted-foreground">
                This message was auto-generated from your dog&apos;s profile.
                Feel free to edit it.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Booking Request'}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
