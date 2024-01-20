import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";

const UserForm = ({
  open,
  setOpen,
  setReloadUsers,
  selectedUser,
  setSelectedUser,
}) => {
  const [full_name, setFullName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [email, setEmail] = useState("");

  const clearForm = () => {
    setFullName("");
    setLatitude("");
    setLongitude("");
    setEmail("");
  };

  useEffect(() => {
    if (selectedUser !== null) {
      console.log(selectedUser);
      setFullName(selectedUser.details.full_name);
      setLatitude(selectedUser.details.latitude);
      setLongitude(selectedUser.details.longitude);
      setEmail(selectedUser.email);
    } else {
      clearForm();
    }
  }, [selectedUser]);
  // const handleFormChange = (event) => {
  //   const {
  //     target: { name, value },
  //   } = event;

  //   const newFormState = {
  //     ...formState,
  //     [name]: value,
  //   };

  //   setFormState(newFormState);
  // };

  const handleClose = () => {
    setOpen(false);
    clearForm();
  };

  const handleSubmit = async () => {
    const body = {
      email: email,
      username: email,
      details: {
        full_name: full_name,
        latitude: latitude,
        longitude: longitude,
      },
    };

    let content = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    let url = `${apiBaseUrl}/users/`;
    if (selectedUser !== null) {
      content.method = "PUT";
      url = `${apiBaseUrl}/users/${selectedUser.id}/`;
    }

    try {
      const response = await fetch(url, content);
      if (response.ok) {
        await response.json();
        setSelectedUser(null);
        setReloadUsers(new Date());
        alert("Usuario cadastrado com suceso");
        handleClose();
      } else {
        alert("Aconteceu um erro");
      }
    } catch (e) {
      console.error(e);
      alert("Aconteceu um erro");
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const email = formJson.email;
          console.log(email);
          // handleClose();
        },
      }}
    >
      <DialogTitle>Cadastrar novo usuario</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <div className="user-form">
          <TextField
            id="userName"
            label="Nome de Usuario"
            variant="outlined"
            margin="normal"
            fullWidth
            name="name"
            value={full_name}
            onChange={(event) => setFullName(event.target.value)}
          />

          <TextField
            id="email"
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <Stack direction="row" spacing={2}>
            <TextField
              id="latitude"
              label="Latitude"
              variant="outlined"
              margin="normal"
              fullWidth
              name="latitude"
              placeholder="Ex: 50.200"
              value={latitude}
              onChange={(event) => setLatitude(event.target.value)}
            />
            <TextField
              id="longitude"
              label="Longitude"
              variant="outlined"
              margin="normal"
              fullWidth
              name="longitude"
              placeholder="Ex: -23.550"
              value={longitude}
              onChange={(event) => setLongitude(event.target.value)}
            />
          </Stack>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button type="submit" onClick={handleSubmit}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default UserForm;
UserForm.propTypes = {
  setReloadUsers: PropTypes.func.isRequired,
};
UserForm.propTypes = {
  setOpen: PropTypes.func.isRequired,
};
UserForm.propTypes = {
  open: PropTypes.bool.isRequired,
};

UserForm.propTypes = {
  selectedUser: PropTypes.object,
};

UserForm.propTypes = {
  setSelectedUser: PropTypes.func.isRequired,
};
