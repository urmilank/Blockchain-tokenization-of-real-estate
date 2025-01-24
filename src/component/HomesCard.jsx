export default function HomesCard({
  property,
  buyButton,
  setSelectedProperty,
}) {

  if(property.sold){
    return (
      <div className="bg-gray-300 p-3 rounded-lg lg:w-64 min-w-64 min-h-80 text-gray-400">
        <div>
          <div
            className="relative bg-cover bg-center h-32 rounded"
            style={{
              backgroundImage:
                "url('https://c1.wallpaperflare.com/preview/785/724/33/architecture-skyscraper-glass-facades-modern.jpg')",
            }}
          >
            {/* Overlay with a gray color and more opacity to gray out the image */}
            <div className="absolute inset-0 bg-gray-700 opacity-60 rounded"></div>
            {/* Optional: Text to indicate "Sold" */}
            <div className="absolute inset-0 flex justify-center items-center text-white font-bold text-xl">
              Sold
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-lg text-bold tracking-wide  mb-2">
            {property.name}
          </p>
          <p className="text-sm  font-hairline">
            {property.address}
          </p>
        </div>
        <div className="mt-6 flex flex-wrap justify-between pt-3 space-x-2 text-xm dark:text-coolGray-400">
          <span>{property.price} ETH</span>
          {buyButton ? (
            <button
              className="rounded-lg  flex items-center  bg-black px-4 py-2 text-white bg-gray-400"
            >
              X
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>)}else{
return (
  <div className="bg-white shadow-xl p-3 rounded-lg lg:w-64 min-w-64 min-h-80">
    <div>
      <div
        style={{
          backgroundImage:
            `url('./${property.id}.png')`,
        }}
        className="bg-cover bg-center bg-gray-300 h-32 rounded"
      ></div>
    </div>
    <div className="mt-6">
      <p className="text-lg text-bold tracking-wide text-gray-600 mb-2">
        {property.name}
      </p>
      <p className="text-sm text-gray-600 font-hairline">
        {property.address}
      </p>
    </div>
    <div className="mt-6 flex flex-wrap justify-between pt-3 space-x-2 text-xm dark:text-coolGray-400">
      <span>{property.price} ETH</span>
      {buyButton ? (
        <button
          onClick={() => setSelectedProperty(property)}
          className="rounded-lg shadow-md flex items-center shadow bg-black px-4 py-2 text-white hover:bg-gray-700"
        >
          Buy
        </button>
      ) : (
        <></>
      )}
    </div>
  </div>  );
      }
  

}
