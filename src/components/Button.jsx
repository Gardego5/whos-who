import styled from "styled-components";

const Button = styled.button`
  height: ${({ h }) => h};
  width: ${({ w }) => w};
  position: ${({ p }) => p};
  top: ${({ t }) => t};
  left: ${({ l }) => l};
  border-radius: ${({ br }) => br};
  margin: 50px;
  font-size: 25px;
  &:hover {
    background-color: #c9c9c9;
    cursor: pointer;
  }
  &:active {
    background-color: #c9c9c9;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
  overflow: hidden;
`;

export default Button;
