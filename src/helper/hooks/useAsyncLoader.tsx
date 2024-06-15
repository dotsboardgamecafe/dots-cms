

import { useState } from "react"


export type UseAsyncLoaderReturnType<T> = {
  isLoading: boolean,
  isError: boolean,
  data?: null | T
  run: () => void
  resetData: () => void
}

export function useAsyncLoader<Response>(asyncFunction: () => Promise<Response>): UseAsyncLoaderReturnType<Response> {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [data, setData] = useState<Response | null>(null)

  async function runAsync() {
    setIsLoading(true)

    try {
      const response = await asyncFunction()
      setData(response)
    } catch (error) {
      setIsError(true)
    }

    setIsLoading(false)

  }

  return { isLoading, isError, data, run: runAsync, resetData: () => setData(null) }
}