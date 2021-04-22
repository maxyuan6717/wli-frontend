import styled from "styled-components";
import ColorImg from "./color";

const StyledCard = styled.div`
  margin: 10px;
  transition: box-shadow 0.2s;
  border-radius: 12px;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    box-shadow: 2px 4px 8px 2px rgba(0, 0, 0, 0.3);
  }
`;

const StyledImg = styled.img``;

const Image = ({ src, color, data, setIndx, index }) => {
  return (
    <StyledCard
      onClick={() => {
        setIndx(index);
      }}
    >
      {src && !color ? (
        <StyledImg src={src} height={300} />
      ) : (
        <div>
          <ColorImg color={color} caption={data.caption} />
        </div>
      )}
    </StyledCard>
  );
};

export default Image;
