// export default function Tabs({tabs,active,onChange, editActive}) {
  
//   return (
//     <div className="flex justify-evenly mb-6">
//       {tabs.map(tabName => (
//         <h1 
//         className={" text-blue-600 cursor-pointer border-b-2 border-blue-600 " + editActive}          onClick={() => { onChange(tabName) }}
//           active={tabName === active}
//         >{tabName}</h1>
//       ))}
//     </div>
//   );
// }
export default function Tabs({ tabs, active, onChange, editActive }) {
  return (
    <div className="flex justify-evenly mb-6">
      {tabs.map((tabName, index) => (
        <h1
          key={index}
          className={`text-blue-600 cursor-pointer border-b-2 border-blue-600 ${
            tabName === active ? '' : editActive
          }`}
          onClick={() => {
            onChange(tabName);
          }}
          active={tabName === active}
        >
          {tabName}
        </h1>
      ))}
    </div>
  );
}