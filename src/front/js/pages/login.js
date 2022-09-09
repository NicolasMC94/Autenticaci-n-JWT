import React, { useContext, useState }from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = () => {

	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  const [passwordError, setpasswordError] = useState(null);
  const [emailError, setemailError] = useState(null);

	let navigate = useNavigate();

  const handleValidation = () => {

  };

	const handleClick = (e) => {
		e.preventDefault();
    //handleValidation();
    if(!email.trim()){
      setemailError('Datos vacíos en el email!')
      return false;
    }
    
    if(!password.trim()){
      setpasswordError('Datos vacíos en el password!')
      return false;
    }
    if(password.length < 6){
      setpasswordError('El password debe contener 6 o más carácteres.')
        return false;
    }
    setemailError(null)
    setpasswordError(null)
		actions.login(email, password);
	};
  if (store.token && store.token != "" && store.token != undefined)navigate("/");
  return (
    <div className="Auth-form-container" id="login-div">
      <form className="Auth-form" onSubmit={handleClick}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Acceso</h3>
          {store.token && store.token != "" && store.token != undefined ? (
            store.token
          ) : (
            <>
              <div className="form-group mt-3">
                <label>Correo Electrónico:</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Introduce el correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                 <small className="text-danger form-text">
                  {emailError}
                </small>
              </div>
              <div className="form-group mt-3">
                <label>Clave:</label>
                <div className="input-group">
                  <input
                  type='text'
                  className="form-control"
                  placeholder="Introduce la contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>
              <div className="d-grid gap-2 mt-3">
                <button className="btn btn-primary">Ingresar</button>
              </div>
            </>
          )}
        </div>
      </form>
      <hr className="my-4" />
        <Link to="/">
            <span className="btn btn-primary btn-lg" href="#" role="button">
                Back home
            </span>
        </Link>
    </div>
  );
};