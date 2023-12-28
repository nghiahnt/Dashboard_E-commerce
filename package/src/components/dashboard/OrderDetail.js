import { useEffect } from "react";
import { Modal, ModalBody, ModalHeader, Table } from "reactstrap";

function OrderDetail(options) {
  console.log(options.data);
  return (
    <div>
      <Modal
        isOpen={options.isOpen}
        centered
        className="modal-overlay"
        style={{ "min-width": "1000px" }}
      >
        <ModalHeader className="row">
          <h3 className="d-flex justify-content-center">
            List Order
            <span
              className="ms-5"
              style={{ cursor: "pointer" }}
              onClick={options.closeModal}
            >
              &times;
            </span>
          </h3>
        </ModalHeader>
        <ModalBody>
          <Table className="np-wrap" borderless responsive>
            <thead className="border-bottom">
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Quantity</th>
              </tr>
            </thead>
            {options?.data?.map((item, index) => (
              <tbody>
                <tr key={index}>
                  <td>
                    <h6>{item?.Product?.NAME}</h6>
                  </td>
                  <td>
                    <img
                      src={item?.Product?.IMAGE_PATH}
                      alt="thumbnail"
                      height={100}
                    />
                  </td>
                  <td>
                    <h6>Quantity: {item?.QUANTITY}</h6>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default OrderDetail;
