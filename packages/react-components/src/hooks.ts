import { useState, useEffect, DependencyList, useRef } from 'react';

export const useGifReplay = (
  url: string,
  dependencies: DependencyList,
): string => {
  const [rand, setRand] = useState(Math.random());
  useEffect(() => {
    setRand(Math.random());
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
  return `${url}#${rand}`;
};

export const usePrevious = <T extends unknown>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
