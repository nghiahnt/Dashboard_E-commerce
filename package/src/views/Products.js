import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";

import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";

function Products() {
  // Handle show the renderForm
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState(null);

  const handleOpen = () => {
    setShow(!show);
    if (showEdit === true) {
      setShow(false);
      setShowEdit(false);
    }
  };

  // Initialize state form product
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [CD, setCD] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [productAttributes, setProductAttributes] = useState("");

  // Key - value of product attribute
  const [KEY, setKEY] = useState("color");
  const [VALUE, setVALUE] = useState("hat");

  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview)
    }
  }, [image])

  const handlePreviewImg = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImage(file);
  }

  // Get the products from API - ok
  const [products, setProducts] = useState(null);
  // API doesn't exist data - change "true" if have "data"
  const [mainAPI, setMainAPI] = useState(false);
  useEffect(() => {
    if (mainAPI) {
      axios
        .get("https://ecommerce-camping.onrender.com/api/product/getAllProduct")
        .then((res) => {
          setProducts(res.data.elements);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get("https://fakestoreapi.com/products")
        .then((res) => {
          const data = res.data;
          setProducts(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [products, mainAPI]);
  // console.log(products);

  // Post the products - not ok
  const handleAddProduct = (productData) => {
    axios
      .post(
        "https://ecommerce-camping.onrender.com/api/product/createProduct",
        productData
      )
      .then((res) => {
        alert("Successfully", "Add new Product successfully");
        setShow(false);
        console.log("Product created: ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Delete a Product
  const handleDelete = (id) => {
    axios
      .delete(
        `https://ecommerce-camping.onrender.com/api/product/deleteProduct/${id}`
      )
      .then((res) => {
        console.log(res);
        window.alert("Message", "Product deleted successfully");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // Patch a Product
  const [productById, setProductById] = useState(null);
  const idData = (id) => {
    setId(id);
    setShowEdit(true);
    setShow(true);
    // Fetch API product with id to render to form edit
    axios
      .get(
        `https://ecommerce-camping.onrender.com/api/product/getProductId/${id}`
      )
      .then((res) => {
        const data = res.data.elements;
        setProductById(data);
      })
      .catch((err) => console.log(err));
  };
  const handlePatch = (id, data) => {
    axios
      .patch(
        `https://ecommerce-camping.onrender.com/api/product/updateProduct/${id}`,
        data
      )
      .then((res) => {
        console.log(res.data);
        window.alert("Message", "Product updated successfully");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // Submit from edit or add to product
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (showEdit) {
      // Form edit - send edit data to server
      // const data = {} // Edited data
      // handlePatch(id, data);
    } else {
      // Form add - send add data to server
      // const data = {} // Added data
      // handleAddProduct(data)
    }
  };

  // Form add product
  const renderFormAddProduct = () => {
    return (
      <div className="card mt-4">
        <div className="card-body">
          <h4 className="card-title">
            {showEdit ? "Edit product" : "Add product"}
          </h4>
          <form onSubmit={handleSubmitForm}>
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="priceInput" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="priceInput"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="StockInput" className="form-label">
                Stock
              </label>
              <input
                type="text"
                className="form-control"
                id="StockInput"
                placeholder="Enter Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
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
            <div className="mb-3">
              <label htmlFor="categoryInput" className="form-label">
                Category ID
              </label>
              <input
                type="text"
                className="form-control"
                id="categoryInput"
                placeholder="Enter Category"
                value={categoryID}
                onChange={(e) => setCategoryID(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="productAttributeInput"
                className="form-label d-flex"
              >
                Product Attribute <p className="ms-1">(Description)</p>
              </label>
              <input
                type="text"
                className="form-control"
                id="productAttributeInput"
                placeholder="Enter Product Attribute"
                value={productAttributes}
                onChange={(e) => setProductAttributes(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="imageInput" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="imageInput"
                onChange={(e) => handlePreviewImg(e)}
              />
            </div>
            <div className="mb-3 border">
              {!!image && <img src={image.preview} alt="product" height={80} />}
            </div>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="menu">
        <div className="add-menu mb-3">
          <Button
            className="btn"
            color={showEdit ? "warning" : "success"}
            onClick={handleOpen}
          >
            {showEdit ? "Edit Product" : "Add Product"}
          </Button>
        </div>

        {show && renderFormAddProduct()}

        <div className="menu-table">
          <div>
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">List products</CardTitle>
                    <CardSubtitle className="mb-3 text-muted" tag="h6">
                      List the products of E-commerce PJ
                    </CardSubtitle>

                    <Table
                      className="no-wrap mt-3 algin-middle"
                      responsive
                      borderless
                    >
                      <thead>
                        <tr>
                          <th>Type product</th>
                          <th>Image</th>
                          <th>CategoryID</th>
                          <th>CD</th>
                          <th className="ml-4">Status</th>
                          <th>Management</th>
                        </tr>
                      </thead>

                      <tbody>
                        {mainAPI === true
                          ? !!products &&
                            products.map((item, index) => (
                              <tr
                                className="border-top border-bottom"
                                key={index}
                              >
                                {/* Type product */}
                                <td>
                                  <div className="p-2 ms-3">
                                    <h6 className="mb-0">{item.NAME}</h6>
                                    <span className="text-muted">
                                      {item.ProductAttributes[0].VALUE}
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  <img
                                    src={item.IMAGE_PATH}
                                    alt="Thumbnail"
                                    height={50}
                                  />
                                </td>
                                <td>
                                  <h6 className="ms-4">{item.CATEGORY_ID}</h6>
                                </td>
                                <td>
                                  <h6>{item.CD}</h6>
                                </td>
                                <td>
                                  <div>
                                    <h6>Price: {item.PRICE}$</h6>
                                    <h6>Quantity: {item.STOCK}</h6>
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    <button
                                      className="btn btn-primary"
                                      onClick={(e) => idData(item.id)}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="btn btn-danger ms-3"
                                      onClick={(e) => handleDelete(item.id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          : !!products &&
                            products.map((item, index) => (
                              <tr
                                className="border-top border-bottom"
                                key={index}
                              >
                                {/* Type product */}
                                <td>
                                  <div className="p-2 ms-1">
                                    <h6 className="mb-0">{item.title}</h6>
                                    <span className="text-muted">
                                      {item.description}
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  <img
                                    src={item.image}
                                    alt="Thumbnail"
                                    height={50}
                                  />
                                </td>
                                <td>
                                  <h6 className="ms-4">{item.category}</h6>
                                </td>
                                <td>
                                  <h6>{item.CD}trongnghia</h6>
                                </td>
                                <td>
                                  <div>
                                    <h6>Price: {item.price}$</h6>
                                    <h6>Quantity: {item.STOCK}10</h6>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex">
                                    <button
                                      className="btn btn-primary"
                                      onClick={(e) => idData(item.id)}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="btn btn-danger ms-3"
                                      onClick={(e) => handleDelete(item.id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
