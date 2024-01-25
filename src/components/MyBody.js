import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../util/useOnlineStatus";

function MyBody() {
  //Promoted RestaurantCard
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  //fetch data from API
  const fetchData = async () => {
    const data = await fetch("https://firesingh.github.io/api/Swiggy.json");
    const json = await data.json();
    let myResData =
      json.data.success.cards[4].gridWidget.gridElements.infoWithStyle
        .restaurants;
    setRestaurantData(myResData);
    setOriginalData(myResData);
  };
  useEffect(() => {
    fetchData();
  }, []);

  //To sava Original data
  const [originalData, setOriginalData] = useState([]);

  // For top rated retaurent.
  const [restaurantData, setRestaurantData] = useState([]);

  //toggle for Top Rated restaurant
  const [clickedOnTopRated, setclickedOnTopRated] = useState(false);
  const clickHandler = () => {
    if (clickedOnTopRated === false) {
      let filteredResturant = originalData.filter(
        (res) => res.info.avgRating >= 4.5
      );
      setRestaurantData(filteredResturant);
      setclickedOnTopRated(true);
    } else {
      setRestaurantData(originalData);
      setclickedOnTopRated(false);
    }
  };

  //for search box
  const [text, setText] = useState("");
  useEffect(() => {
    const filtered = originalData.filter((res) =>
      res.info.name.toLowerCase().includes(text.toLowerCase())
    );
    setRestaurantData(filtered);
  }, [text]);

  return originalData.length === 0 && restaurantData.length === 0 ? (
    <Shimmer />
  ) : (
    <div className=" my-40 space-y-10 flex-col justify-center items-center align-middle w-2/3 mx-auto h-screen">
      <div className=" flex justify-center align-middle p-1 space-x-1">
        <input
          type="text"
          placeholder="Search"
          value={text}
          onInput={(e) => setText(e.target.value)}
          className=" border rounded-lg p-2"
        />

        <button
          onClick={() => {
            const filtered = originalData.filter((res) =>
              res.info.name.toLowerCase().includes(text.toLowerCase())
            );
            setRestaurantData(filtered);
          }}
          className="bg-blue-500 rounded-lg hover:bg-blue-700 text-white font-bold py-2 px-4"
        >
          Go
        </button>
      </div>

      <div className=" space-x-3">
        <button
          onClick={clickHandler}
          className="bg-blue-500 rounded-lg hover:bg-blue-700 text-white font-bold py-2 px-4"
        >
          Top Rated Restaurant
        </button>
      </div>

      <div className="sm:grid-cols-2 my-10 grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 ">
        {restaurantData.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            {restaurant.info.promoted ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>

      <div className="">
        <ul className=" flex gap-10 justify-center">
          <li>Link</li>
          <li>link</li>
          <li>Link</li>
          <li>Link</li>
        </ul>
      </div>
    </div>
  );
}
export default MyBody;
