import { useEffect, useReducer } from "react";

export default function useGridManager() {
  const [state, dispatch] = useReducer(handleAction, {
    rows: 5,
    cols: 10,
    positions: [],
    selection: null,
  });
  const { rows, cols } = state;

  useEffect(() => dispatch({ type: "reset" }), [rows, cols]);

  return {
    ...state,
    dispatch,
  };
}

function handleAction(state, { type, value }) {
  const { rows, cols, positions, selection } = state;
  switch (type) {
    case "reset":
      return reset(rows, cols);
    case "scramble":
      return {
        rows,
        cols,
        selection: null,
        positions: shuffle([...positions]),
      };
    case "select":
      if (selection == null) return { rows, cols, positions, selection: value };
      return {
        rows,
        cols,
        positions: swap([...positions], selection, value),
        selection: null,
      };
    case "set-rows":
      return reset(value, cols);
    case "set-cols":
      return reset(rows, value);
  }
}

function reset(rows, cols) {
  return { rows, cols, selection: null, positions: numbers(rows * cols) };
}

function numbers(size) {
  return new Array(size).fill(0).map((_, i) => i);
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
