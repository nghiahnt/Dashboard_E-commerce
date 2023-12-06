// import ProjectTables from "../components/dashboard/ProjectTable";
import {
  Row,
  Button,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
} from "reactstrap";

import axios from "axios";
import { useEffect, useState } from "react";
const Menu = () => {
  // Add categories
  const [show, setShow] = useState(false);

  // Categories
  const [title, setTitle] = useState("");
  const [parentID, setParentID] = useState("");
  const [CD, setCD] = useState("");

  // Form add categories
  const renderAddForm = () => {
    return (
      <div className="card mt-4">
        <div className="card-body">
          <h4 className="card-title">Add category</h4>
          <form onSubmit={handleSubmitForm}>
            <div className="mb-3">
              <label htmlFor="titleInput" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="titleInput"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="parentIdInput" className="form-label">
                Parent ID
              </label>
              <input
                type="text"
                className="form-control"
                id="parentIdInput"
                placeholder="Enter parent ID"
                value={parentID}
                onChange={(e) => setParentID(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cdInput" className="form-label">
                CD
              </label>
              <input
                type="text"
                className="form-control"
                id="cdInput"
                placeholder="Enter CD"
                value={CD}
                onChange={(e) => setCD(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
        </div>
      </div>
    );
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newCategory = {
      TITLE: title,
      PARENT_ID: parentID,
      CD: CD,
    };

    createCategory(newCategory);
    // console.log(newCategory);
  };

  const handleShow = () => {
    setShow(!show);
  };

  // Get category
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce-camping.onrender.com/api/category/getAllCategory"
        );
        setCategory(response.data.elements);
      } catch (error) {
        console.log("Error during fetching category:", error);
      }
    };

    fetchCategory();
  }, [show]);

  // Create new category
  const createCategory = async (categoryData) => {
    try {
      const response = await axios.post(
        "https://ecommerce-camping.onrender.com/api/category/createCategory",
        categoryData
      );
      alert("Add category successfully");
      setShow(false);
      const data = await response.data;
      console.log("Category created:", data);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  console.log(category);

  return (
    <div className="menu">
      <div className="add-menu mb-2">
        <Button className="btn" color="success" onClick={handleShow}>
          Add Category
        </Button>
      </div>

      {show && renderAddForm()}

      <div className="menu-table">
        <div className="box-menu-table">
          <Row>
            <Col lg="12">
              {/* <ProjectTables /> */}
              <Card>
                <CardBody>
                  <CardTitle tag="h5">List Category</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    List the Category of E-commerce PJ
                  </CardSubtitle>

                  <Table
                    className="no-wrap mt-3 align-middle"
                    responsive
                    borderless
                  >
                    <thead>
                      <tr>
                        <th>Type Category</th>
                        <th>CategoryID</th>
                        <th>The number of products</th>
                        <th>CD</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="border-top border-bottom">
                        <td>
                          <div className="p-2 ms-3">
                            <h6 className="mb-0">Men's Clothing</h6>
                            <span className="text-muted">Description text</span>
                          </div>
                        </td>
                        <td>
                          <h6>ExampleID</h6>
                        </td>
                        <td>
                          <h6 className="ms-5">10</h6>
                        </td>
                        <td>
                          <h6>trongnghia</h6>
                        </td>
                        <td className="d-flex justify-content-between">
                          <h6>Almost out of stock</h6>
                          <div>
                            <button className="btn btn-primary">Edit</button>
                            <button className="btn btn-danger ms-3">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>

                      {category === null ? (
                        <>
                          <h5 className="mt-4">Loading...</h5>
                        </>
                      ) : (
                        category.map((item, index) => {
                          return (
                            <tr
                              key={index}
                              className="border-top border-bottom"
                            >
                              <td>
                                <div className="p-2 ms-3">
                                  <h6 className="mb-0">{item.TITLE}</h6>
                                  <span className="text-muted">
                                    Description text
                                  </span>
                                </div>
                              </td>
                              <td>
                                <h6 className="ms-4">{item.id}</h6>
                              </td>
                              <td>
                                <h6 className="ms-5">10</h6>
                              </td>
                              <td>
                                <h6>{item.CD}</h6>
                              </td>
                              <td className="d-flex justify-content-between">
                                <h6>Almost out of stock</h6>
                                <div>
                                  <button className="btn btn-primary">
                                    Edit
                                  </button>
                                  <button className="btn btn-danger ms-3">
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
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
};
export default Menu;
