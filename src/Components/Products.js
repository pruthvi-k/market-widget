import React from "react";
import data from "../mock/products.json";
import MarketList from "./MarketList";

function Products() {
  // debugger;

  let newProducts = [];
  data.data.forEach((item) => (newProducts[item.s] = { ...item }));
  // console.log(newProducts);
  return (
    <>
      <div className="market-list">List</div>
      <MarketList products={newProducts}></MarketList>
      {/* {serverResponse && (
        <ul>
          {serverResponse.data.map((item) => (
            <li key={item.s}>
              {item.s} - <b>{item.c}</b>
            </li>
          ))}
        </ul>
      )} */}
    </>
  );
}

export default Products;
