import { useEffect, useState } from "react";
import axios from "axios";

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
  const [show, setShow] = useState(true);

  const handleOpen = () => {
    setShow(!show);
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
  const [KEY, setKEY] = useState("KEY");
  const [VALUE, setVALUE] = useState("VALUE");

  // Get the products from API
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce-camping.onrender.com/api/product/getAllProduct"
        );

        setProducts(response.data.elements);
      } catch (error) {
        console.log("Error during fetching products:", error);
      }
    };

    fetchProducts();
  }, [show]);
  // console.log(products);

  // Post the products
  const createNewProduct = async (productData) => {
    try {
      const response = await axios.post(
        "https://ecommerce-camping.onrender.com/api/product/createProduct",
        productData
      );

      alert("Successfully", "Add new Product successfully");
      setShow(false);
      const data = await response.data;
      console.log("Product created: ", data);
    } catch (error) {
      console.log("Error during new product: ", error);
    }
  };

  // Form add product
  const renderFormAddProduct = () => {
    return (
      <div className="card mt-4">
        <div className="card-body">
          <h4 className="card-title">Add Product</h4>
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
                onChange={transformImage}
              />
            </div>
            <div className="mb-3 border">
              {!!image && (
                <img src={image.base64StringImg} alt="product" height={80} />
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
        </div>
      </div>
    );
  };

  // Process image to base64
  const transformImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const base64String = e.target.result;
      setImage({
        file: file,
        base64StringImg: base64String,
      });
    };

    reader.readAsDataURL(file);
  };

  // Trannsform data to formData
  function objectToFormData(obj) {
    const formData = new FormData();

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }

    return formData;
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newProduct = {
      NAME: name,
      PRICE: price,
      STOCK: stock,
      CD: CD,
      CATEGORY_ID: categoryID,
      PRODUCT_ATTRIBUTE: [
        {
          [KEY]: name,
          [VALUE]: productAttributes,
        },
        {
          [KEY]: name,
          [VALUE]: productAttributes,
        },
      ],
    };

    const file = {
      path: image ? image.base64StringImg : "",
      filename: image ? image.file.name : "",
    };

    // Transform to formData
    const formData = objectToFormData({newProduct});
    // formData.append("file", file);

    // Show Data
    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });
    console.log(newProduct.PRODUCT_ATTRIBUTE);

    // Post API
    // createNewProduct(file);
  };

  return (
    <>
      <div className="menu">
        <div className="add-menu mb-3">
          <Button className="btn" color="success" onClick={handleOpen}>
            Add Product
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
                        {products === null ? (
                          <tr>
                            <td>
                              <h5 className="mt-4">Loading...</h5>
                            </td>
                          </tr>
                        ) : (
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
                                  <button className="btn btn-primary">
                                    Edit
                                  </button>
                                  <button className="btn btn-danger ms-3">
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
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
    </>
  );
}

export default Products;
