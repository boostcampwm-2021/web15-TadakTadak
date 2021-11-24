import { useCallback, useEffect, useState } from 'react';
type CustomIntersectionObserverType = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
) => (node: HTMLDivElement) => void;

const useIntersectionObserver: CustomIntersectionObserverType = (callback, options) => {
  const [arr, setArr] = useState<HTMLDivElement[]>([]);

  const ref = useCallback((node: HTMLDivElement) => {
    if (node) {
      setArr((array) => [...array, node]);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    arr.forEach((t) => observer.observe(t));
  }, [arr, callback, options]);

  return ref;
};

export default useIntersectionObserver;
