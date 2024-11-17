import { Filter, PawPrint } from "lucide-react";
import "./animal.css";
import { createTheme, ThemeProvider } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

// Define type for user
interface User {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  id: number;
  // Add other fields as necessary
}

// Define selectable rows options
type SelectableRows = "none" | "single" | "multiple";

const columns = [
  {
    name: 'id',
    label: "A.No",
    options: {filter:false,},
  },
  {
    name: 'image',
    label:'Profile',
    options: {
      customBodyRender: (value: string) => (
        <img src={value} alt="picture" className="w-12 h-12 rounded-full p-3 bg-slate-500" />
      ),
      filter:false,
    },
  },
  {
    name: 'name',
    label:'Name',
    options: {filter:false,},
  },
  {
    name: 'age',
    label:'Age',
    options: {filter:false,},
  },
  {
    name: 'gender',
    label:'Gender',
    options: {
      customBodyRender: (value: string) => (
        <p className={value === "female" ? "capitalize1" : value === "male" ? "capitalize2" : ""}>
          {value}
        </p>
      ),
    },
  },
];

const Animal = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("//dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        let local = data?.users?.map((user: User) => ({
          ...user,
          name: user?.firstName + " " + user?.lastName,
        }));
        console.log(local);
        setUsers(local);
      });
  }, []);

  const options = {
    selectableRows: "none" as SelectableRows, // Ensuring correct type for selectableRows
    filterType: "checkbox" as const,
    rowsPerPage: 2, // Number of rows per page
    rowsPerPageOptions: [5, 10, 20, 30], // Options for number of rows per page
  };

  const getMuitheme = () =>
    createTheme({
      typography: {
        fontFamily: "cursive",
      },
      palette: {
        mode: "light",
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: "10px 4px",
            },
            body: {
              padding: "7px 15px",
              color: "gray",
            },
          },
        },
      },
    });

  return (
    <div className="bg-slate-700 py-10 min-h-screen grid place-items-center">
      <div className="w-10/12 max-w-4xl content-container">
        <h1 className="header-animals-box">
          <PawPrint size={28} style={{ marginRight: "10px" }} />
          Animal
        </h1>
        <ThemeProvider theme={getMuitheme}>
          <MUIDataTable
            title={"Animals List"}
            data={users}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Animal;
