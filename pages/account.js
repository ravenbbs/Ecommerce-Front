import Header from "@/components/Header";

export default function AccountPage(){

  return(
    <>
    <Header hidden={'hidden'} accountHidden={'hidden'}/>
    <section className="mb-16 flex pt-12 px-4 gap-5 max-md:grid-cols-1 max-md:grid justify-center ">
        <div className=" bg-white shadow rounded-lg  w-full max-w-2xl pt-6 max-md:mx-auto px-4 ">
          <h1 className="mb-6 mx-4">Carrito</h1>
     
        </div>

        
          <div className="bg-white shadow rounded-lg h-fit w-full max-w-xl max-md:mx-auto p-4 ">
            <h1 className=" mt-2 mx-4">
              Información de Cuenta
            </h1>
            <hr className="border-gray-300 my-4" />
           
          </div>
     
      </section>
    </>
  )
}