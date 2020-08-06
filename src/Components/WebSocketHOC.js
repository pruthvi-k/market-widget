import React from "react";
import Products from "../mock/products.json";

export default function withSocketSubscription(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        stock: null,
        ws: new WebSocket(
          "wss://stream.binance.com/stream?streams=!miniTicker@arr"
        ),
        products: [],
        productTypes: [],
        type: "BTC",
        category: "",
        setType: (type) => {
          // debugger;
          let category = this.state.type.split("-");
          this.setState({ type: category[0] });
          this.setState({ category: category[1] ? category[1] : "" });
        },
      };
    }

    componentDidMount() {
      let productByType = [];
      let productTypes = [];
      Products.data.forEach((item) => {
        if (!productByType[item.q]) productByType[item.q] = [];
        productByType[item.q].push({ ...item, history: [] });

        if (!productTypes[item.pm]) productTypes[item.pm] = [];

        if (!Object.values(productTypes[item.pm]).includes(item.q))
          productTypes[item.pm].push(item.q);
        // if (!productTypes[item.q]) productTypes[item.q] = [];
      });
      console.log("prod", productTypes);
      // this.state.products = productByType;
      this.setState({ products: productByType });
      this.setState({ productTypes: productTypes });
      // debugger;

      this.state.ws.onopen = () => {
        console.log("connection open");
      };

      console.log("component did mount - HOC");
      this.state.ws.onmessage = (evt) => {
        const serverData = JSON.parse(evt.data);
        // debugger;
        let newProducts = this.getNewProducts(serverData);

        this.setState({ stock: newProducts });
        // console.log(Products);
      };

      this.state.ws.onclose = () => {
        console.log("disconnected from server");
      };
    }

    getNewProducts = (serverData) => {
      let type = this.state.type;
      let prevData = this.state.stock;
      let newProducts = [];
      let newdata = [];
      serverData.data.forEach((item) => {
        newdata[item.s] = { ...item };
      });
      this.state.products[type].forEach((item, index) => {
        newProducts[item.s] = { ...item, history: [] };
        if (newdata[item.s]) {
          newProducts[item.s] = { ...newdata[item.s] };
        }
        if (prevData && prevData[item.s]) {
          let history = prevData[item.s].history || [];
          history.push({
            time: new Date(),
            value: item.c,
          });
          newProducts[item.s].history = history.slice(-5);
        } else {
          newProducts[item.s].history = [];
        }
      });

      return newProducts;
    };
    render() {
      // console.log("this.state", this.state);
      return (
        <WrappedComponent
          serverResponse={this.state.stock}
          productTypes={this.state.productTypes}
          onTypeChange={this.state.setType}
          {...this.props}
        />
      );
    }
  };
}
