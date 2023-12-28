import { Card, CardBody, CardTitle, Col, Row, Table } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

import * as orderActions from "../redux/order/action";
import OrderDetail from "../components/dashboard/OrderDetail";

const cookies = new Cookies();

function Order() {
  // Redux
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  // Order detail modal
  const [orderDetail, setOrderDetail] = useState(false);
  const closeModal = () => {
    setOrderDetail(!orderDetail);
  };

  const [detailData, setDetailData] = useState([]);
  const handleShowOrderDetail = (data) => {
    setDetailData(data);
    closeModal();
  };

  // Get the order
  useEffect(() => {
    dispatch(orderActions.getAllOrder());
  }, [dispatch]);

  // Handle confirm
  const handleConfirm = (orderId) => {
    cookies.set("orderId", orderId);
    dispatch(orderActions.confirmOrder({ confirm: true })).then((res) => {
      window.alert(res.payload.message);
      window.location.reload();
    });
  };

  return (
    <div>
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
                        <th>Status</th>
                        <th>Actions</th>
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
                              <p>
                                {item.STATUS_ORDER
                                  ? "Comfirmed!"
                                  : "Waiting confirm..."}
                              </p>
                            </td>
                            <td>
                              <div className="d-flex">
                                <button
                                  className="btn btn-info"
                                  onClick={() =>
                                    handleShowOrderDetail(item.OrderDetails)
                                  }
                                >
                                  Show Order Detail
                                </button>
                                {item.STATUS_ORDER ? (
                                  <td></td>
                                ) : (
                                  <button
                                    className="btn btn-success ms-2"
                                    onClick={() =>
                                      handleConfirm(
                                        item.OrderDetails[0].ORDER_ID
                                      )
                                    }
                                  >
                                    Verifytion
                                  </button>
                                )}
                              </div>
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
      <OrderDetail
        isOpen={orderDetail}
        closeModal={closeModal}
        data={detailData}
      />
    </div>
  );
}

export default Order;
