import { useRef, useEffect } from 'preact/hooks';
/**
 * useIsFirstRender - catch first render for effect
 * @returns {boolean} - true if first render
 */
const useIsFirstRender = () => {
  const isFirstRender = useRef(true);
  useEffect(() => {
    isFirstRender.current = false;
  }, []);
  return isFirstRender.current;
}

export default useIsFirstRender;