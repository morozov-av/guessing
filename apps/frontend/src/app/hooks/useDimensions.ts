import { useEffect, useRef } from "react";

export const useDimensions = (ref: { current: any }) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  }, []);

  console.log(dimensions)

  return dimensions.current;
};
