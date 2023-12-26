import StarOutline from "@/components/icons/StarOutline";
import {useState} from "react";
import StarSolid from "@/components/icons/StarSolid";


export default function StarsRating({
  defaultHowMany=0,disabled,onChange
}) {
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
    <div 
    className="inline-flex gap-1 items-center ">
      {five.map(n => (
        <>
          <button
            className="h-4 w-4"
            onClick={() => handleStarClick(n)}>
            {howMany >= n ? <StarSolid /> : <StarOutline />}
          </button>
        </>
      ))}
    </div>
  );
}