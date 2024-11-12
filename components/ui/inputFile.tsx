import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const InputFile = () => {
  return (
    <div className="grid w-full max-w-auto items-center gap-1.5 cursor-pointer">
      <Label htmlFor="picture">Picture</Label>
      <div className="w-full relative bg-gray-100 rounded cursor-pointer">
        <input
          id="picture"
          type="file"
          className="cursor-pointer absolute opacity-0 w-full"
        />
        <Button variant="outline" className="w-full h-[40px] cursor-pointer rounded-[10px] color-gray">
          Click to upload photo
        </Button>
      </div>
    </div>
  )
}

export default InputFile
