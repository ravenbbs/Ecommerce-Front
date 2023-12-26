import StarOutline from "@/components/icons/StarOutline";
import { useState } from "react";
import StarSolid from "@/components/icons/StarSolid";

export default function StarsRating({ defaultHowMany=0, onChange, size, disabled }) {
  
  const [howMany,setHowMany] = useState(defaultHowMany);
  const five = [1,2,3,4,5];
  function handleStarClick(n) {
    if (disabled) {
      return;
    }
    setHowMany(n);
    onChange(n);
  }

  return (
    <div className={`inline-flex items-center   ${size === 'sm' ? 'h-4 w-4 ' : 'h-6 w-6 '} `}>
      {five.map((n) => (
        <button
          key={n}
          className={` text-blue-600 transition-opacity ${
            howMany >= n ? "opacity-100 " : "opacity-50 "
          } ${size === "sm" ? " h-4 w-4 " : " h-6 w-6 "}`}
          onClick={() => handleStarClick(n)}
        >
          {howMany >= n ? (
            <StarSolid
              className={`${size === "sm" ? " h-4 w-4 " : " h-6 w-6 "}`}
            />
          ) : (
            <StarOutline 
            className={`${size === "sm" ? " h-4 w-4 " : " h-6 w-6 "}`}
            />
          )}
        </button>
      ))}
    </div>
  );
}
