// import Link from "next/link"
import { Leaf, Recycle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white p-4 text-center">
      <div className="mx-auto max-w-md space-y-6">
        {/* Sustainability icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <Leaf className="h-12 w-12 text-green-600" />
        </div>

        {/* Error message */}
        <h1 className="text-4xl font-bold tracking-tight text-green-800 sm:text-5xl">404</h1>
        <h2 className="text-xl font-medium text-green-700">Page Not Found</h2>

        <p className="text-muted-foreground">
          We couldn't find the page you're looking for. Like sustainable resources, some pages aren't renewable once
          they're gone.
        </p>

        {/* Recycling illustration */}
        <div className="flex justify-center py-4">
          <div className="relative">
            <Recycle className="h-16 w-16 animate-pulse text-green-500 opacity-30" />
            <Recycle className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform text-green-600" />
          </div>
        </div>
      </div>
    </div>
  )
}
