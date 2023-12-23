export default function Tabs({tabs,active,onChange}) {
  return (
    <div>
      {tabs.map(tabName => (
        <div
          onClick={() => { onChange(tabName) }}
          active={tabName === active}
        >{tabName}</div>
      ))}
    </div>
  );
}