import React, { useEffect, useContext } from "react";
import {
  Row,
  Col,
  Button,
  Container,
  Spinner,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import Axios from "axios";

// Contexts
import StateContext from "../Contexts/StateContext";

function Agencies() {
  const GlobalState = useContext(StateContext);

  const navigate = useNavigate();

  const initialState = {
    dataisLoading: true,
    agenciesList: [],
  };

  function ReducerFuction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "catchAgencies":
        draft.agenciesList = action.agenciesArray;
        break;

      case "loadingDone":
        draft.dataisLoading = false;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  // Request to get all profiles

  useEffect(() => {
    async function GetAgencies() {
      try {
        const response = await Axios.get(
          `https://ci-myhome.herokuapp.com/api/profiles/`
        );

        dispatch({ type: "catchAgencies", agenciesArray: response.data });
        dispatch({ type: "loadingDone" });
      } catch (e) {}
    }
    GetAgencies();
  }, []);

  if (state.dataIsLoading === true) {
    return (
      <div className="container text-center my-5 p-4">
        {" "}
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container>
      <div className="">
        {state.agenciesList.map((agency) => {
          if (agency.agency_name && agency.phone_number)
            return (
              <Row>
                <Col xs={12} md={7} lg={7} xl={7} className="mx-auto">
                  <Card key={agency.id} className="py-3 box">
                    <Card.Img
                      className="p-3 profile-image"
                      variant="top"
                      src={
                        agency.profile_picture
                          ? agency.profile_picture
                          : "https://res.cloudinary.com/dsq1kzjdy/image/upload/v1663351361/media/image-placeholder_ooclbg.png"
                      }
                    />
                    <Card.Body>
                      <Card.Title>
                        {agency.agency_name.substring(0, 100)}
                      </Card.Title>
                      <Card.Text>{agency.bio.substring(0, 250)}..</Card.Text>

                      <Card.Text>
                        Listings: {agency.seller_listings.length}
                      </Card.Text>

                      <Button
                        onClick={() => navigate(`/agencies/${agency.seller}`)}
                        variant="primary"
                      >
                        Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            );
        })}
      </div>
    </Container>
  );
}

export default Agencies;
