import React, { useState } from "react";
import "./LoginRegister.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import RestProvider from "../../Rest/RestProvider.ts";
import toast from "react-hot-toast";

const rest = new RestProvider();
export const Login = ({setUser}) => {
  const [formData, setFormData] = useState({
    NameUser: "",
    PasswordHash: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { NameUser, PasswordHash } = formData;
    if (NameUser && PasswordHash) {
      try {
        const response = await rest.login(NameUser, PasswordHash);
        if (response.isSuccess) {
          localStorage.setItem("authToken", response.token);
          setUser({
            username: NameUser,
            isAuthenticated: true
          });
          navigate("/pelicula", { replace: true});
        } else {
          toast.error("Usuario o contraseña incorrectos");
        }
      } catch (error) {
        alert("Hubo un error al iniciar sesion");
        console.log(error);
      }
    } else {
      alert("Por favor completa todos los campos");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="body-login-register">
      <div className="wrapper-login">
        <div className="form-box login">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Usuario"
                name="NameUser"
                value={formData.NameUser}
                onChange={handleInputChange}
                required
              />

              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Contraseña"
                name="PasswordHash"
                value={formData.PasswordHash}
                onChange={handleInputChange}
                required
              />
              <FaLock className="icon" />
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Recordar Usuario
              </label>
              <a href="#">¿Olvidate la contraseña?</a>
            </div>
            <button type="submit"> Login</button>
            <div className="register-link">
              <p>
                ¿No tenes usuario?<Link to="/register"> Registrate</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
