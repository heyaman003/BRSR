import React from 'react'
import { cn } from "@/lib/utils"
const topSections = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]
const Horizontalscroll = () => {
  return (
    <div>
      {/* Top Navigation */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 overflow-y-auto">
          {topSections.map((section) => (
            <button
              key={section}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap w-[120px]",
                "bg-[#16a34a] text-primary-foreground hover:bg-[#15803d]",
              )}
            >
              Section {section}
            </button>
          ))}
        </div>
    </div>
  )
}

export default Horizontalscroll
