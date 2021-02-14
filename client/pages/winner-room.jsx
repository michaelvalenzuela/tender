import React from "react";
import WinnerCard from "../components/winner-card";

export default function WinnerRoom(props){
  return(
    <div className="d-flex justify-content-center align-items-center">
      <WinnerCard
        business={props.business}
      />
    </div>
  );
}
