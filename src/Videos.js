import React, { useEffect, useState } from "react";
import videoLink from "./videoLink";
import { Col, Row, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Icon } from "@iconify/react";

import axios from "axios";

import $ from "jquery";

export default function Videos() {
  const [state, setState] = useState(0);
  const [ip, setIP] = useState("");
  const [recieve, setRecieve] = useState([]);

  let value = 0;
  let arr = [];
  const [like, setLike] = useState(0);
  const [dislike, setdisLike] = useState(0);
  const [views, setViews] = useState(0);
  let likes = 1;
  let dislikes = 1;
  let view = 1;
  useEffect(() => {
    //immediatly invoked function
    (async () => {
      const res = await axios.get("https://geolocation-db.com/json/");
      setIP(res.data.IPv4);
      const data1 = await axios.post("http://localhost:3002/api/getData");

      setRecieve(...recieve, data1.data.data);
    })();
  }, []);
  useEffect(() => {
    console.log(document.getElementById("view"));

    $("#pics").css({
      overflowY: "hidden",
      overflowX: "hidden",
    });
    if (value > 4) {
      $("#pics").css({
        overflowY: "scroll",
        overflowX: "hidden",
      });
    }
  });

  async function playVideo(val) {
    try {
      const checkId = await axios.post("http://localhost:3002/api/Id", {
        id: val,
      });

      if (checkId.data.value == "true") {
        const data1 = await axios.post("http://localhost:3002/api", {
          id: val,
          IP: ip,
        });

        const data = {
          id: val,
          likes: likes,
          dislikes: dislikes,
          IP: ip,
          subscribe: "yes",
          views: view,
        };

        if (data1.data.value === "true") {
        } else {
          setViews(views + 1);
          //id of video is not exists
          const update = await axios.patch(
            "http://localhost:3002/api/update",
            data
          );
          console.log(update);
        }
      } else {
        const data = {
          id: val,
          likes: likes,
          dislikes: dislikes,
          IP: ip,
          subscribe: "yes",
          views: view,
        };
        const data1 = await axios.post("http://localhost:3002/api/data", data);
      }
    } catch (err) {
      // video is not playing
      console.log(err);
    }
  }

  return (
    <div>
      {recieve.map((data) => {
        return (
          <div>
            <Row>
              <Col xl={12} md={12} lg={12} sm={12} xs={12}>
                <Card
                  className="shadow"
                  style={{
                    marginTop: -20,
                    padding: 30,
                    marginRight: 24,
                    backgroundColor: "white",
                    borderBottom: "none",
                    color: "blue",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderRight: "none",
                    borderLeft: "none",
                  }}
                >
                  Video Detail
                </Card>
              </Col>
              <div>
                <Row>
                  <Col xl={12} md={12} lg={12} sm={12} xs={12}>
                    <Card className="shadow">
                      <Card.Body>
                        <Row style={{ padding: 20 }}>
                          <Col xl={8} md={8} lg={8} sm={8} xs={8}>
                            <Col
                              style={{
                                padding: 10,

                                marginLeft: -16,
                                marginTop: -20,
                                paddingBottom: 20,
                                color: "white",
                                borderRadius: 20,
                              }}
                            >
                              <div style={{ color: "black" }}>
                                <video
                                  onPlay={() => {
                                    playVideo(data.id);
                                  }}
                                  id="myVideo"
                                  style={{
                                    width: "95%",
                                    height: "270%",

                                    marginBottom: 10,
                                    border: 2,
                                    marginTop: 10,
                                    borderRadius: 20,
                                  }}
                                  controls
                                >
                                
                                  <source src={data.url} />
                                </video>

                                <div>
                                  <span id="view">
                                    {data.views}
                                    Views
                                  </span>
                                  <span className="ms-auto">
                                    {like === false ? (
                                      <button
                                        style={{
                                          fontSize: 30,
                                          backgroundColor: "white",
                                          outline: "none !important",
                                          border: "none",
                                        }}
                                        onClick={() => {
                                          setLike(true);
                                        }}
                                      >
                                        <Icon icon="ant-design:like-filled" />
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        style={{
                                          fontSize: 30,
                                          backgroundColor: "white",
                                          outline: "none !important",
                                          border: "none",
                                        }}
                                      >
                                        <Icon
                                          onClick={() => {
                                            setLike(false);
                                          }}
                                          icon="ant-design:like-outlined"
                                        />
                                      </button>
                                    )}
                                    {dislike === false ? (
                                      <button
                                        style={{
                                          fontSize: 30,
                                          backgroundColor: "white",
                                          outline: "none !important",
                                          border: "none",
                                        }}
                                        onClick={() => {
                                          setdisLike(true);
                                        }}
                                      >
                                        <Icon icon="ant-design:dislike-outlined" />
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        style={{
                                          fontSize: 30,
                                          backgroundColor: "white",
                                          outline: "none !important",
                                          border: "none",
                                        }}
                                      >
                                        <Icon
                                          onClick={() => {
                                            setdisLike(false);
                                          }}
                                          icon="ant-design:dislike-filled"
                                        />
                                      </button>
                                    )}
                                  </span>
                                </div>
                              </div>
                            </Col>
                          </Col>

                          <Col
                            style={{
                              padding: 10,
                              backgroundColor: "blue",
                              marginLeft: 16,
                              marginTop: -20,
                              paddingBottom: 20,
                              color: "white",
                              borderRadius: 20,
                              border: 1,
                            }}
                          >
                            <div
                              style={{
                                width: "35%",
                                height: "30%",
                                paddingTop: "3%",
                                paddingLeft: "3%",
                                marginLeft: "30%",
                                backgroundColor: "white",
                                marginTop: "10%",
                                borderRadius: "50%",
                              }}
                            >
                              <div
                                style={{
                                  width: "90%",
                                  height: "90%",
                                  paddingTop: "7%",
                                  paddingLeft: "7%",
                                  objectFit: "center",
                                  backgroundColor: "blue",
                                  borderRadius: "50%",
                                }}
                              >
                                <img
                                  src={data.imageUrl}
                                  style={{
                                    width: "90%",
                                    height: "90%",

                                    borderRadius: "50%",
                                  }}
                                />
                              </div>
                            </div>
                            <span
                              style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                fontSize: "100%",
                              }}
                            >
                              <div
                                style={{
                                  marginTop: "5%",
                                  fontSize: "200%",
                                }}
                              >
                                Name
                              </div>
                              <div>0:Followers</div>
                              <div>1:Following</div>
                              <div>Rating</div>
                              <div>Phone Number</div>
                              <div>gmail</div>
                            </span>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
              );
            </Row>
          </div>
        );
      })}
    </div>
  );
}
