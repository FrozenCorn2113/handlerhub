'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

import { MapPin, Star } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'

interface HandlerCardProps {
  imageUrl: string
  name: string
  region: string
  rating: number
  reviewCount: number
  description: string
  breeds: string[]
  services: string[]
  price: string
  href: string
  className?: string
}

export function HandlerCard({
  imageUrl,
  name,
  region,
  rating,
  reviewCount,
  description,
  breeds,
  services,
  price,
  href,
  className,
}: HandlerCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  const detailVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      marginTop: '0.75rem',
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  }

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      className={cn('w-full max-w-sm cursor-pointer', className)}
    >
      <a href={href}>
        <Card className="overflow-hidden rounded-2xl border-gray-200 shadow-md">
          {/* Handler Photo */}
          <div className="relative h-44 w-full">
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            {/* Price badge */}
            <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-[#14472F] backdrop-blur-sm">
              {price}
            </div>
          </div>

          <div className="p-5">
            {/* Name + Region + Rating */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-[#14472F]">
                  {name}
                </h3>
                <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} weight="bold" />
                    {region}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={14} weight="fill" className="text-[#D4621A]" />
                    {rating} ({reviewCount})
                  </span>
                </div>
              </div>
            </div>

            {/* Animated description + breeds on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  key="details"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={detailVariants}
                  className="overflow-hidden"
                >
                  <p className="text-sm leading-relaxed text-gray-600">
                    {description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {breeds.map((breed) => (
                      <span
                        key={breed}
                        className="rounded-full bg-[#14472F]/10 px-2.5 py-0.5 text-xs font-medium text-[#14472F]"
                      >
                        {breed}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer: services */}
          <div className="flex items-center gap-2 border-t border-gray-100 px-5 py-3">
            {services.map((service) => (
              <Badge
                key={service}
                variant="secondary"
                className="border-0 bg-[#F8F4EE] text-xs text-[#14472F]"
              >
                {service}
              </Badge>
            ))}
          </div>
        </Card>
      </a>
    </motion.div>
  )
}
