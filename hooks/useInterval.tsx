import { useEffect, useRef } from 'react';



export const useInterval = (callback:()=>void, delay:number, args:any[]) => {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => {
        if (savedCallback.current) {
          savedCallback.current();
        }
      }, delay);
      return () => clearInterval(id);
    }
  }, [delay,...args]);
};

