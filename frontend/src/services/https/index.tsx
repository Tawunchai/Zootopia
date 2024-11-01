import { AnimalsInterface } from "../../interface/Animal";

const apiUrl = "http://localhost:8000";

const Authorization = localStorage.getItem("token");

const Bearer = localStorage.getItem("token_type");

async function GetAnimals() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${Bearer} ${Authorization}`,
    },
  };

  let res = await fetch(`${apiUrl}/animals`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

async function GetGenders() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${Bearer} ${Authorization}`,
    },
  };

  let res = await fetch(`${apiUrl}/genders`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

async function GetBehavioral() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${Bearer} ${Authorization}`,
    },
  };

  let res = await fetch(`${apiUrl}/behaviorals`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

async function GetCategory() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${Bearer} ${Authorization}`,
    },
  };

  let res = await fetch(`${apiUrl}/categorys`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

async function CreateAnimal(data: AnimalsInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    Authorization: `${Bearer} ${Authorization}`,
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/animals`, requestOptions)
    .then((res) => {
      if (res.status == 201) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

export {
  GetAnimals,
  GetGenders,
  GetBehavioral,
  GetCategory,
  CreateAnimal,
};