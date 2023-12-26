import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductBox from "@/components/ProductBox";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import Spinner from "@/components/Spinner";

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [phrase, setPhrase] = useState("");
  const [products, setProducts] = useState([]);
  const debouncedSearch = useCallback(debounce(searchProducts, 500), []);
  let onSearch = ''
  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [phrase]);

  function searchProducts(phrase) {
    axios
      .get("/api/products?phrase=" + encodeURIComponent(phrase))
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
  }
  return (
    <>
      <Header hidden={"hidden"} searchHidden={' hidden'} onSearch={onSearch} />

      <div className="   flex justify-center  p-4 ">
        <Input
          autoFocus
          className="shadow-lg rounded-lg h-fit w-full max-w-2xl max-md:mx-auto border-none"
          type="text"
          placeholder="Buscar"
          name="name"
          defaultValue={phrase || onSearch}
          onChange={(ev) => setPhrase(ev.target.value)}
        />
      </div>
      {!isLoading && phrase !== "" && products.length === 0 && (
        <h1 className="block text-center mx-auto my-12 ">
          No se encontraron productos:  &quot;{phrase}&quot;
        </h1>
      )}
      {isLoading && <Spinner fullWidth={true} />}
      <div className=" transition-all mx-auto px-4 max-w-4xl grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 mb-6">
        {!isLoading &&
          products.length > 0 &&
          products.map((product, index) => (
            <ProductBox key={product._id} {...product} />
          ))}
      </div>
    </>
  );
}
