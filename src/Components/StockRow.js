import React, { useEffect } from "react";
function StockRow({ pair, lastPrice, change }) {
  useEffect(
    (a) => {
      console.log("a", a);
    },
    [lastPrice]
  );
  return (
    <>
      <li>
        {pair} - <b>{lastPrice}</b> - <b>{change}</b>
      </li>
    </>
  );
}

export default StockRow;
