import { useEffect, useState } from "react";

export default function useGridManager() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(5);
  const [positions, setPositions] = useState([]);
  const [selection, setSelection] = useState(null);

  const reset = () => {
    setPositions(new Array(rows * cols).fill(0).map((_, i) => i));
    setSelection(null);
  };

  const scramble = () => setPositions(shuffle([...positions]));
  const handleSelection =
    selection == null
      ? setSelection
      : (ind) => {
          const newArray = swap([...positions], selection, ind);
          setPositions(newArray);
          setSelection(null);
        };

  useEffect(reset, [rows, cols]);

  return {
    rows,
    cols,
    positions,
    selection,
    scramble,
    reset,
    handleSelection,
    setRows,
    setCols,
  };
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
}

function swap(arr, i, j) {
  [arr[j], arr[i]] = [arr[i], arr[j]];
  return arr;
}
