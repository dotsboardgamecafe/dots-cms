'use client';

export default function Error ( {
  error,
  reset,
}: {
  error: Error & { stat_code?: string, stat_msg?: string; };
  reset: () => void;
} ) {

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={ () => reset() }>Try again</button>
    </div>
  );
}