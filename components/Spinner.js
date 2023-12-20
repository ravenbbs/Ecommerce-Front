import {BounceLoader} from "react-spinners";


export default function Spinner() {
  return (
    <div className="h-full w-full flex justify-center ">
      <BounceLoader speedMultiplier={3} color={'#555'} />
    </div>
  );
}