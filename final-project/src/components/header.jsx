import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center p-4">

        <NavLink to="/">
          <img
            src="/images/ridelogo.PNG"
            width={231}
            height={36}
            alt="RideFlow logo"
          />
        </NavLink>

        <div className="container mx-auto flex gap-6 justify-end items-center p-4">
          <NavLink to="/"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-green-500 hover:text-green-500"
                : "hover:text-green-500"
            }
          >
            Home
          </NavLink>

          <NavLink to="/catalog"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-green-500 hover:text-green-500"
                : "hover:text-green-500"
            }
          >
            Catalog
          </NavLink>

          <NavLink to="/orders"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-green-500 hover:text-green-500"
                : "hover:text-green-500"
            }
          >
            My orders
          </NavLink>
        </div>

      </div>
    </header>
  );
}
export default Header;
