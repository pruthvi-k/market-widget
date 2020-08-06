import React from "react";
import { Nav, Container, Row, Col, NavDropdown } from "react-bootstrap";
import withSocketSubscription from "./WebSocketHOC";
import StockRow from "./StockRow";
function MarketList({ serverResponse, onTypeChange, productTypes }) {
  // debugger;
  let navPills = [];
  for (let key in productTypes) {
    let category = [];
    if (productTypes[key].length > 0) {
      for (let sub in productTypes[key]) {
        category.push(
          <NavDropdown.Item eventKey={`${key}-${sub}`}>
            {productTypes[key][sub]}
          </NavDropdown.Item>
        );
      }
    }
    if (category.length > 1) {
      navPills.push(
        <NavDropdown title={key} id="nav-dropdown">
          {category}
        </NavDropdown>
      );
    } else
      navPills.push(
        <Nav.Item key={key}>
          <Nav.Link eventKey={key}>{key}</Nav.Link>
        </Nav.Item>
      );
  }
  return (
    <>
      <Nav
        variant="pills"
        defaultActiveKey="BTC"
        onSelect={(selectedKey) => onTypeChange(selectedKey)}
      >
        {navPills}
      </Nav>
      <Container>
        <Row>
          <Col xs={4}>
            {/* <Button  variant="outline-primary">
          {stock.qa}
        </Button>{" "} */}
            <h6>Pair</h6>
          </Col>
          <Col>
            <h6>Open Price</h6>
          </Col>
          <Col>
            <h6>Latest Price</h6>
          </Col>
          <Col>
            <h6>Change</h6>
          </Col>
        </Row>

        {serverResponse && (
          <>
            {Object.keys(serverResponse).map((item) => (
              <StockRow
                key={serverResponse[item].s}
                stock={serverResponse[item]}
              ></StockRow>
            ))}
          </>
        )}
      </Container>
    </>
  );
}

export default withSocketSubscription(MarketList);
// import React, { Component } from "react";
// import withSocketSubscription from "./WebSocketHOC";
// class MarketList extends Component {
//   constructor(props) {
//     super(props);
//     // const { websocket } = this.props;
//     // console.log("websocket", websocket);
//     // this.state = { data: this.props.data };
//   }

//   componentDidMount() {
//     console.log("componet did monu", this.props);
//     this.getStockData();
//   }

//   getStockData = () => {
//     fetch(
//       "https://www.binance.com/exchange-api/v1/public/asset-service/product/get-products"
//     )
//       .then((response) => {
//         this.setState({ data: response.json() });
//         console.log("re", response.json());
//       })
//       .then((error) => alert(error));
//   };

//   render() {
//     const { data } = this.props;
//     // console.log("data", data);
//     return (
//       <>
//         <div className="market-list">List</div>
//         {data && (
//           <ul>
//             {data.map((item) => (
//               <li key={item.s}>{item.s}</li>
//             ))}
//           </ul>
//         )}
//       </>
//     );
//   }
// }

// export default withSocketSubscription(MarketList);
// // export default MarketList;
