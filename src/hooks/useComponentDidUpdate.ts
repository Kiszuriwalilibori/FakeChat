import { DependencyList, EffectCallback, useEffect, useRef } from "react";

const useComponentDidUpdate = (effect: EffectCallback, dependencies?: DependencyList) => {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    } else {
      effect();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default useComponentDidUpdate;
