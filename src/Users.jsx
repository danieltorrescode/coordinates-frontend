import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from '@mui/icons-material/EditNote';
import Link from "@mui/material/Link";

import { useEffect, useState } from "react";
import UserForm from "./UserForm";

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reloadUsers, setReloadUsers] = useState(new Date());
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/users`);
        const jsonData = await response.json();
        setUsers(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsers();
  }, [reloadUsers]);

  const deleteItem = async (id) => {
    let content = {
      method: "DELETE",
    };
    let url = `${apiBaseUrl}/users/${id}/`;
    try {
      const response = await fetch(url, content);
      if (response.ok) {
        alert("Usuario deletado com sucesso");
        setReloadUsers(new Date());
        return true;
      } else {
        alert("Aconteceu um erro");
      }
    } catch (e) {
      console.error(e);
      alert("Aconteceu um erro");
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ my: 2 }}>
        <AddIcon></AddIcon>
        Usuario
      </Button>
      <Typography variant="h5" sx={{ my: 2 }}>
        <Link href="https://www.google.com/maps/place/Cheil+Brasil/@-23.6241039,-46.7024343,18z/data=!4m6!3m5!1s0x94ce5105f134e0ff:0xdfedab51737ace54!8m2!3d-23.6237255!4d-46.7020588!16s%2Fg%2F11kqrl7hcz?entry=ttu">
          Cheil (-23.6241039,-46.7024343)
        </Link>
      </Typography>
      <TableContainer component={Paper} sx={{ my: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Usuario</TableCell>
              <TableCell align="right">E-mail</TableCell>
              <TableCell align="right">Latitude</TableCell>
              <TableCell align="right">Longitude</TableCell>
              <TableCell align="right">Distancia&nbsp;(Km)</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                hover
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  onClick={() => {
                    setSelectedUser(user);
                    setOpen(true);
                  }}
                >
                  <Button variant="text">{user.details.full_name}</Button>
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.details.latitude}</TableCell>
                <TableCell align="right">{user.details.longitude}</TableCell>
                <TableCell align="right">{user.details.distance}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="delete" color="primary">
                    <EditNoteIcon
                      onClick={() => {
                        setSelectedUser(user);
                        setOpen(true);
                      }}
                    />
                  </IconButton>
                  <IconButton aria-label="delete" color="primary">
                    <DeleteIcon onClick={() => deleteItem(user.id)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserForm
        setReloadUsers={setReloadUsers}
        open={open}
        setOpen={setOpen}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </>
  );
}
export default Users;
