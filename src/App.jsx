import React, { useEffect, useState } from "react";
import { supabase } from "./createClient";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Input,
  Button,
} from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ id: "", Name: "", Age: "" });

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  useEffect(() => {
    fetchUsers();
  }, [deleteUser]);
  async function fetchUsers() {
    const { data } = await supabase.from("Users").select("*");
    setUsers(data);
  }
  async function createUsers() {
    await supabase.from("Users").insert({ Name: user.Name, Age: user.Age });
  }
  async function deleteUser(userId) {
    const { data, error } = await supabase
      .from("Users")
      .delete()
      .eq("id", userId);
  }
  async function updateUser(userId) {
    console.log(user);
    await supabase
      .from("Users")
      .update({ Name: user.Name, Age: user.Age })
      .eq("id", user.id);
    console.log("edit", user.Name);
  }

  async function upsertData() {
    try {
      // Upsert a user into the 'users' table based on the user's ID
      const { data, error } = await supabase.from("Users").upsert(
        [
          {
            id: user.id,
            Name: user.Name,
            Age: user.Age,
          },
        ],
        { onConflict: ["id"] }
      );
      console.log("Upserted user:", data);
      if (error) {
        console.error("Error:", error.message);
        return;
      }
      if (data) {
        console.log("Upserted user:", data[0]);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  function displayUser(userId) {
    users.map((x) => {
      if (x.id == userId) {
        setEditUser({ id: x.id, Name: x.Name, Age: x.Age });
        console.log(editUser);
      }
    });
  }
  return (
    <div>
      <form onSubmit={createUsers}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Input
            placeholder="id"
            type="number"
            name="id"
            value={user.id}
            onChange={handleChange}
          ></Input>
          <Input
            placeholder="Name"
            type="text"
            name="Name"
            value={user.Name}
            onChange={handleChange}
          />

          <Input
            placeholder="Age"
            type="number"
            name="Age"
            value={user.Age}
            onChange={handleChange}
          />
          <Button type="submit">Add</Button>
        </div>

        <Button type="button" onClick={updateUser}>
          Save
        </Button>
        <Button onClick={upsertData}>Upsert</Button>
      </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((x) => (
              <TableRow key={x.id}>
                <TableCell>{x.id}</TableCell>
                <TableCell>{x.Name}</TableCell>
                <TableCell>{x.Age}</TableCell>
                <TableCell>
                  <EditTwoToneIcon
                    onClick={() => {
                      setUser(x);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <DeleteTwoToneIcon
                    onClick={() => {
                      deleteUser(x.id);
                    }}
                  />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;
