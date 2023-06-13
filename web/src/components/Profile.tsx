import { getUser } from '@/lib/auth'
import Image from 'next/image'

export function Profile() {
  const { name, avatarUrl } = getUser()
  return (
    <div className="group flex items-center gap-3 text-left">
      <Image
        src={avatarUrl}
        width={40}
        height={40}
        alt="User image"
        className="h-10 w-10 rounded-full"
        draggable="false"
      />

      <p className="text-sm leading-snug">
        {name}
        <br />
        <a
          href="/api/auth/logout"
          className="block text-red-400 transition-colors hover:text-red-300"
        >
          Logout
        </a>
      </p>
    </div>
  )
}
