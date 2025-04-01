import React from 'react'
import { Button } from '../ui/button'
import { toast } from "sonner";
import {extractToPdf} from "@/utils/pdfgenerate";
interface BottomLeftContainerProps {
    activeSection: string,
}
const BottomLeftContainer: React.FC<BottomLeftContainerProps> = ({  activeSection}) => {
  return (
    <div className="flex gap-4 pb-6">
        <Button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          Send for approval
        </Button>
        <Button
        onClick={()=>toast.promise(extractToPdf(activeSection), {
          loading: 'Generating pdf.',
          success: (data)=> data,
          error: (err)=>err.message
        })}
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          Extract to PDF
        </Button>
      </div>
  )
}

export default BottomLeftContainer
