import { Layers } from "lucide-react";
import Event1 from "../../../assets/zooEvent1.jpg";
import Event2 from "../../../assets/zooEvent2.jpg";
import { Link } from "react-router-dom";
import "./event.css";

const event = () => {
  return (
    <div>
      <div style={{display:"flex"}}>
        <h1 className="header-event-box">
          <Layers size={24} style={{ marginRight: "10px" }} />
          Event
        </h1>
        <Link to="/create-event"><h1 className="header-event-box">Create Event</h1></Link>
      </div>
      <div className="container">
        <div className="card__container">
          <article className="card__article">
            <img
              src={Event1}
              alt="image"
              style={{
                width: "240px",
                height: "240px",
                borderRadius: "1.5rem",
              }}
            />

            <div className="card__data">
              <span className="card__description">Zoo Nights</span>
              <h2 className="card__title">special showcase in Zone A</h2>
              <a href="#" className="card__button">
                Read More
              </a>
            </div>
          </article>

          <article className="card__article">
            <img
              src={Event2}
              alt="image"
              style={{
                width: "240px",
                height: "240px",
                borderRadius: "1.5rem",
              }}
            />

            <div className="card__data">
              <span className="card__description">Zoo Boo</span>
              <h2 className="card__title">special showcase in Zone C</h2>
              <a href="#" className="card__button">
                Read More
              </a>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default event;
