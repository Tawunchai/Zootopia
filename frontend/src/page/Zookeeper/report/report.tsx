import { ClipboardPlus } from "lucide-react";
import { Link } from "react-router-dom";
import "./report.css";

const report = () => {
  return (
    <div style={{display:"flex"}}>
      <h1 className="header-report-box"><ClipboardPlus size={28} style={{marginRight:"10px"}} />Report</h1>
      <Link to="/create-report"><h1 className="header-createreport-box"><ClipboardPlus size={28} style={{marginRight:"10px"}} />Create Report</h1></Link>
    </div>
  )
}

export default report
