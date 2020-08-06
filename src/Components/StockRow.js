import React from "react";
import { Row, Col, Button } from "react-bootstrap";
function StockRow({ stock }) {
  //   if (!stock.b) console.log("stock", stock);
  //   console.log("stock", stock);
  //   const getValueColor = () => {
  //     if (!stock || stock.history.length === 0) return null;
  //     // console.log("stock", stock);
  //     // debugger;
  //     if (stock.c < stock.history.slice(-2)[0].value) {
  //       return "red";
  //     } else if (stock.c > stock.history.slice(-2)[0].value) {
  //       return "green";
  //     } else {
  //       return null;
  //     }
  //   };

  const calculateChange = () => {
    if (!stock) return "";
    let latestPrice = parseFloat(parseFloat(stock.l).toFixed(8));

    if (stock.o > latestPrice) {
      return (
        <span className="text-danger">{`-${getStockFluctuatePercent(
          latestPrice
        )}%`}</span>
      );
    } else
      return (
        <span className="text-success">{`+${getStockFluctuatePercent(
          latestPrice
        )}%`}</span>
      );
  };
  const getStockFluctuatePercent = (latestPrice) =>
    (((stock.o - latestPrice) / stock.o) * 100).toFixed(2);
  return (
    <Row>
      <Col xs={4}>
        {/* <Button  variant="outline-primary">
          {stock.qa}
        </Button>{" "} */}
        {/* {stock.b ? stock.b : "empty"} not getting b for all updated vlaues*/}
        {stock.s}
      </Col>
      <Col>{stock.o} </Col>
      <Col>{stock.l} </Col>
      <Col>{calculateChange()}</Col>
    </Row>
    // <>
    //   <li style={{ color: getValueColor() }}>
    //     {stock.s} - {stock.o} - <b>{stock.l}</b> <b>{calculateChange()}</b>
    //   </li>
    // </>
  );
}

export default StockRow;
