interface ServiceCardProps {
  name: string
  price: number
  pricePer: string
  description: string
}

export function ServiceCard({
  name,
  price,
  pricePer,
  description,
}: ServiceCardProps) {
  const formattedPrice = `$${(price / 100).toFixed(0)}`

  return (
    <div className="rounded-lg border border-tan bg-white p-5">
      <p className="font-sans text-sm font-semibold text-ringside-black">
        {name}
      </p>
      <p className="mt-1 font-sans text-lg font-semibold text-paddock-green">
        {formattedPrice}
        <span className="text-sm font-normal text-warm-gray">/{pricePer}</span>
      </p>
      <p className="mt-2 font-sans text-xs leading-relaxed text-warm-brown">
        {description}
      </p>
    </div>
  )
}
