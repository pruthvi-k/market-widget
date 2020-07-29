import React from "react";
function StockRow({ stock }) {
  const getValueColor = () => {
    if (!stock || stock.history.length === 0) return null;
    console.log("stock", stock);
    // debugger;
    if (stock.c < stock.history.slice(-2)[0].value) {
      return "red";
    } else if (stock.c > stock.history.slice(-2)[0].value) {
      return "green";
    } else {
      return null;
    }
  };

  return (
    <>
      <li style={{ color: getValueColor() }}>
        {stock.s} - <b>{stock.l}</b> - <b>{stock.c}</b>
      </li>
    </>
  );
}

export default StockRow;
