import { Button, Card, CardBody, CardTitle, Col, Row, Table } from "reactstrap";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";

import * as discountActions from "../redux/discount/action";
import FormControl from "../components/dashboard/FormControl";
import FormElement from "../components/dashboard/FormElement";

const cx = classNames.bind();

function Discount() {
  // Redux
  const dispatch = useDispatch();
  const allDiscount = useSelector(
    (state) => state.discount.allDiscount
  );
  console.log(allDiscount);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showEdit) {
      const newDiscount = {
        NAME: name,
        VALUE: value,
      };
      dispatch(discountActions.createDiscount(newDiscount)).then(
        (res) => {
          window.alert(res.payload.message);
          window.location.reload();
        }
      );
    } else {
      const editDiscount = {
        NAME: name,
        VALUE: value,
      };
    }
  };

  // Get all discount types
  useEffect(() => {
    dispatch(discountActions.getAllDiscount());
  }, [dispatch]);

  // Handle delete
  const handleDelete = (id) => {
    dispatch(discountActions.deleteDiscount(id)).then((res) => {
      window.alert(res.payload.message);
      window.location.reload();
    });
  };

  return (
    <div className="menu">
      <div className="add-menu mb-2">
        <Button className="btn" color="success" onClick={handleShow}>
          Add Discount Type
        </Button>
      </div>

      {show && (
        <FormControl>
          <h4 className="card-title">
            {showEdit ? "Edit Discount Type" : "Add Discount Type"}
          </h4>
          <form onSubmit={handleSubmit}>
            <FormElement
              name="Name"
              type="text"
              placeholder="Enter discount type"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormElement
              name="Value"
              type="text"
              placeholder="Enter the value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className={cx("btn mt-2", {
                "btn-success": !showEdit,
                "btn-warning": showEdit,
              })}
              type="submit"
            >
              {showEdit ? "Edit Menu" : "Add Menu"}
            </button>
          </form>
        </FormControl>
      )}

      <div className="menu-table">
        <div className="box-menu-table">
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">List Discount Type</CardTitle>
                  <Table
                    className="np-wrap mt-3 align-middle"
                    responsive
                    borderless
                  >
                    <thead className="border-bottom">
                      <tr>
                        <th>Code</th>
                        <th>Discount Type</th>
                        <th>Status</th>
                        <th>Usage Limit</th>
                        <th>Management</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allDiscount && allDiscount.length !== 0 ? (
                        allDiscount.map((item, index) => (
                          <tr className="border-bottom" key={index}>
                            <td>
                              <h6>{item.CODE}</h6>
                            </td>
                            <td>
                              <div>
                                <h6>{item.DiscountType.NAME}</h6>
                                <h6>Value: {item.DiscountType.VALUE}</h6>
                              </div>
                            </td>
                            <td>
                              <div>
                                <h6>Start day: {item.START_DATE}</h6>
                                <h6>End day: {item.END_DATE}</h6>
                                <h6>Active: {item.IS_ACTIVE ? "Yes" : "No"}</h6>
                              </div>
                            </td>
                            <td>
                                <h6 className="ms-3">{item.USAGE_LIMIT}</h6>
                            </td>
                            <td>
                              <div className="d-flex">
                                <button className="btn btn-warning">
                                  Edit
                                </button>
                                <button
                                  className="btn btn-danger ms-3"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td>
                            <h3>Loading...</h3>
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
    </div>
  );
}

export default Discount;
