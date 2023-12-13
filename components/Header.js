import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-col">
      {/* sección superior del header*/}
      <div>
        {/* Logo de la tienda*/}
        <Link href={"/"}>Bianvi Store</Link>
        {/* Barra de búsqueda*/}
        <div>
          <input type="text"/>
          <select>
            <option value={0}>Categorías</option>
          </select>
          <button></button>
        </div>
        {/* Sección ingresar o Perfil*/}
        <div>
          {/* Ingresar - registrarse cuando no exista session  cuando si lo de abajo*/}
          <Link href={'/account'}> Cuenta</Link>
          
          <Link href={'/cart'}> Carrito(0) </Link>
        </div>
      </div>
      {/* Sección inferior del header*/}
      <div>
        <nav>
          <Link href={'/categories'}> Categorías</Link>
          <Link href={'/products'}> Todos los productos </Link>
          <Link href={'#'}> Ofertas </Link>
          <Link href={'#'}> SexShop +18 </Link>
          <Link href={'#'}> Extra ...</Link>
         </nav>
      </div>
    </header>
  );
}
