import CreateOffer from "@components/CreateOffer"
import OfferCard from "@components/OfferCard"

const Home = () => {
  const brandNames = [
    'Bata', 'Yellow', 'McDonald\'s', 'Pizza Hut', 'KFC', 'Starbucks', 'Domino\'s', 'Burger King', 'Café Coffee Day', 'Subway'
  ]
  
  const offers = Array.from({ length: brandNames.length }, (_, id) => {
    const startDate = new Date()
    const endDate = new Date(startDate)
    endDate.setMonth(startDate.getMonth() + 1) // Set endDate to one month after startDate
  
    return {
      id: id + 1,
      name: brandNames[id], // Random brand name
      startDate: startDate.toLocaleDateString(), // Convert Date object to string
      endDate: endDate.toLocaleDateString(), // Convert Date object to string
    }
  })

  return (
    <div className="bg-background grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-wrap gap-8 row-start-1 row-end-4 justify-center">
        {/* {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))} */}
        <CreateOffer />
      </main>
    </div>
  )
}

export default Home
