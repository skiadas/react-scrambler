import { useState } from "react";

export default function useToggle(initial) {
  const [toggle, setToggle] = useState(initial);
  return [toggle, () => setToggle(!toggle)];
}
