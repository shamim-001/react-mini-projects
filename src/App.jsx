import { useEffect, useState } from "react";
import dbData from "./data.json";
const App = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isMultiSelection, setIsMultiSelection] = useState(false);
  const [multiSelected, setMultiSelected] = useState([]);

  useEffect(() => {
    setData(dbData);
  }, [data]);

  function handleSelection(id) {
    if (isMultiSelection) {
      const copyMultiSelected = [...multiSelected];
      const indexOfCurrentId = copyMultiSelected.indexOf(id);

      indexOfCurrentId === -1
        ? copyMultiSelected.push(id)
        : copyMultiSelected.splice(indexOfCurrentId, 1);

      setMultiSelected(copyMultiSelected);
    } else {
      setSelected(id === selected ? null : id);
    }
  }

  function toggleSelection() {
    setIsMultiSelection(!isMultiSelection);
    setSelected(null);
    setMultiSelected([]);
  }

  return (
    <div className="wrapper  ">
      <h1 className="font-semibold text-3xl mb-8">Accordion</h1>
      <button
        onClick={toggleSelection}
        className="font-semibold text-center w-full text-xl mb-5 p-3 bg-cyan-200 rounded-md"
      >
        {isMultiSelection
          ? "Enable Single Selection"
          : "Enable Multi Selection"}
      </button>

      <div className="flex flex-col gap-5">
        {data.map((item) => {
          const open = isMultiSelection
            ? multiSelected.includes(item.id)
            : selected === item.id;
          return (
            <div
              key={item.id}
              className={`p-3 transition-all rounded-md border-l-4 ${open ? "border-[#B7ADEA]" : "border-[#EACA93]"}  ${open ? "bg-[#B7ADEA]/30" : "bg-[#EACA93]/30"}`}
            >
              <button
                className="flex gap-5 px-8 py-3 w-full"
                onClick={() => handleSelection(item.id)}
              >
                <span>{open ? "X" : "+"}</span>
                <h3>{item.title}</h3>
              </button>
              <p
                className={`pl-16 h-0 opacity-0 transition-all ${open ? "h-fit opacity-100" : ""}`}
              >
                {item.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
