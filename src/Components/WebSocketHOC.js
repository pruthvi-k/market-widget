import React from "react";
import Products from "../mock/products.json";

export default function withSocketSubscription(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null,
        ws: new WebSocket(
          "wss://stream.binance.com/stream?streams=!miniTicker@arr"
        ),
        products: [],
        type: "BTC",
        setType: (type) => {
          // debugger;
          this.setState({ type: type });
        },
      };
    }

    componentDidMount() {
      let productByType = [];
      Products.data.forEach((item) => {
        if (!productByType[item.q]) productByType[item.q] = [];
        productByType[item.q].push({ ...item, history: [] });
      });
      this.state.products = productByType;
      // this.setState({ products: productByType });
      // debugger;

      this.state.ws.onopen = () => {
        console.log("connection open");
      };

      console.log("component did mount - HOC");
      this.state.ws.onmessage = (evt) => {
        const serverData = JSON.parse(evt.data);
        // debugger;
        let newProducts = this.getNewProducts(serverData);

        this.setState({ data: { data: newProducts } });
        // console.log(Products);
      };

      this.state.ws.onclose = () => {
        console.log("disconnected from server");
      };
    }

    getNewProducts = (serverData) => {
      let type = this.state.type;
      console.log("type", type);
      let newProducts = [];
      this.state.products[type].forEach((item, index) => {
        let newdata = serverData.data.filter((k) => k.s === item.s);
        // console.log(
        //   "newdata",
        //   Products.data[index].s,
        //   newdata.length > 0 ? Products.data[index].c + "" + newdata[0].c : ""
        // );
        if (newdata && newdata.length > 0) {
          newProducts.push({
            ...item,
            ...newdata,
            color:
              this.state.products[type][index].c > newdata[0].c
                ? "red"
                : "green",
          });
        } else {
          newProducts.push(this.state.products[type][index]);
        }
      });
      return newProducts;
    };
    render() {
      return (
        <WrappedComponent
          serverResponse={this.state.data}
          onTypeChange={this.state.setType}
          {...this.props}
        />
      );
    }
  };
}
// import React from "react";

// // This function takes a component...
// export default function withSocketSubscription(WrappedComponent) {
//   // ...and returns another component...
//   return class extends React.Component {
//     constructor(props) {
//       console.log("his function takes a component..");
//       super(props);

//       this.state = {
//         ws: this.connect(),
//         data: [],
//       };
//       // this.connect();
//     }

//     // single websocket instance for the own application and constantly trying to reconnect.

//     componentDidMount() {
//       console.log("did mount");
//     }

//     timeout = 250; // Initial timeout duration as a class variable

//     /**
//      * @function connect
//      * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
//      */
//     connect = () => {
//       var ws = new WebSocket(
//         "wss://stream.binance.com/stream?streams=!miniTicker@arr"
//       );
//       console.log("connect called", ws);
//       let that = this; // cache the this
//       var connectInterval;

//       // websocket onopen event listener
//       ws.onopen = () => {
//         console.log("connected websocket main component");

//         // this.setState({ ws: ws });

//         that.timeout = 250; // reset timer to 250 on open of websocket connection
//         clearTimeout(connectInterval); // clear Interval on on open of websocket connection
//       };

//       ws.onmessage = (message) => {
//         console.log("message---", JSON.parse(message.data));
//         this.setState({ data: JSON.parse(message.data) });
//       };

//       // websocket onclose event listener
//       ws.onclose = (e) => {
//         console.log(
//           `Socket is closed. Reconnect will be attempted in ${Math.min(
//             10000 / 1000,
//             (that.timeout + that.timeout) / 1000
//           )} second.`,
//           e.reason
//         );

//         that.timeout = that.timeout + that.timeout; //increment retry interval
//         connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
//       };

//       // websocket onerror event listener
//       ws.onerror = (err) => {
//         console.error(
//           "Socket encountered error: ",
//           err.message,
//           "Closing socket"
//         );

//         ws.close();
//       };
//       return ws;
//     };

//     /**
//      * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
//      */
//     check = () => {
//       const { ws } = this.state;
//       if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
//     };

//     render() {
//       // ... and renders the wrapped component with the fresh data!
//       // Notice that we pass through any additional props
//       return (
//         <WrappedComponent
//           websocket={this.state.ws}
//           data={this.state.data}
//           {...this.props}
//         />
//       );
//     }
//   };
// }
