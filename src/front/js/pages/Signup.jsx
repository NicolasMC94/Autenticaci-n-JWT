import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Mensaje from "../component/mensaje";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const { store, actions } = useContext(Context);

  const [mensaje, setMensaje] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (password === password1) {
      e.preventDefault();
      if (await actions.createUser(email, password)) {
        setMensaje("Usuario creado");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMensajeError("Usuario ya existe");
        setTimeout(() => {
          setMensajeError("");
        }, 2000);
      }
    } else {
      setMensajeError("Contraseñas incorrectas");
    }
  };

  return (
    <div className="vh-100 bg-fondo color-texto">
      <h1 className="text-center pt-4 text-capitalize">Crear nuevo usuario</h1>

      <div className="d-flex justify-content-center align-items-center h-50 d-inline-block">
        <form onSubmit={handleSubmit} className="col-10 col-md-5">
          {mensaje && <Mensaje tipo="alerta-correcto">{mensaje}</Mensaje>}
          {mensajeError && (
            <Mensaje tipo="alerta-error">{mensajeError}</Mensaje>
          )}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email*
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Contraseña*
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Repetir Contraseña*
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Crear usuario
            </button>
          </div>
          <div className="text-center mt-1">
            <Link to="/" className="text-white text-decoration-none">
              Ya tengo cuenta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;