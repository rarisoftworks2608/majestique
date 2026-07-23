import { useState, useEffect, useCallback, useRef } from 'react'

export default function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  const execute = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetchFn()
      setData(res.data)
    } catch (err) {
      if (err.name !== 'CanceledError') {
        setError(err.response?.data?.error || 'Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    execute()
  }, [execute])

  return { data, loading, error, refetch: execute }
}
