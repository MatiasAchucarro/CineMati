import React, { useState } from "react";
import "./LoginRegister.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import RestProvider from "../../Rest/RestProvider.ts";

const rest = new RestProvider();
export const Register = () => {
  const [formData, setFormData] = useState({
    Name: "",
    LestName: "",
    NameUser: "",
    Email: "",
    PasswordHash: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((PrevState) => ({ ...PrevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos a enviar:", formData);

    if (
      !formData.Name ||
      !formData.LestName ||
      !formData.NameUser ||
      !formData.Email ||
      !formData.PasswordHash
    ) {
      alert("Por favor, completa todos los campos");
      return;
    }

    if (formData.PasswordHash.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const response = await rest.addRegister(
        formData.Name,
        formData.LestName,
        formData.NameUser,
        formData.Email,
        formData.PasswordHash
      );
      if (response?.isSuccess) {
        alert("Registro exitoso");
        navigate("/");
      } else {
        alert("Error al registrarse. Intenta nuevamente");
      }
    } catch (error) {
      console.error("Error durante el registro", error);
    }
  };

  

  return (
    <div className="body-login-register">
    <div className="wrapper-register">
      <div className="form-box register">
        <form onSubmit={handleSubmit}>
          <h1>Registrarte</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Usuario"
              name="NameUser"
              required
              value={formData.NameUser}
              onChange={handleChange}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Nombre"
              name="Name"
              required
              value={formData.Name}
              onChange={handleChange}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Apellido"
              name="LestName"
              required
              value={formData.LestName}
              onChange={handleChange}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Correo Electrónico"
              name="Email"
              required
              value={formData.Email}
              onChange={handleChange}
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Contraseña"
              name="PasswordHash"
              required
              value={formData.PasswordHash}
              onChange={handleChange}
            />
            <FaLock className="icon" />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Acepto los términos y condiciones
            </label>
          </div>
          <button type="submit">Registrarte</button>
          <div className="register-link">
            <p>
              ¿Ya tenes usuario?<Link to="/"> Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};
