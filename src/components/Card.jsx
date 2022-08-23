import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: ${({ w }) => w};
  height: ${({ h }) => h};
  border: ${({ b = "1px solid black" }) => b};
  border-radius: ${({ br }) => br};
  padding: ${({ p = "0.5rem" }) => p};
  background: ${({ bg }) => bg};
  color: ${({ c }) => c};
  & img {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
  }
  & p {
    text-align: center;
  }
`;

export default Card;
