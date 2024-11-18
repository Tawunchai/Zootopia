import { Tickets } from "lucide-react";
import React, { useState, useEffect } from "react";
import Modal from "../create/index";
import { Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import "../create/review-create.css";
import { UsersInterface } from "../../../interface/IUser";
import { ListReview } from "../../../services/https";

const myticket = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [uid, setUid] = useState<number>(
    Number(localStorage.getItem("id")) || 0
  );
  const navigate = useNavigate();
  const [user, setUser] = useState<UsersInterface>();

  useEffect(() => {
    setUid(Number(localStorage.getItem("1")));

  }, [uid]);

  const openModal = async () => {
    setIsOpen(true);
  };

  return (
    <>
      {contextHolder}
      <br />
      <br />
      <br />
      <br />
      <div className="header-course">MyCourse</div>
      <div className="setcourse">
        <div className="review-layer">
          <button className="button-open-model" onClick={() => openModal()}>
            {" "}
            Review Zoo{" "}
          </button>
          {isOpen && (
            <Modal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              UserID={uid}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default myticket;
