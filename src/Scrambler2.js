import "./Scrambler.css";
import useToggle from "./toggle.js";
import classNames from "classnames";
import useRandomImage from "./random_image.js";
import useGridManager from "./grid_manager2.js";
import DelayedInput from "./delayedInput.js";

function Scrambler() {
  const width = 400;
  const height = 400;

  const { rows, cols, positions, selection, dispatch } = useGridManager();
  const [baseImgUrl, getNewImage] = useRandomImage();
  const imgSrc = `${baseImgUrl}&auto=format&fit=crop&w=${width}&h=${height}&q=80`;
  const newImage = () => {
    getNewImage();
    dispatch({ type: "reset" });
  };

  const [grid, toggleGrid] = useToggle(true);
  const [preview, togglePreview] = useToggle(true);
  const shouldPreview = preview && baseImgUrl != null;
  const tiles = positions.map((pos, ind) => (
    <ImagePart
      key={ind}
      row={pos % cols}
      col={Math.floor(pos / cols)}
      src={imgSrc}
      isSelected={ind === selection}
      onClick={() => dispatch({ type: "select", value: ind })}
    />
  ));

  function makeSetter(key) {
    return (ev) => {
      const value = parseInt(ev.target.value);
      if (value > 0) dispatch({ type: `set-${key}`, value });
    };
  }

  return (
    <div id="app">
      <div id="dimensions">
        <div>
          <label>rows: </label>
          <DelayedInput
            delay={500}
            type="text"
            value={rows}
            onChange={makeSetter("rows")}
          />
        </div>
        <div>
          <label>columns: </label>
          <input type="text" value={cols} onChange={makeSetter("cols")} />
        </div>
      </div>
      <div>
        <button onClick={() => dispatch({ type: "scramble" })}>Scramble</button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
        <button onClick={newImage}>New Image</button>
        <button onClick={toggleGrid}>Toggle Grid</button>
        <button onClick={togglePreview}>Toggle Preview</button>
      </div>
      {shouldPreview ? <img className="preview" src={imgSrc} /> : ""}
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          width,
          height,
          gap: grid ? "1px" : "0",
        }}
      >
        {tiles}
      </div>
    </div>
  );
}

function ImagePart({ row, col, src, isSelected, onClick }) {
  const left = -100 * row + "%";
  const top = -100 * col + "%";
  const classes = classNames("tile", { selected: isSelected });
  return (
    <div className={classes} onClick={onClick}>
      <img src={src} style={{ left, top }} alt="" />
    </div>
  );
}

export default Scrambler;
