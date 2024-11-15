import { PawPrint } from "lucide-react";
import "./animal.css";

const animal = () => {
  return (
    <div>
      <h1 className="header-animals-box"><PawPrint size={24} style={{marginRight:"10px"}} />Animal</h1>
    </div>
  );
};

export default animal;
