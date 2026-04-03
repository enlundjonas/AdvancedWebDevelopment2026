
import Information from './information';

function Home() {
  return (
    <>
      

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="grid gap-16">
          <Information
            image="/images/motorcycle.jpg"
            title="Explore the Cities With Ease"
            text="We make bike renting effortless for everyone. Whether you’re commuting, visiting country or spending the day outdoors, RideFlow Rentals offers simple, affordable and reliable options in multiple locations across Finland."
          />

          <Information
            image="/images/ebike.jpg"
            title="Enjoy Scenic Routes & Outdoor Adventures"
            text="From peaceful park trails to coastline roads, our routes allow you to enjoy the Finnish nature while traveling sustainably. Ride solo or with friends and family — your journey starts with the right bike."
            reverse
          />
        </section>
      </main>
    </>
  );
}

export default Home;