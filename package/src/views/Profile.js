import { Card, CardBody, CardTitle, Col, Row, Table } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import * as profileActions from "../redux/profile/action";
import { useEffect } from "react";

function Profile() {
  // Redux
  const dispatch = useDispatch();
  const allProfile = useSelector((state) => state.profile.allProfile);
    console.log(allProfile);

  useEffect(() => {
    dispatch(profileActions.getAllProfile())
  }, [dispatch]);

  return (
    <div className="menu-table">
      <div className="box-menu-table">
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle>List Profile</CardTitle>
                <Table className="np-wrap mt-3 align-middle" responsive borderless>
                  <thead>
                    <th>Name</th>
                    <th>Phone number</th>
                    <th>Home town</th>
                  </thead>
                  <tbody className="border-top">
                    {allProfile && allProfile.length !== 0 ? (
                      <tr>
                        <td>
                          <h6>Xuan Xuan</h6>
                        </td>
                        <td>
                          <h6>0999999</h6>
                        </td>
                        <td>
                          <h6>Home town</h6>
                        </td>
                      </tr>
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
  );
}

export default Profile;
