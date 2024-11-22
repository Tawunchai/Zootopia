import { useEffect, useState } from "react";
import { Layers } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ListEvent,DeleteEventByID } from "../../../services/https";
import { EventsInterface } from "../../../interface/IEvent";
import { Button, Modal, message } from "antd";
import "./event.css";

const Event = () => {
  const [events, setEvents] = useState<EventsInterface[]>([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<string>("");
  const [deleteId, setDeleteId] = useState<number | undefined>();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

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

  const handleOk = async () => {
    setConfirmLoading(true);
    console.log("Attempting to delete animal with ID:", deleteId);

    try {
      const res = await DeleteEventByID(deleteId);
      if (res) {
        setOpen(false);
        messageApi.open({
          type: "success",
          content: "Successfully deleted!",
        });
        getAnimals();
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "An error occurred!",
      });
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const showModal = (val: EventsInterface) => {
    setModalText(`Are you sure you want to delete "${val.Title}"?`);
    setDeleteId(val.ID);
    setOpen(true);
  };

  const getAnimals = async () => {
    console.log("Fetching animal data...");
    try {
      const res = await ListEvent();
      console.log("ListAnimal response:", res);

      if (res && res.length > 0) {
        const processedData = res.map((event: EventsInterface) => ({
          ID: event.ID,
          Name: event.Title,
          Description: event.Description,
          Picture: event.Picture,
        }));
        setEvents(processedData);
        console.log("Processed Animals Data:", processedData);
      } else {
        console.error("No data returned from ListAnimal");
      }
    } catch (error) {
      console.error("Error fetching animal data:", error);
    }
  };

  useEffect(() => {
    getAnimals();
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
                <span className="card__description">Event Zoo</span>
                <h2 className="card__title">{event.Title}</h2>
                <button  className="card__button_Edit">
                  EDIT 
                </button>
                <button onClick={() => showModal(event)}  className="card__button_Delete">
                  DELETE 
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Modal
        title="Delete Confirmation"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
};

export default Event;
