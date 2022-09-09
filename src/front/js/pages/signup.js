import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export const Signup = () =>{
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [checked, setChecked] = React.useState(1);
    const [error, setError] = React.useState(null)
  
	let navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();

        if(!email.trim()){
            setError('Datos vacíos en el email!')
            return false;
        }
        if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            setError("El correo electrónico es invalido.");
            return false;
        }
        if(!password.trim()){
            setError('Datos vacíos en el password!')
            return false;
        }
        if(password.length < 6){
            setError('El password debe contener 6 o más carácteres.')
            return false;
        }
        setError(null)
		actions.registro(email,password,checked);
	}
    if(store.token && store.token!="" && store.token != undefined) navigate('/');

    return(
        <div id="registro-web" className="Auth-form-container">
        <form className="Auth-form">
        {
            error ? (
                <div className="alert alert-danger">
                    {error}
                </div>
            ) : null
        }
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Registro</h3>
            <div className="form-group mt-3">
                <Row className="mb-3">
                    <Form.Group as={Col} sm={6} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@ejemplo.com" />
      
                    </Form.Group>
                    <Form.Group as={Col} sm={6} controlId="formGridPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <div className="input-group">
                            <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type='text' placeholder="Contraseña" />
                        </div>
                    </Form.Group>
                    
                </Row>
            </div>
            <div className="form-group mt-3">
                <input type="checkbox" value={checked} checked={checked} onChange={(e) => setChecked(e.target.value)} />
                &nbsp;
                <span>Activo</span>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-primary" onClick={handleClick}>
                Registrarse
              </button>
            </div>
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