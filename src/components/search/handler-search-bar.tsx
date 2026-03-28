'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { MagnifyingGlass, MapPin, Trophy } from '@phosphor-icons/react'

const popularBreeds = [
  'Golden Retriever',
  'Labrador Retriever',
  'German Shepherd',
  'French Bulldog',
  'Poodle',
  'Beagle',
  'Yorkshire Terrier',
  'Boxer',
  'Dachshund',
  'Australian Shepherd',
]

const regions = [
  'Pacific Northwest',
  'California',
  'Western US',
  'Southwest',
  'Midwest',
  'Northeast',
  'Southeast',
  'Texas',
  'Florida',
  'Mid-Atlantic',
]

interface HandlerSearchBarProps {
  variant?: 'homepage' | 'page'
}

export function HandlerSearchBar({
  variant = 'homepage',
}: HandlerSearchBarProps) {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [breed, setBreed] = useState('')
  const [handlerLevel, setHandlerLevel] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location && location !== 'all') params.set('region', location)
    if (breed && breed !== 'all') params.set('breed', breed)
    if (handlerLevel && handlerLevel !== 'all')
      params.set('level', handlerLevel)
    if (searchTerm) params.set('search', searchTerm)

    router.push(`/handlers?${params.toString()}`)
  }

  if (variant === 'homepage') {
    return (
      <div className="mx-auto w-full">
        <div className="space-y-3">
          {/* Location */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="h-11 pl-10 text-sm">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any region</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Breed */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
              Breed Specialty
            </label>
            <div className="relative">
              <Trophy className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Select value={breed} onValueChange={setBreed}>
                <SelectTrigger className="h-11 pl-10 text-sm">
                  <SelectValue placeholder="Select breed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any breed</SelectItem>
                  {popularBreeds.map((breedOption) => (
                    <SelectItem key={breedOption} value={breedOption}>
                      {breedOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Handler Level filter hidden during launch */}

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            size="lg"
            className="w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 sm:text-base"
          >
            <MagnifyingGlass className="mr-2 size-4" />
            Search handlers
          </Button>
        </div>
      </div>
    )
  }

  // Page variant (simpler, horizontal)
  return (
    <div className="flex w-full gap-2">
      <Select value={location} onValueChange={setLocation}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any region</SelectItem>
          {regions.map((region) => (
            <SelectItem key={region} value={region}>
              {region}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={breed} onValueChange={setBreed}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Breed" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any breed</SelectItem>
          {popularBreeds.map((breedOption) => (
            <SelectItem key={breedOption} value={breedOption}>
              {breedOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex flex-1 gap-2">
        <Input
          type="text"
          placeholder="Search by name or keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1"
        />
        <Button onClick={handleSearch}>
          <MagnifyingGlass className="mr-2 size-4" />
          Search
        </Button>
      </div>
    </div>
  )
}
