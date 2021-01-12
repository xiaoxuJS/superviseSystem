import styled from 'styled-components';

import logo from '../../utils/images/login-bg.jpg';

export const BasicLayoutBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  background-image: url(${logo});
  background-size: cover;
  background-position: center 0;
  h1{
    width: 640px;
    color: cyan;
    font-size: 32px;
    font-weight: 500;
    border-bottom: 2px solid #03d2d2;
    position: relative;
    top: 40vh;
    left: 50vw;
    margin-left: -320px;
  }
  h2{
    color: #ffffff;
    font-size: 42px;
    position: relative;
    top: 40vh;
    left: 50vw;
    margin-left: -60px;
  }
`