import styled from "styled-components";

const StyledColor = styled.div`
  height: 300px;
  width: 300px;

  position: relative;
  overflow: hidden;
`;

const StyledLetter = styled.span`
  font-family: urw-din, sans-serif;
  font-weight: 100;
  opacity: 0.5;
  font-size: 350px;
  line-height: 300px;
  color: white;
  position: absolute;
  left: -30px;
  text-transform: capitalize;
  letter-spacing: -30px;
`;

const ColorImg = ({ color, caption }) => {
  return (
    <StyledColor style={{ backgroundColor: color }}>
      <StyledLetter>{caption}</StyledLetter>
    </StyledColor>
  );
};

export default ColorImg;
