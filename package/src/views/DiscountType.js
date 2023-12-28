import { Button, Card, CardBody, CardTitle, Col, Row, Table } from "reactstrap";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";

import * as discountTypeActions from "../redux/discountType/action";
import FormControl from "../components/dashboard/FormControl";
import FormElement from "../components/dashboard/FormElement";

const cx = classNames.bind();

function DiscountType() {
  // Redux
  const dispatch = useDispatch();
  const allDiscountType = useSelector(
    (state) => state.discountType.allDiscountType
  );
  console.log(allDiscountType);

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
      const newDiscountType = {
        NAME: name,
        VALUE: value,
      };
      dispatch(discountTypeActions.createDiscountType(newDiscountType)).then(
        (res) => {
          window.alert(res.payload.message);
          window.location.reload();
        }
      );
    } else {
      const editDiscountType = {
        NAME: name,
        VALUE: value,
      };
    }
  };

  // Get all discount types
  useEffect(() => {
    dispatch(discountTypeActions.getAllDiscountType());
  }, [dispatch]);

  // Handle delete
  const handleDelete = (id) => {
    dispatch(discountTypeActions.deleteDiscountType(id)).then((res) => {
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
                        <th>Name</th>
                        <th>Value</th>
                        <th>Management</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allDiscountType && allDiscountType.length !== 0 ? (
                        allDiscountType.map((item, index) => (
                          <tr className="border-bottom" key={index}>
                            <td>
                              <h6>{item.NAME}</h6>
                            </td>
                            <td>
                              <h6 className="ms-1">{item.VALUE}</h6>
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

export default DiscountType;
