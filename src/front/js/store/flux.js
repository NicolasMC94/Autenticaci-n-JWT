const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null,
			user: null,
			demo: [
				{
					title: "Login",
					ruta: "/login",
					background: "white",
					initial: "white"
				},
				{
					title: "Signup",
					ruta: "/signup",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			syncTokenFromSessionStore: async () => {
				const token = sessionStorage.getItem("login");
				const store = getStore();
				if (token && token != "" && token != undefined)
				  setStore({ token: token});
		
				const opt = {
				method: "GET",
				headers: {
				  Authorization: "Bearer " + store.token,
				  },
				};
				const baseurl = process.env.BACKEND_URL + "/api/login";
		
				try 
				{
				  const resp = await fetch(baseurl, opt);
				  const data = await resp.json();
				  setStore({ user: data.user });
				  return true;
		
				} catch (error) {
				console.log("Hubo un error al consultar al login");
				}
			},
			login: async (email, password) => {
				const opt = {
				  method: "POST",
				  body: JSON.stringify({
					email: email,
					password: password,
				  }),
				  headers: {
					"Content-Type": "application/json",
				  },
				};
				const baseurl = process.env.BACKEND_URL + "/api/login";
				try {
				  const resp = await fetch(baseurl, opt);
		
				  if (resp.status === 404) {
					alert("Las credenciales no coinciden");
					window.location = "/login";
					return false;
				  }
				  const data = await resp.json();
				  sessionStorage.setItem("login", data.access_token);
				  setStore({ token: data.access_token, user: data.user });
				  return true;
				} catch (error) {
				  console.log("Hubo un error al ingresar al login");
				}
			},
			logout: () => {
				sessionStorage.removeItem("login");
				setStore({ token: null });
				window.location = "/";
			},
			registro: async (email,password,is_active) => {
				const opt = {
				  method: "POST",
				  body: JSON.stringify({
					email: email,
					password: password,
					is_active: is_active,
				  }),
				  headers: {
					"Content-Type": "application/json",
				  },
				};
		
				const baseurl = process.env.BACKEND_URL + "/api/registro";
				/*console.log(baseurl);*/
		
				try {
				  const resp = await fetch(baseurl, opt);
				  if (resp.status !== 200) {
					alert("No se pudo registrar los datos");
					return false;
				  }
				  const data = await resp.json();
		
				  alert("los datos se guardaron con exito");
				  window.location = "/login";
		
				  return true;
				} catch (error) {
				  console.log("Hubo un error al ingresar al login");
				}
			},
			getMessage: async () => {

				const baseurl = process.env.BACKEND_URL + "/api/hello";

				try{
					// fetching data from the backend
					const store = getStore();
					const opts = {
						headers: {
						Authorization: "Bearer " + store.token,
						},
					};
					//const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const resp = await fetch(baseurl, opts);
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
