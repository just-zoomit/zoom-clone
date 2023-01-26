import styled from 'styled-components';

const StyledTextbox = styled.div`
  position: relative;
 
 label {
   position: absolute;
   display: grid;
   place-items: center;
   transform-origin: 0% 0%;
   pointer-events: none;
   top: 4px;
   left: 4px;
   height: 32px;
   width: 90px;
   border-radius: 27px;
   background: #5071fa;
   color: rgb(255 255 255 / 80%);
   transition: 0.3s;
 }

 input {
   width: 300px;
   height: 40px;
   border-radius: 30px;
   background: white;
   border: 1px solid blue;
   borderccolor: blue;
   padding-left: 126px;
   color: rgb(29 26 26 / 96%);
   outline: blue;
   transition: 0.3s;

   &::placeholder {
     color: black;
   }
  
   &:focus, &:valid {
     
     padding-right: 20px;
   }
 }

 & :is(input:focus) ~ label {
   translate: 0 -56px;
   scale: 0.825;
 }
`;



export {  StyledTextbox }