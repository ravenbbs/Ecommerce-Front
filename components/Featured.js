import Image from "next/image";

export default function Featured() {
  return (
    <div className="flex justify-center w-full">
      <div className="p-4 border-2 md:mx-12 w-full ">
        <div className="block relative h-96  overflow-hidden ">
          <div className="absolute  border-4 h-full w-full pl-24 pt-12">
            <h1 className="font-semibold text-4xl mb-20">Tendencia - Novedades</h1>
            <button className="bg-white px-12 py-2 rounded-md font-semibold">Ver mas</button>
          </div>

          <img
            className="w-full "
            src={
              "https://img.freepik.com/fotos-premium/auriculares-inalambricos-banco-energia-bateria-portatil-externo-sobre-fondo-azul-rosa-vista-superior-plano_175682-34486.jpg?w=826"
            }
          />
        </div>
      </div>
    </div>
  );
}
