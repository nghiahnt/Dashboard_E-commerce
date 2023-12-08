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
import { useState, useEffect } from "react";

import axios from "axios";

import images from "../assets/images/blogs";
import FormElement from "../components/dashboard/FormElement";

function BlogPage() {
  // Initialize states
  const [blogs, setBlogs] = useState([
    {
      TITLE: "Bà Na Hill - Đường lên tiên cảnh",
      DESC: "There’s not really best or worst time to visit Bana Hills, with travel possible all year round. If you desire to have great photos of Legendary Golden Bridge, April – August is your perfect time but be aware of thousands visitors.",
      image: images.thumbnail,
      id: 1,
    },
  ]);
  const [blogById, setBlogById] = useState();
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState();

  // Blog states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    file.path = URL.createObjectURL(file); // Create Blob image
    setImage(file);
  };
  // Remove blob image
  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview);
    };
  }, [image]);

  const handleShow = () => {
    setShow(!show);
    if (showEdit === true) {
      setShow(false);
      setShowEdit(false);
    }
  };

  const idData = (id) => {
    setId(id);
    setShowEdit(true);
    setShow(true);
    // Get blog by id
    axios
      .get(`https://ecommerce-camping.onrender.com/api/blog/getBlogId/${id}`)
      .then((res) => {
        setBlogById(res.data.elements);
      })
      .catch((err) => console.log("Error: ", err));
  };

  // Handler API
  // Get Blogs
  useEffect(() => {
    axios
      .get("https://ecommerce-camping.onrender.com/api/blog/getAllBlog")
      .then((res) => {
        // setBlogs(res.data);
        console.log("Get blog finished", res.data.elements);
      })
      .catch((err) => console.log("Error: ", err));
  }, [blogs]);

  // Post Blogs
  const addNewBlog = (data) => {
    axios
      .post("https://ecommerce-camping.onrender.com/api/blog/createBlog", data)
      .then((res) => {
        window.alert("Blog created successfully");
        setBlogs(""); // Re-render the blog
        console.log(res.data.elements);
      })
      .catch((err) => console.log("Error: ", err));
  };

  // Edit Blog
  const editBlog = (id, data) => {
    axios
      .patch(
        `https://ecommerce-camping.onrender.com/api/blog/updateBlog/${id}`,
        data
      )
      .then((res) => {
        window.alert("Blog updated successfully");
        setBlogs(""); // Re-render the blog
        console.log(res.data);
      });
  };

  // Delete Blog
  const deleteBlog = (id) => {
    axios
      .delete(
        `https://ecommerce-camping.onrender.com/api/blog/deleteBlog/${id}`
      )
      .then((res) => {
        console.log(res.data);
        window.alert("Blog deleted successfully");
        setBlogs(""); // Re-render the blog
      })
      .catch((err) => console.log("Error: ", err));
  };

  // Handle submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Add blog - data
    if (!showEdit) {
      const newBlog = {
        TITLE: title,
        DESC: description,
      };
      formData.append("body", newBlog);
      formData.append("file", image);
      addNewBlog(formData);
    }
    // Edit blog - data
    else {
      const editedBlog = {
        TITLE: title,
        DESC: description,
      };
      formData.append("body", editedBlog);
      formData.append("file", image);
      editBlog(id, formData);
    }
  };

  return (
    <>
      <div className="menu">
        <div className="add-menu mb-3">
          <Button
            className="btn"
            color={showEdit ? "warning" : "success"}
            onClick={handleShow}
          >
            {showEdit ? "Edit Blog" : "Add Blog"}
          </Button>
        </div>

        {show && (
          <div className="card mt-4 mb-3">
            <div className="card-body">
              <h4 className="card-title">
                {showEdit ? "Edit Blog" : "Add Blog"}
              </h4>
              <form onSubmit={handleSubmit}>
                <FormElement
                  name="Title"
                  type="text"
                  placeholder="Enter blog title..."
                  value={title}
                  onChange={handleChangeTitle}
                />
                <FormElement
                  name="Description"
                  type="text"
                  placeholder="Enter description..."
                  value={description}
                  onChange={handleChangeDescription}
                />
                <FormElement
                  name="Image"
                  type="file"
                  onChange={handleChangeImage}
                />
                <div className="mb-3 border">
                  {image && (
                    <img
                      src={image.path}
                      alt="product"
                      height={80}
                      className="my-2"
                    />
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </form>
            </div>
          </div>
        )}

        <div>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">List Blog</CardTitle>
                  <CardSubtitle>
                    List Blogs of the E-commerce Website
                  </CardSubtitle>

                  <Table
                    className="no-wrap mt-3 algin-middle border-bottom"
                    responsive
                    borderless
                  >
                    <thead>
                      <tr>
                        <th className="mr-5">Title</th>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Management</th>
                      </tr>
                    </thead>

                    {!blogs ? (
                      <tbody>
                        <tr>
                          <td>
                            <h5>Loading...</h5>
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        {blogs.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <h6>{item.TITLE}</h6>
                            </td>
                            <td>
                              <div>
                                <img
                                  src={item.image}
                                  alt="Thumbnail"
                                  height={50}
                                />
                              </div>
                            </td>
                            <td>
                              <p>{item.DESC}</p>
                            </td>
                            <td>
                              <div className="d-flex">
                                <button
                                  className="btn btn-warning"
                                  onClick={() => idData(item.id)}
                                >
                                  Edit
                                </button>
                                <button className="btn btn-danger ms-3" onClick={() => deleteBlog(item.id)}>
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default BlogPage;
