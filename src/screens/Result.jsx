import React from "react";
import Card from '../components/Card'
import styled from "styled-components";
import Button from "../components/Button";
import { Link } from "react-router-dom";
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
  & Button {
    text-align: center;
  }
`;
const Result = () => {
  return <StyledContainer style={{textAlign: 'center'}}>
 <header>

  <h1>Who's Who<span style={{color: "red"}}>?</span></h1>
 </header>
 <Card>
  <h3 style={{textAlign: 'center'}}>Results</h3>
 </Card>
<Link to='/'><Button h = '30px' m = 'auto' style={{justifyContent: 'center'}}>Home</Button></Link>
 <Link to='/game'><Button h = '30px' m = 'auto' style={{justifyContent: 'center'}}>Play Again</Button></Link>


  </StyledContainer>
}

export default Result;
