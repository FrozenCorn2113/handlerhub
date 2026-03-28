import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

import { Star } from '@phosphor-icons/react/dist/ssr'
import { format } from 'date-fns'

interface ReviewCardProps {
  review: {
    id: string
    rating: number
    comment: string
    createdAt: Date
    exhibitor: {
      id: string
      name: string | null
      image: string | null
    }
    bookingRequest: {
      showName: string
      showDate: Date
      dogBreed: string
    }
  }
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Reviewer Info */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarImage
                  src={review.exhibitor.image || undefined}
                  alt={review.exhibitor.name || 'Exhibitor'}
                />
                <AvatarFallback>
                  {review.exhibitor.name?.charAt(0) || 'E'}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{review.exhibitor.name}</div>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(review.createdAt), 'MMM d, yyyy')}
                </div>
              </div>
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`size-4 ${
                    star <= review.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-1 text-sm font-medium">
                {review.rating}.0
              </span>
            </div>
          </div>

          {/* Review Comment */}
          <p className="text-sm leading-relaxed">{review.comment}</p>

          {/* Show Details */}
          <div className="border-t pt-3 text-sm text-muted-foreground">
            Show: {review.bookingRequest.showName} •{' '}
            {review.bookingRequest.dogBreed} •{' '}
            {format(new Date(review.bookingRequest.showDate), 'MMM yyyy')}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
