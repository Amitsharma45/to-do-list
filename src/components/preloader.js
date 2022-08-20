import { useState } from "react";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-color: red;
`;
const mystyle={
  display :"flex",
  flex :1,
  alignItems :" center",
  justifyContent :" center",
  marginTop : 180
  
};

function Preloader(props ) {
  const {loading}=props;
  
  return (
    <div style={mystyle}>
      <div className="sweet-loading" > 
        <HashLoader  color={'red'} loading={loading} css= {override} size={100} margin={2} />
      </div>
    </div>
  );
}

export default Preloader;