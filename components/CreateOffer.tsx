"use client"

import { z } from "zod"
import { format } from "date-fns"

// Import Components
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import { Input } from "@components/ui/input"
import { Button } from '@components/ui/button'
import { Calendar } from "@components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover"
import { Card, CardContent, CardHeader } from '@components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'

// Import Hooks
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// Import Utils
import { cn } from "../lib/utils"

// Import Icons
import { CalendarIcon } from "lucide-react"
import { Textarea } from '@/components/ui/textarea'

const MAX_FILE_SIZE = 500000000 
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

// Declare Schema
const createOfferSchema = z.object({
  retailerName: z.string().min(2).max(50).optional(),
  latLng: z.string().min(2).max(50).optional(),
  offerType: z.enum(["restaurant", "saloon", "shop", "other"]),
  startDate: z.date(),
  endDate: z.date(),
  photo: z.any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  smsMessage: z.string().min(1).max(150).optional(),
})

// Declare Types
type createOfferSchemaType = z.infer<typeof createOfferSchema>

const CreateOffer = () => {
  const form = useForm<createOfferSchemaType>({
    resolver: zodResolver(createOfferSchema),
    defaultValues: {
      retailerName: undefined,
      latLng: undefined,
      offerType: undefined,
      startDate: undefined,
      endDate: undefined,
      photo: undefined,
      smsMessage: undefined,
    },
  })

  console.log(form.watch('photo'))

  const _onSubmit = (values: createOfferSchemaType) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)
  }
      
  return (
    <Card className='rounded-sm'>
      <CardHeader>Create Offer</CardHeader>
      <CardContent>
        <Form { ...form }>
          <form onSubmit={ form.handleSubmit(_onSubmit) } className="space-y-2 min-w-auto w-[450px]">
            {/* Retailer Name */}
            <FormField
              control={ form.control }
              name="retailerName"
              render={ ({ field }) => (
                <FormItem>
                  <FormLabel>Retailer Name</FormLabel>
                  <FormControl className=''>
                    <Input placeholder="" { ...field } />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                
              ) }
            />

            {/* Lat, Lng */}
            <FormField
              control={ form.control }
              name="latLng"
              render={ ({ field }) => (
                <FormItem>
                  <FormLabel>Lat, Lng</FormLabel>
                  <FormControl>
                    <Input placeholder="" { ...field } />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />

            {/* Offer Type */}
            <FormField
              control={ form.control }
              name="offerType"
              render={ ({ field }) => (
                <FormItem>
                  <FormLabel>Offer Type</FormLabel>
                    <Select onValueChange={ field.onChange } defaultValue={ field.value }>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Offer Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="saloon">Saloon</SelectItem>
                        <SelectItem value="shop">Shop</SelectItem>
                      </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              ) }
            />

            {/* Start Date */}
            <FormField
              control={ form.control }
              name="startDate"
              render={ ({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover { ...field }>
                      <PopoverTrigger>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={ cn(
                              "w-full h-10 rounded-[10px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            ) }
                          >
                            <CalendarIcon />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                 
                      </PopoverContent>
                    </Popover>
                  <FormMessage />
                </FormItem>
              ) }
            />

            {/* End Date */}
            <FormField
              control={ form.control }
              name="endDate"
              render={ ({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover { ...field }>
                    <PopoverTrigger>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={ cn(
                              "w-full h-10 rounded-[10px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            ) }
                          >
                            <CalendarIcon />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={ field.value }
                        onSelect={ field.onChange }
                        initialFocus
                      />
                    </PopoverContent>
                    </Popover>
                  <FormMessage />
                </FormItem>
              ) }
            />

            {/* Photo Upload */}
            <FormField
              control={ form.control }
              name="photo"
              render={ ({ field }) => (
                <FormItem>
                  <FormLabel>Picture</FormLabel>
                  <FormControl>
                    <div className="w-full relative bg-gray-100 rounded cursor-pointer">
                      <Input
                        { ...field }
                        placeholder="Picture"
                        type="file"
                        accept="image/*, application/pdf"
                        className="cursor-pointer absolute opacity-0"
                        // onChange={(event) =>
                        //   // onChange(event.target.files && event.target.files[0])
                        // }
                      />
                      <Button variant="outline" className="w-full h-[40px] cursor-pointer rounded-[10px] color-gray">
                        Click to upload photo
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />

            {/* SMS Message */}
            <FormField
              control={ form.control }
              name="smsMessage"
              render={ ({ field }) => (
                <FormItem>
                  <FormLabel>SMS Message</FormLabel>
                  <FormControl>
                    <Textarea { ...field } />
                  </FormControl>
                  <FormDescription>
                    {form.getValues('smsMessage')?.length ?? 0}/150
                  </FormDescription>
                  <FormMessage />
                </FormItem>
                ) }
              />

            {/* Submit */}
            <div className='flex justify-center gap-2'>
              <Button variant="submit" type="submit" className='bg-orange text-white h-[45px]'>Create</Button>
              <Button variant="submit" className='bg-black text-white h-[45px]'>Preview</Button>
            </div>
          </form>
        
        </Form>
      </CardContent>
    </Card>
  )
}

export default CreateOffer
