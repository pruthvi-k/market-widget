import React from "react";

// This function takes a component...
export default function withSocketSubscription(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        ws: null,
        data: [],
      };
    }

    // single websocket instance for the own application and constantly trying to reconnect.

    componentDidMount() {
      this.connect();
    }

    timeout = 250; // Initial timeout duration as a class variable

    /**
     * @function connect
     * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
     */
    connect = () => {
      var ws = new WebSocket(
        "wss://stream.binance.com/stream?streams=!miniTicker@arr"
      );
      let that = this; // cache the this
      var connectInterval;

      // websocket onopen event listener
      ws.onopen = () => {
        console.log("connected websocket main component");

        this.setState({ ws: ws });

        that.timeout = 250; // reset timer to 250 on open of websocket connection
        clearTimeout(connectInterval); // clear Interval on on open of websocket connection
      };

      // ws.onmessage = (message) => {
      //   console.log("message---", JSON.parse(message.data));
      //   this.setState({ data: message.data });
      // };

      // websocket onclose event listener
      ws.onclose = (e) => {
        console.log(
          `Socket is closed. Reconnect will be attempted in ${Math.min(
            10000 / 1000,
            (that.timeout + that.timeout) / 1000
          )} second.`,
          e.reason
        );

        that.timeout = that.timeout + that.timeout; //increment retry interval
        connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
      };

      // websocket onerror event listener
      ws.onerror = (err) => {
        console.error(
          "Socket encountered error: ",
          err.message,
          "Closing socket"
        );

        ws.close();
      };
    };

    /**
     * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
     */
    check = () => {
      const { ws } = this.state;
      if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
    };

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <WrappedComponent
          websocket={this.state.ws}
          data={this.state.data}
          {...this.props}
        />
      );
    }
  };
}
