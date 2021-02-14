import React from "react";
import WinnerCard from "../components/winner-card";

export default function WinnerRoom(props){
  return(
    <div className="d-flex justify-content-center align-items-center">
      <h1>WINNER</h1>
      <WinnerCard
        business={props.business}
      />
    </div>
  );
}
