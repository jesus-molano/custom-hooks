import { useEffect, useRef, useState } from "react"

export const useFetch = (url) => {

  const isMounted = useRef(true)

  const [state, setState] = useState({ data: null, loading: true, error: null })

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  },[])
  
  useEffect(() => {
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Something went wrong')
        }
      })
      .then(data => {
        if (isMounted.current) {
          setState({ data: data, loading: false, error: null })
        }
      })
      .catch(() => {
        setState({
          data: null,
          loading: false,
          error:'No se pudo cargar la info'
        })
      })
  }, [url])

  return state;
}