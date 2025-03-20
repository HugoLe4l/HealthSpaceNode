import "./tag01.css"
import { useState } from "react"

function Tag01({ Image, nome}) {
  return (
    <div className="Tag01">
      <img src={Image} alt="" />
      <p>{nome}</p>
    </div>
  );
}

export default Tag01;
