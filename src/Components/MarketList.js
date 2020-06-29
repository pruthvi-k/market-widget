import React from "react";
import withSocketSubscription from "./WebSocketHOC";
function MarketList({ data }) {
  return (
    <>
      <div className="market-list">List</div>
      <ul>
        {/* {data.map((item) => (
          <li key={item.s}>{item.s}</li>
        ))} */}
      </ul>
    </>
  );
}

export default withSocketSubscription(MarketList);
