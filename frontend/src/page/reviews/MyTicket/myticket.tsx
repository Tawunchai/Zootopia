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
  const [uid, setUid] = useState<number>(1); // Always set uid to 1
  const navigate = useNavigate();
  const [user, setUser] = useState<UsersInterface>();

  // No need to retrieve uid from localStorage
  useEffect(() => {
    // If you want to perform any logic on initial render, you can do it here
  }, []);

  const openModal = async () => {
    setIsOpen(true);
  };

  return (
    <>
      {contextHolder}
        <div className="review-layer">
          <button className="button-open-model" onClick={() => openModal()}>Review Zoo</button>
          {isOpen && (<Modal open={isOpen} onClose={() => setIsOpen(false)} UserID={uid} />)}
        </div>
    </>
  );
};

export default myticket;
