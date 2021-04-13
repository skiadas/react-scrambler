import { useState, useRef } from "react";

export default function DelayedInput({ delay, onChange, value, ...props }) {
  const [current, setCurrent] = useState(value);
  const timerId = useRef(null);
  function delayedOnChange(ev) {
    setCurrent(ev.target.value);
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => onChange(ev), delay);
  }

  return <input value={current} onChange={delayedOnChange} {...props} />;
}
