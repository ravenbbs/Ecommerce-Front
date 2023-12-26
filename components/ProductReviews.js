import Input from "@/components/Input";
import StarsRating from "@/components/StarsRating";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { useSession } from "next-auth/react";
import Textarea from "./Textarea";

export default function ProductReviews({ product }) {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const email = session?.user?.email;
  function submitReview() {
    const data = {
      autor: email,
      title,
      description,
      stars,
      product: product._id,
    };
    axios.post("/api/reviews", data).then((res) => {
      loadReviews();
    });
  }
  useEffect(() => {
    loadReviews();
  }, []);

  function loadReviews() {
    setReviewsLoading(true);
    axios.get("/api/reviews?product=" + product._id).then((res) => {
      setReviews(res.data);
      setReviewsLoading(false);
    });
  }

  return (
    <section className="mb-16 flex pt-4 px-2 gap-5 max-md:grid-cols-1 max-md:grid justify-center xl:mx-12">
      {/* solo si inicio sesión debe salir, para agregar review */}
      {/* Para agregar review */}
      <div className=" bg-white shadow-xl rounded-lg w-full max-w-2xl py-6 max-md:mx-auto h-fit ">
        <h1 className="mb-4 mx-4 text-blue-600">Agrega un review</h1>
        <hr className="border-blue-300 border my-2 mx-4" />

        {session && (
          <>
            <div className="w-full px-6 py-2 font-semibold text-xl">
              <StarsRating onChange={setStars} />
              <div className="h-2"></div>
              <Input
                type="text"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                placeholder="Titulo"
              />
              <Textarea
                type="textarea"
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
                placeholder="Agrega un comentario..."
              />
              <button
                onClick={submitReview}
                className="text-base block font-bold px-4 py-2 rounded-md hover:scale-105 transition-all my-1 shadow-sm bg-blue-200 text-blue-600 "
              >
                Enviar
              </button>
            </div>
          </>
        )}

        {!session && (
          <div className="w-full h-20 text-center px-6 py-2 font-semibold text-xl ">
            <p className="text-center ">
              Debes iniciar sesión para agregar una review
            </p>
          </div>
        )}
      </div>

      {/* Ver las reviews */}
      <div className="bg-white shadow-xl rounded-lg h-fit w-full max-w-2xl max-md:mx-auto p-4 ">
        <h1 className=" mt-2 mx-4 text-blue-600">Reviews</h1>
        <hr className="border-blue-300 border my-4" />
        {reviewsLoading && <Spinner fullWidth={true} />}
        {reviews.length === 0 && (
          <div className="w-full h-20 text-center px-6 py-2 font-semibold text-xl ">
            <p className="text-center ">
              Aun no existen reviews sobre este producto
            </p>
          </div>
        )}
        {reviews.length > 0 &&
          reviews.map((review) => (
            <div
              className="w-full  flex flex-col px-6 text-sm text-gray-500"
              key={review._id}
            >
              <div className="flex justify-between items-center font-semibold">
                <StarsRating
                  size={"sm"}
                  disabled={true}
                  defaultHowMany={review.stars}
                />
                <time>
                  {new Date(review.createdAt).toLocaleString("sv-SE")}
                </time>
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mt-2">
                {review.title}
              </h3>
              <p className="text-gray-600 text-md ">{review.description}</p>
              <p className="text-right mt-2">{review.autor}</p>
              <hr className="border my-2" />
            </div>
          ))}
      </div>
    </section>
  );
}
