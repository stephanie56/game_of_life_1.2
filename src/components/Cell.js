import styled from 'styled-components';

const Cell = styled.div`
  width:10px;
  height:10px;
  border-left:1px solid #333;
  border-top:1px solid #333;
  margin:0;
  padding:0;
  float:left;
  background-color: ${props => props.cell ? '#fbb' : '#000'};
`
export default Cell;
