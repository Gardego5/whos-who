import React from "react";
import Card from '../components/Card'
import styled from "styled-components";
const StyledContainer = styled.div`
  & header {
    text-align: center;
    border: 2px solid white;
    background-color: darkblue;
    color: white;
  }
  & header h1 {
    margin: 0;
  }
  & div.flex-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 1rem;
  }
`;
const Result = () => {
  return <StyledContainer>
 <header>

  <h1>Who's Who<span style={{color: "red"}}>?</span></h1>
 </header>
 <Card>
  <h3>Here are your results:</h3>
 </Card>
  

  </StyledContainer>
}

export default Result;
