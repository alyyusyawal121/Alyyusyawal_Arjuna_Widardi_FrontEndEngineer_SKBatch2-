import React from 'react'
import Link from 'next/link'
export default function Navbar() {
  return (
    <>
        <nav className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                <Link href="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <span className="text-lg font-bold">R</span>
                </div>

                <span className="text-xl font-bold tracking-tight text-gray-900">
                    RoleFinder
                </span>
                </Link>
            </div>
        </nav>
    </>

  );
}