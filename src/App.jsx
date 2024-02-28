import { Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const App = () => {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#D9EEE1");
  const colorRef = useRef();

  useEffect(() => {
    document.body.style.backgroundColor = color;

    // cleanup function
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [color]);

  useEffect(() => {
    handleCreateColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeOfColor]);

  function generateRandomNumber(length) {
    return Math.floor(Math.random() * length);
  }

  function handleCreateHexColor() {
    const hexarr = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];

    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
      hexColor += hexarr[generateRandomNumber(hexarr.length)];
    }

    return hexColor;
  }

  function handleCreateRgbColor() {
    const r = generateRandomNumber(256);
    const g = generateRandomNumber(256);
    const b = generateRandomNumber(256);

    return `rgb(${r}, ${g}, ${b})`;
  }

  function handleCreateColor() {
    setColor(
      typeOfColor === "hex" ? handleCreateHexColor() : handleCreateRgbColor()
    );
    colorRef.current.style.backgroundColor = "";
  }

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(color);
    colorRef.current.style.backgroundColor = "gray";
  }
  return (
    <div className="wrapper flex flex-col h-screen">
      <div className="flex gap-5 justify-center">
        <button onClick={() => setTypeOfColor("hex")}>Create Hex Color</button>
        <button onClick={() => setTypeOfColor("rgb")}>Create RGB Color</button>
        <button onClick={handleCreateColor}>Generate Random Color</button>
      </div>
      <div className="flex-grow flex justify-center items-center">
        <div className="flex gap-3 items-center">
          <p ref={colorRef} className="text-2xl p-2 rounded-md">
            {color}
          </p>
          <button
            onClick={handleCopyToClipboard}
            className="rounded-full hover:bg-slate-500/50 size-10 flex items-center justify-center"
          >
            <Copy />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
