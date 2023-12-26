import StarOutline from "@/components/icons/StarOutline";
import {useState} from "react";
import StarSolid from "@/components/icons/StarSolid";


export default function StarsRating({
  defaultHowMany=0, onChange
}) {
  const [howMany,setHowMany] = useState(defaultHowMany);
  const five = [1,2,3,4,5];
  function handleStarClick(n) {
    setHowMany(n);
    onChange(n);
  }

  return (
    <div 
    className="inline-flex gap-2 items-center transition-all px-6 ">
      {five.map(n => (
          <button
            key={n}
            className={` h-4 w-4 text-blue-600 transition-opacity ${
              howMany >= n ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => handleStarClick(n)}>
            {howMany >= n ? <StarSolid /> : <StarOutline />}
          </button>
      ))}
    </div>
  );
}
