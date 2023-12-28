import { Button, Card, CardBody, CardTitle, Col, Row, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import * as gameCardActions from "../redux/gameCard/action";
import classNames from "classnames/bind";
import Cookies from "universal-cookie";
import { useState } from "react";

const cookies = new Cookies();
const cx = classNames.bind();

function GameCard() {
  // Redux
  const dispatch = useDispatch();
  const allGameCard = useSelector((state) => state.gameCard.allGameCard);
  console.log(allGameCard);

  // Modal add and edit
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="menu">
      <div className="add-menu mb-2">
        <Button className="btn" color="success">
          Add Game Card
        </Button>
      </div>

      <div className="menu-table">
        <div className="box-menu-table">
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">List game card</CardTitle>

                  <Table
                    className="np-wrap mt-3 algin-middle"
                    responsive
                    borderless
                  >
                    <thead className="border-bottom">
                      <tr>
                        <th>Type card</th>
                        <th>Content</th>
                        <th>Information</th>
                        <th>Management</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-bottom">
                        <td>
                          <h6>Trong Nghia</h6>
                        </td>
                        <td>
                          <h6>Xuan Xuan</h6>
                        </td>
                        <td>
                          <div>
                            <h6>Status: </h6>
                            <img src="" alt="thumbnail" height={70} />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <button className="btn btn-warning">Edit</button>
                            <button className="btn btn-danger ms-2">Delete</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
