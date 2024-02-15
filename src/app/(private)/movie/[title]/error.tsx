'use client'
  
function ErrorMovie({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong loading movie details!</h2>
      <button
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}

export default ErrorMovie