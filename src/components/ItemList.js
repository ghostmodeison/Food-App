import React from "react";
import InsideItemList from "./InsideItemList";

export default function ItemList({ items }) {
  console.log(items);
  //   console.log(items[1]?.title);
  //   console.log(items[5]?.itemCards?.card?.info?.name);

  return (
    <div>
      {items.map((data) => (
        <div>
          <div>
            <InsideItemList data={data?.itemCards} />
          </div>
        </div>
      ))}
    </div>
  );
}
