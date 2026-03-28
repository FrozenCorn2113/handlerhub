interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  // Pages under (marketing) render their own header/footer
  return <>{children}</>
}
