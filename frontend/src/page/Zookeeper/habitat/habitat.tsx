import { LayoutDashboard, CopyPlus, BrickWall } from "lucide-react";
import Habitat1 from "../../../assets/landscape-1.png";
import Habitat2 from "../../../assets/landscape-2.png";
import Habitat3 from "../../../assets/landscape-3.png";
import "./stylehabitat.css";

const habitat = () => {
  return (
    <div>
      <div style={{display:"flex"}}>
        <h1 className="header-habitat-box">
          <LayoutDashboard size={24} style={{ marginRight: "10px" }} />
          Habitat
        </h1>
        <h1 className="header-habitatADD-box">
          <CopyPlus size={24} style={{ marginRight: "10px" }} />
          ADD Habitat
        </h1>
        <h1 className="header-habitatADD-box">
          <BrickWall size={24} style={{ marginRight: "10px" }} />
          Quantity
        </h1>
      </div>
      <h1 className="header-zonehabitatA-box">Zone A</h1>
      <div>
        <h1 className="header-zonehabitatB-box">Zone B</h1>
      </div>
      <div></div>
      <h1 className="header-zonehabitatC-box">Zone C</h1>
      <div></div>
    </div>
  );
};

export default habitat;
