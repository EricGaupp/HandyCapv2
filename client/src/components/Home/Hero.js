import React from "react";
import styled from "styled-components";
import splash from "../../images/splash.png";

const HeroDiv = styled.div`
  background-image: url(${splash});
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;

  height: 700px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Hero = () => (
  <HeroDiv>
    <h1>The Best Score Tracking App on the Internet</h1>
  </HeroDiv>
);

export default Hero;
