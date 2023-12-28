import { Row, Button, Col, Card, CardBody, CardTitle, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import Cookies from "universal-cookie";

import FormControl from "../components/dashboard/FormControl";
import FormElement from "../components/dashboard/FormElement";

import * as menuActions from "../redux/menu/action";
import styles from "./styles/menu.module.scss";

const cx = classNames.bind(styles);
const cookies = new Cookies();

const Menu = () => {
  // Redux
  const dispatch = useDispatch();
  const allMenu = useSelector((state) => state.menu.allMenu);
  // const message = useSelector((state) => state.menu.message);
  const menu = useSelector((state) => state.menu.menu);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  const [title, setTitle] = useState("");
  const [parentId, setParentId] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!showEdit) {
      const newMenu = {
        TITLE: title,
        PARENT_ID: parentId,
      };
      dispatch(menuActions.createMenu(newMenu)).then((res) => {
        console.log("ok");
        window.alert(res.payload.message);
        window.location.reload();
      });
    } else {
      const editMenu = {
        TITLE: title,
        PARENT_ID: parentId,
      };
      dispatch(menuActions.updateMenu(editMenu))
        .then((res) => {
          window.alert(res.payload.message);
          window.location.reload();
        })
    }
  };

  // Get all menu
  useEffect(() => {
    dispatch(menuActions.getAllMenu()).then((res) => {});
  }, [dispatch]);

  useEffect(() => {
    if (menu) {
      setTitle(menu.TITLE);
      setParentId(menu.PARENT_ID);
    }
  }, [menu]);

  // Handle Delete
  const handleDelete = (id) => {
    dispatch(menuActions.deleteMenu(id)).then((res) => {
      window.alert(res.payload.message);
      window.location.reload();
    });
  };

  // Handle Edit
  const handleEdit = (id) => {
    cookies.set("menuId", id);
    dispatch(menuActions.getMenuId(id));
    setShow(true);
    setShowEdit(true);
  };

  return (
    <div className="menu">
      <div className="add-menu mb-2">
        <Button
          className="btn"
          color={showEdit ? "warning" : "success"}
          onClick={handleShow}
        >
          {showEdit ? "Edit Menu" : "Add Menu"}
        </Button>
      </div>
      {show && (
        <FormControl>
          <h4 className="card-title">{showEdit ? "Edit Menu" : "Add Menu"}</h4>

          <form onSubmit={handleSubmit}>
            <FormElement
              name="title"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div>
              <label className="form-lable" htmlFor="parentIdInput">
                Parent ID
              </label>
              <select
                className="form-control"
                id="parentIdInput"
                onChange={(e) => setParentId(e.target.value)}
              >
                <option>--Please choose the ParentID--</option>
                <option>0</option>
                <option>1</option>
              </select>
            </div>
            <button
              className={cx("btn mt-4", {
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
            <Col lg="12">{/* <ProjectTables /> */}</Col>
            <Card>
              <CardBody>
                <CardTitle tag="h5">List Menu</CardTitle>

                <Table
                  className="np-wrap mt-3 align-middle"
                  responsive
                  borderless
                >
                  <thead className="border-bottom">
                    <tr>
                      <th>Title</th>
                      <th>ParentId</th>
                      <th>Management</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allMenu.length !== 0 ? (
                      allMenu.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <h6 className="mt-2">{item.TITLE}</h6>
                          </td>
                          <td>
                            <h6 className="ms-4 mt-2">{item.PARENT_ID}</h6>
                          </td>
                          <td>
                            <div className="d-flex">
                              <button
                                className="btn btn-warning"
                                onClick={() => handleEdit(item.id)}
                              >
                                Edit
                              </button>
                              <button
                                className="ms-2 btn btn-danger"
                                onClick={(e) => handleDelete(item.id)}
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
                          <h4>Loading...</h4>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Menu;
