import "./Scrambler.css";
import useToggle from "./toggle.js";
import classNames from "classnames";
import useRandomImage from "./random_image.js";
import useGridManager from "./grid_manager.js";

function Scrambler() {
  const width = 400;
  const height = 400;

  const {
    rows,
    cols,
    positions,
    selection,
    setRows,
    setCols,
    scramble,
    reset,
    handleSelection,
  } = useGridManager();
  const [baseImgUrl, getNewImage] = useRandomImage();
  const imgSrc = `${baseImgUrl}&auto=format&fit=crop&w=${width}&h=${height}&q=80`;
  const newImage = () => {
    getNewImage();
    reset();
  };

  const [grid, toggleGrid] = useToggle(true);
  const [preview, togglePreview] = useToggle(true);

  return (
    <div id="app">
      <div id="dimensions">
        <div>
          <label>rows: </label>
          <input
            type="text"
            value={rows}
            onChange={(ev) => setRows(ev.target.value)}
          />
        </div>
        <div>
          <label>columns: </label>
          <input
            type="text"
            value={cols}
            onChange={(ev) => setCols(ev.target.value)}
          />
        </div>
      </div>
      <div>
        <button onClick={scramble}>Scramble</button>
        <button onClick={reset}>Reset</button>
        <button onClick={newImage}>New Image</button>
        <button onClick={toggleGrid}>Toggle Grid</button>
        <button onClick={togglePreview}>Toggle Preview</button>
      </div>
      {preview && baseImgUrl != null ? (
        <img className="preview" src={imgSrc} />
      ) : (
        ""
      )}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(" + cols + ", 1fr)",
          width,
          height,
          gap: grid ? "1px" : "0",
        }}
      >
        {positions.map((pos, ind) => (
          <ImagePart
            key={ind}
            row={pos % cols}
            col={Math.floor(pos / cols)}
            src={imgSrc}
            isSelected={ind === selection}
            onClick={() => handleSelection(ind)}
          />
        ))}
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
