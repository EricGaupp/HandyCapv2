//import SplashImage from "../images/splash.jpeg";

// const SplashContainer = styled.div`
// 	position: relative;
// 	width: 100%;
// 	height: 100%;
// 	background-attachment: fixed;
// 	background-repeat: no-repeat;
// 	background-size: cover;
// 	background-position: 50% 50%;
// 	background-image: url(${SplashImage});
// 	z-index: -1;
// `;
import React from "react";
import Hero from "./Hero";
import Overview from "./Overview";

const Home = () => {
  return (
    <>
      <Hero />
      <Overview />
    </>
  );
};

export default Home;
