import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 2;
`;

function Recommendation({ tags }) {
  const { currentVideo } = useSelector((state) => state.video);
  const [videos, setVideos] = useState([]);
  const API_URL = process.env.REACT_APP_API_URI;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${API_URL}/videos/tags/?tags=${tags}`);
        const videoArr = res.data.filter((r) => r._id !== currentVideo._id);
        setVideos(videoArr);
      } catch (error) {}
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
}

export default Recommendation;
