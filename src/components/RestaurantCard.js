import { CDN_URL } from "../util/constants";

function RestaurantCard(props) {
  const { resData } = props;
  const { name, avgRating, cuisines, costForTwo, cloudinaryImageId } =
    resData?.info;

  return (
    <div className="bg-slate-50 border flex-col mx-auto w-40 sm:w-auto justify-between p-1 rounded-md hover:shadow-lg hover:scale-110 transition duration-200 ease-out ">
      <img
        className=" h-40 rounded-md w-full"
        src={CDN_URL + cloudinaryImageId}
        alt="img"
      />

      <div className=" p-4 space-y-3  ">
        <h1 className="overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </h1>
        <h1 className=" text-xs text-slate-400 overflow-hidden text-ellipsis whitespace-nowrap ">
          {cuisines.join(",")}
        </h1>
        <div className=" flex justify-between text-xs text-slate-500 ">
          <h1>{avgRating} </h1>
          <h1>{costForTwo}</h1>
        </div>
      </div>
    </div>
  );
}
export default RestaurantCard;

//Higher Order Component
//Input => RestaurantCart , Output => RestaurantCardPromoted

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <div className="mx-24 sm:mx-auto">
          <label className="absolute z-10 bg-blue-400 rounded-md text-white p-1 ">
            Promoted
          </label>
          <div>
            <RestaurantCard {...props} />
          </div>
        </div>
      </div>
    );
  };
};
