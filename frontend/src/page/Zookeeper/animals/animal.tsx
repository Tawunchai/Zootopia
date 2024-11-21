import { PawPrint } from "lucide-react";
import "./animal.css";
import { createTheme, ThemeProvider } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListAnimal } from "../../../services/https"; // Assuming this is imported correctly
import { AnimalsInterface } from "../../../interface/IAnimal"; // Updated import

// Define selectable rows options
type SelectableRows = "none" | "single" | "multiple";

// Define columns for MUIDataTable
const columns = [
  {
    name: "ID",
    label: "A.No",
    options: { filter: false },
  },
  {
    name: "Picture",
    label: "Profile",
    options: {
      customBodyRender: (value: string) => (
        <img
          src={`http://localhost:8000/${value || "default-image.jpg"}`} 
          style={{width:"100px",borderRadius:"80px"}}
          alt="profile"
          className="w-12 h-12 rounded-full p-3 bg-slate-500"
        />
      ),
      filter: false,
    },
  },
  {
    name: "Name",
    label: "Name",
    options: { filter: false },
  },
  {
    name: "Weight",
    label: "Weight",
    options: { filter: false },
  },
  {
    name: "Height",
    label: "Height",
    options: { filter: false },
  },
];

const Animal = () => {
  const [animals, setAnimals] = useState<AnimalsInterface[]>([]);

  // Fetch animals data on component mount
  useEffect(() => {
    ListAnimal()
      .then((data) => {
        console.log("API Response Data:", data); // Log the response data for debugging
        if (data && data.length > 0) {
          const local = data.map((animal) => ({
            ID: animal.ID, 
            Name: animal.Name, 
            Weight: animal.Weight, 
            Height: animal.Height, 
            Picture: animal.Picture, // Ensure the Picture path is correct
            Sex: animal.Sex,
            Behavioral: animal.Behavioral,
            Biological: animal.Biological,
            Habitat: animal.Habitat,
            Employee: animal.Employee,
          }));
          setAnimals(local);
        } else {
          console.error("No data returned from ListAnimal");
        }
      })
      .catch((error) => {
        console.error("Error fetching animal data:", error);
      });
  }, []);

  // Define options for MUI DataTable
  const options = {
    selectableRows: "none" as SelectableRows, // Ensuring correct type for selectableRows
    filterType: "checkbox" as const,
    rowsPerPage: 5, // Number of rows per page
    rowsPerPageOptions: [5, 10, 20, 30], // Options for number of rows per page
  };

  // Define custom MUI theme
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
        <div style={{ display: "flex" }}>
          <h1 className="header-animals-box">
            <PawPrint size={28} style={{ marginRight: "10px" }} />
            Animal
          </h1>
          <Link to="/create-animal">
            <h1 className="header-create-animals-box">
              <PawPrint size={28} style={{ marginRight: "10px" }} />
              Create Animal
            </h1>
          </Link>
        </div>
        <ThemeProvider theme={getMuitheme}>
          <MUIDataTable
            title={"Animals List"}
            data={animals} // Use the animals state here
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Animal;
