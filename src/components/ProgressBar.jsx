import React from "react";
import styled from "styled-components";

const StyledProgressBar = styled.div`
  border: 1px solid black;
  border-radius: 0.5rem;
  height: 2rem;
  display: grid;
  place-content: center;
  & p {
    margin: 0 0.5rem;
  }
`;

const ProgressBar = ({ round, rounds, tries }) => {
  return (
    <StyledProgressBar>
      <p>{`round ${round} / ${rounds} | ${tries} tries left`}</p>
    </StyledProgressBar>
  );
};

export default ProgressBar;
