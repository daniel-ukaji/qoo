import React from 'react'

function mobileNavBar() {
  return (
    <nav className="fixed bottom-0 w-full bg-gray-800">
      <div className="flex items-center justify-around max-w-2xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Home
          </a>
        </Link>
        <Link href="/about">
          <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            About
          </a>
        </Link>
        <Link href="/contact">
          <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Contact
          </a>
        </Link>
      </div>
    </nav>
  )
}

export default mobileNavBar