import Link from "next/link";
import Image from 'next/image'

function Navbar() {
  return (
    <nav className="bg-white border-pink-200 px-2 sm:px-4 py-2.5 dark:bg-white-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto px-7">
        <Link href="/home" className="flex">
          <Image src="/vercel.svg" alt="me" className="mr-3 h-10" width="90" height="200" />
        </Link>
        <button
      data-collapse-toggle="navbar-default"
      type="button"
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-default"
      aria-expanded="false"
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link
                href="/about"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-pink-700 md:p-0 dark:text-gray-400 md:dark:hover:text-pink dark:hover:bg-gray-700 dark:hover:text-dark md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-pink-700 md:p-0 dark:text-gray-400 md:dark:hover:text-pink dark:hover:bg-gray-700 dark:hover:text-dark md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Products
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
