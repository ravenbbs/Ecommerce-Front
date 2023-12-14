
import { Carousel } from 'flowbite-react';
import Image from "next/image";

export default function Featured() {
  return (

 
     <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slide={false}>
        <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
      </Carousel>
    </div>

)
}
  

    // <div className="bg-white m-4 p-2 rounded-md grid grid-cols-2 gap-12 md:mx-12 md:rounded-lg  max-sm:grid-rows-2 max-sm:grid-cols-1 max-sm:">
    //   <div className="h-fit  border-2">
    //     <h1>Producto Destacado</h1>
    //     <button>Agregar al Carrito</button>
    //     <button>Leer Mas</button>
    //   </div>
    //   <div>
    //     <img className="" src="https://t4.ftcdn.net/jpg/06/01/14/23/360_F_601142328_VnY6DMf1sC0RULodemaCSrvXSlFhO1lA.jpg" />
    //   </div>
    // </div>

    //el codigo parecido al figma
    // <div className="flex justify-center w-full">
    //   <div className="p-4 border-2 md:mx-12 w-full ">
    //     <div className="block relative h-96  overflow-hidden ">
    //       <div className="absolute  border-4 h-full w-full pl-24 pt-12">
    //         <h1 className="font-semibold text-4xl mb-20">Tendencia - Novedades</h1>
    //         <button className="bg-white px-12 py-2 rounded-md font-semibold">Ver mas</button>
    //       </div>

    //       <img
    //         className="w-full "
    //         src={
    //           "https://img.freepik.com/fotos-premium/auriculares-inalambricos-banco-energia-bateria-portatil-externo-sobre-fondo-azul-rosa-vista-superior-plano_175682-34486.jpg?w=826"
    //         }
    //       />
    //     </div>
    //   </div>
    // </div>
