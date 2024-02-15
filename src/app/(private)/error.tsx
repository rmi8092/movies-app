'use client'
  
function ErrorHome({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong loading movies catalog!</h2>
      <button
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}

export default ErrorHome