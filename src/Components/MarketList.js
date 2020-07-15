import React, { Component } from "react";
import withSocketSubscription from "./WebSocketHOC";
class MarketList extends Component {
  constructor(props) {
    super(props);
    // const { websocket } = this.props;
    // console.log("websocket", websocket);
    // this.state = { data: this.props.data };
  }

  componentDidMount() {
    console.log("componet did monu", this.props);
    this.getStockData();
  }

  getStockData = () => {
    fetch(
      "https://www.binance.com/exchange-api/v1/public/asset-service/product/get-products"
    )
      .then((response) => {
        this.setState({ data: response.json() });
        console.log("re", response.json());
      })
      .then((error) => alert(error));
  };

  render() {
    const { data } = this.props;
    // console.log("data", data);
    return (
      <>
        <div className="market-list">List</div>
        {data && (
          <ul>
            {data.map((item) => (
              <li key={item.s}>{item.s}</li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default withSocketSubscription(MarketList);
// export default MarketList;
