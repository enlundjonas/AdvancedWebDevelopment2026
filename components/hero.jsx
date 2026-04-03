function Hero() {
  return (
    <section
      className="relative bg-cover h-[400px] bg-center"
      style={{ backgroundImage: "url('/images/landing.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-transparent"></div>

      {/* Content */}
      <div className="relative h-full max-w-6xl mx-auto px-6 flex items-start justify-end pt-16">
        <div className="text-right text-white max-w-xl space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome to RideFlow Rentals
          </h1>
          <p className="italic font-semibold text-xl md:text-2xl">
            Easy bike rentals for everyone
          </p>
        </div>
      </div>
    </section>
  );
}
export default Hero;