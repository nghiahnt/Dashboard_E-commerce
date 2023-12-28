import { Card, CardBody, CardTitle, Col, Row, Table } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Cookies from "universal-cookie";

import * as orderActions from "../redux/order/action";

const cookies = new Cookies();

function Order() {
  // Redux
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  // Get the order
  useEffect(() => {
    dispatch(orderActions.getAllOrder());
  }, [dispatch]);

  // Handle confirm
  const handleConfirm = (orderId) => {
    cookies.set("orderId", orderId);
    dispatch(orderActions.confirmOrder({ confirm: true })).then(
      (res) => {
        window.alert(res.payload.message);
        window.location.reload();
      }
    );
  };

  return (
    <div className="menu-table">
      <div className="box-menu-table">
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <CardTitle tag="h4">List Orders</CardTitle>
                <Table
                  className="np-wrap mt-3 align-middle"
                  responsive
                  borderless
                >
                  <thead>
                    <tr className="border-bottom">
                      <th>Name</th>
                      <th>Information</th>
                      <th>Total</th>
                      <th>Order detail</th>
                      <th>Status</th>
                      <th>Confirmation</th>
                    </tr>
                  </thead>

                  <tbody className="border-bottom">
                    {orders && orders.length !== 0 ? (
                      orders.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <h6>{item.NAME}</h6>
                          </td>
                          <td>
                            <div>
                              <p>Address: {item.ADDRESS}</p>
                              <p>Phone: {item.PHONE}</p>
                            </div>
                          </td>
                          <td>
                            <div>
                              <p>Total: {item.TOTAL}</p>
                              <p>
                                Total Discounted:{" "}
                                {item.TOTAL_DISCOUNTD
                                  ? item.TOTAL_DISCOUNTD
                                  : "Un-discounted"}
                              </p>
                            </div>
                          </td>
                          <td>
                            {item.OrderDetails.map((pd, index) => (
                              <div key={index}>
                                <p>{pd.Product.NAME}</p>
                                <img
                                  src={pd.Product.IMAGE_PATH}
                                  alt="thumbnail"
                                  height={80}
                                />
                                <p>Quantity: {pd.QUANTITY}</p>
                              </div>
                            ))}
                          </td>
                          <td>
                            <p>
                              {item.STATUS_ORDER
                                ? "Comfirmed!"
                                : "Waiting confirm..."}
                            </p>
                          </td>
                          <td>
                            {item.STATUS_ORDER ? (
                              <td></td>
                            ) : (
                              <button
                                className="btn btn-success"
                                onClick={() =>
                                  handleConfirm(item.OrderDetails[0].ORDER_ID)
                                }
                              >
                                Verifytion
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>
                          <h4>Loading...</h4>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Order;
