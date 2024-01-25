import React from "react";
import { useRouteError } from "react-router-dom";

export default function Error() {
  const err = useRouteError();
  return (
    <div className=" space-y-10 flex w-auto justify-center items-center flex-col h-screen border">
      <h1 className=" text-stone-400 font-medium text-9xl">Oops!!</h1>
      <h2 className=" font-bold text-xl">
        {err.status} : {err.statusText}
      </h2>
    </div>
  );
}
