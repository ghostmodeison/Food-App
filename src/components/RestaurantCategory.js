import { IoArrowDownCircleSharp } from "react-icons/io5";
import ItemList from "./ItemList";
import { useState } from "react";

const RestaurantCategory = ({ data, visible, setVisible }) => {
  //toggle for show items
  const [visible2, setVisible2] = useState(true);

  const clickHandler = () => {
    setVisible();
    setVisible2(!visible2);
    console.log(visible);
  };
  return (
    <div className="border my-10 shadow-md p-3 rounded-md text-slate-600 ">
      <div
        className=" flex justify-between items-center cursor-pointer"
        onClick={clickHandler}
      >
        <div className=" font-semibold text-2xl ">{data.title}</div>
        <div>
          <IoArrowDownCircleSharp className=" text-2xl" />
        </div>
      </div>
      {visible2 && visible && <ItemList items={data?.categories} />}
    </div>
  );
};
export default RestaurantCategory;
