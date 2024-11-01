import lion from "../../assets/Lion.jpg";
import "./animal.css";
import React, { useEffect, useState } from "react";
import { AnimalsInterface } from "../../../interface/Animal";
import { GetAnimals } from "../../../services/https";

const animal = () => {
  const [animals, setAnimals] = useState<AnimalsInterface[]>([]);

  useEffect(() => {
    GetAnimals().then((data) => {
      if (data) {
        setAnimals(data);
      }
    });
  }, []);
  return (
    <div className="animals-list">
      {animals.map((animal) => (
        <div key={animal.ID} className="card-container">
        <img src={lion} className="card-img" />
        <h1 className="card-title">{animal.Name}</h1>
        <p className="card-description">{animal.Description}</p>
        <p>Gender : {animal.Gender?.Name}</p>
        <button>Click Learn More</button>
      </div>
      ))}
    </div>
  );
};

export default animal;
