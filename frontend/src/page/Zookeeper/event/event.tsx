import { useEffect, useState } from "react";
import { Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { ListEvent } from "../../../services/https";
import { EventsInterface } from "../../../interface/IEvent";
import "./event.css";

const Event = () => {
  const [events, setEvents] = useState<EventsInterface[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await ListEvent();
      if (data) {
        console.log(data);
        setEvents(data);
      }
    };
    loadEvents();
  }, []);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <h1 className="header-event-box">
          <Layers size={24} style={{ marginRight: "10px" }} />
          Event
        </h1>
        <Link to="/create-event">
          <h1 className="header-event-box">Create Event</h1>
        </Link>
      </div>
      <div className="container">
        <div className="card__container">
          {events.map((event, index) => (
            <article key={index} className="card__article">
              <img
                src={`http://localhost:8000/${event.Picture}`} 
                alt="Review Picture"
                style={{
                  width: "240px",
                  height: "240px",
                  borderRadius: "1.5rem",
                  cursor:"pointer",
                }}
              />
              <div className="card__data">
                <span className="card__description">{event.Title}</span>
                <h2 className="card__title">{event.Description}</h2>
                <a href="#" className="card__button">
                  Read More
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Event;
