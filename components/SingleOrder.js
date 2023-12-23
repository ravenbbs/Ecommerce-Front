
export default function SingleOrder({line_items,createdAt,...rest}) {
  return (
    <div 
    className="my-2 py-3 border-b-2 flex justify-evenly gap-4 border-slate-300">
      <div>
        <time>{(new Date(createdAt)).toLocaleString('sv-SE')}</time>
        <div 
        className="mt-2 text-sm font-semibold ">
          {rest.name}<br />
          {rest.email}<br />
          {rest.streetAddress}<br />
          {rest.postalCode} {rest.city}, {rest.country}
        </div>
      </div>
      <div>
        {line_items.map(item => (
          <span className="block text-gray-700 font-semibold ">
            <span>{item.quantity} x </span>
            {item.price_data.product_data.name}
          </span>
        ))}
      </div>
    </div>
  );
}