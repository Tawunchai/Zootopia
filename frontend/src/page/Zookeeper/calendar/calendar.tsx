import { Calendar } from "lucide-react";
import "./calendar.css";

const calendar = () => {
  return (
    <div>
      <h1 className="header-calendar-box"><Calendar size={24} style={{marginRight:"10px"}} />Calendar</h1>
    </div>
  )
}

export default calendar
