import { PropTypes } from "prop-types";
import { useState } from "react";

const UserForm = ({ setReloadUsers }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    latitude: "",
    longitude: "",
  });

  const clearForm = () => {
    const newFormState = {
      name: "",
      email: "",
      latitude: "",
      longitude: "",
    };

    setFormState(newFormState);
  };

  const handleFormChange = (event) => {
    const {
      target: { name, value },
    } = event;

    const newFormState = {
      ...formState,
      [name]: value,
    };

    setFormState(newFormState);
  };

  const handleSubmit = async () => {
    Object.keys(formState).map((key) => {
      if (!formState[key]) {
        alert("tudos os campos são requeridos");
        return;
      }
    });

    const body = {
      ...formState,
    };

    let content = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    let url = `${apiBaseUrl}/tasks/`;

    try {
      const response = await fetch(url, content);
      if (response.ok) {
        await response.json();
        alert("Usuario criado com suceso");
        setReloadUsers(new Date());
        clearForm();
      } else {
        alert("Aconteceu um erro");
      }
    } catch (e) {
      console.error(e);
      alert("Aconteceu um erro");
    }
  };
  return (
    <div className='user-form'>
      <div className='mb-3'>
        <label htmlFor='userName' className='form-label'>
          Nome de Usuario
        </label>
        <input
          name='name'
          value={formState.name}
          className='form-control'
          id='userName'
          onChange={handleFormChange}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='email' className='form-label'>
          Email
        </label>
        <input
          name='email'
          value={formState.email}
          className='form-control'
          id='email'
          onChange={handleFormChange}
        />
      </div>
      <div className='coord-wrapper d-flex'>
        <div className='mb-3'>
          <label htmlFor='latitude' className='form-label'>
            Latitude
          </label>
          <input
            name='latitude'
            value={formState.latitude}
            className='form-control'
            id='latitude'
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor='longitude' className='form-label'>
            Longitude
          </label>
          <input
            name='longitude'
            value={formState.longitude}
            className='form-control'
            id='longitude'
            onChange={handleFormChange}
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        type='button'
        className='btn btn-primary mb-3'
      >
        Criar
      </button>
    </div>
  );
};
export default UserForm;
UserForm.propTypes = {
  setReloadUsers: PropTypes.func.isRequired,
};
