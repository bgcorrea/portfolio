import { useState } from "react";

const HoverProject = ({ images }) => {
  const [index, setIndex] = useState(0);

  return (
    <div
      className="border rounded overflow-hidden cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIndex(1)}
      onMouseLeave={() => setIndex(0)}
    >
      <img src={images[index]} alt="Proyecto" className="w-full h-auto" />
    </div>
  );
};

export default HoverProject;
