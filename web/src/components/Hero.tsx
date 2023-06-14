import Image from 'next/image'
import logo from '../assets/nlw-spacetime-logo.svg'
import Link from 'next/link'

export function Hero() {
  return (
    <div className="space-y-5">
      <Image alt="space time app" src={logo} />

      <div className="max-w-[420px] space-y-4">
        <h1 className="text-5xl font-bold leading-tight">Your time capsule</h1>
        <p className=" text-lg leading-relaxed">
          Collect memories from your journey, and share them with the world!
        </p>
        <Link
          href="/memories/new"
          className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
        >
          Create Memory
        </Link>
      </div>
    </div>
  )
}
