import React from 'react'
import { Button } from '../ui/button'
import { toast } from "sonner";
import { extractToWords} from "@/utils/pdfgenerate";
interface BottomLeftContainerProps {
    activeSection: string,
}
const BottomLeftContainer: React.FC<BottomLeftContainerProps> = ({  activeSection}) => {
  console.log(activeSection)
  return (
    <div className="flex  pb-6">
        {/* <Button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold"
        >
          Send for approval
        </Button> */}
        <Button
        onClick={()=>toast.promise(extractToWords(), {
          loading: 'Generating pdf.',
          success: (data)=> data,
          error: (err)=>err.message
        })}
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold"
        >
          Extract to Words
        </Button>
      </div>
  )
}

export default BottomLeftContainer
