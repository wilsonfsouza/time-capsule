export function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="w-[340px] text-center leading-relaxed">
        You have not created a memory yet, start{' '}
        <a href="#" className="underline transition-colors hover:text-gray-50">
          creating now
        </a>
      </p>
    </div>
  )
}
