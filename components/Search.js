import React, { useCallback, useEffect, useState, useRef } from "react";
import Input from "@/components/Input";
import axios from "axios";
import { debounce } from "lodash";
import Spinner from "@/components/Spinner";
import SearchProductBox from "./SearchProductBox";

export default function SearchComponent({ searchHidden }) {
  const [isLoading, setIsLoading] = useState(true);
  const [phrase, setPhrase] = useState("iphone");
  const [inputPhrase, setInputPhrase] = useState("");

  const [products, setProducts] = useState([]);
  const debouncedSearch = useCallback(debounce(searchProducts, 500), []);
  const productsRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [phrase]);

let hidden = ''

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productsRef.current && !productsRef.current.contains(event.target)) {
        // Obtener las dimensiones y posición del header
        const headerRect = headerRef.current.getBoundingClientRect();
        const isClickBelowHeader =
          event.clientY > headerRect.bottom ||
          event.clientX < headerRect.left ||
          event.clientX > headerRect.right;

        // Ocultar el div solo si se hace clic fuera del div y debajo del header
        if (isClickBelowHeader) {
          setPhrase('')
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function searchProducts(phrase) {
    setInputPhrase(phrase)
    axios
      .get("/api/products?phrase=" + encodeURIComponent(phrase))
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
  }
  
  return (
    <>
      <div
        ref={headerRef}
        className={` flex border-blue-600 border-2 rounded-md  w-1/3 font-semibold max-md:hidden  ${searchHidden}`}
      >
        <Input
          className="p-2 focus:outline-none w-full  border-r-2 border-blue-600"
          type="text"
          placeholder="Nombre del producto"
          name="name"
          value={phrase}
          onChange={(ev) => {
            setPhrase(ev.target.value);
          }}
        />
        <button
          className="bg-blue-500 text-white px-6 z-50"
          // onClick={() => 
          //   setPhrase(inputPhrase)
          // }
        >
          Buscar
        </button>
      </div>

      <div
        ref={productsRef}
        className={` overflow-y-auto max-h-screen flex flex-wrap  max-sm:justify-center left-0 right-0 mx-auto text-center bg-blue-100 absolute max-md:hidden transition-all px-4 max-w-4xl w-full  gap-6  rounded-md p-4 top-24 shadow-2xl ${hidden}  ${
          phrase ? "" : "hidden"
        }`}
      >
        {isLoading && (
          <div className="col-span-full my-12 w-full ">
            <Spinner />
          </div>
        )}

        {!isLoading && phrase !== "" && products.length === 0 && (
          <h1 className="col-span-full block text-center max-w-4xl mx-auto my-12 max-md:hidden">
            No se encontraron productos: "{phrase}"
          </h1>
        )}
        {!isLoading &&
          products.length > 0 &&
          products.map((product, index) => (
            <SearchProductBox key={product._id} {...product} />
          ))}
      </div>
    </>
  );
}
