/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from "@components/ui/button"
import { Link } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@components/ui/card"

const OfferCard = ({ offer }: any) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{offer.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray">Offer Starts: {offer.startDate}</p>
        <p className="text-gray">Offer Ends: {offer.endDate}</p>
      </CardContent>
      <CardFooter>
        <Button variant='copy'>
          <Link /> Copy Link
        </Button>
      </CardFooter>
    </Card>
  )
}

export default OfferCard
