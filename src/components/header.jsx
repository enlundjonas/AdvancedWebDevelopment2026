
function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center p-4">
        <img
          src="/images/ridelogo.PNG"
          width={231}
          height={36}
          alt="RideFlow logo"
        />
        <div className="container mx-auto flex gap-6 justify-end items-center p-4">
        <a href="/" className="border-b-2 border-green-500 hover:text-green-500">
          Home
        </a>
        <a href="catalog.html" className="hover:text-green-500">
          Catalog
        </a>
        <a href="orders.html" className="hover:text-green-500">
          My orders
        </a>
        </div>
      </div>
    </header>
  );
}
export default Header;