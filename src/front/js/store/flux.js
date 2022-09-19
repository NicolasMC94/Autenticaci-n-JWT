const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		token: null,
		user: { email: null, id: null },
		message: null,
		demo: [
		  {
			title: "FIRST",
			background: "white",
			initial: "white",
		  },
		  {
			title: "SECOND",
			background: "white",
			initial: "white",
		  },
		],
	  },
	  actions: {
		exampleFunction: () => {
		  getActions().changeColor(0, "green");
		},
		logout: async () => {
		  const store = getStore();
		  const opts = {
			method: "DELETE",
			headers: {
			  Authorization: "Bearer " + store.token,
			},
		  };
		  try {
			const resp = await fetch(process.env.BACKEND_URL + "/logout", opts);
			const data = await resp.json();
			return data;
		  } catch (error) {
			console.error("There has been an error loging out");
		  }
  
		  sessionStorage.removeItem("token");
		  setStore({ token: null });
		  setStore({ user: null });
		},
		synchData: () => {
		  setStore({ token: sessionStorage.getItem("token") });
		  getData();
		},
  
		getData: async () => {
		  const store = getStore();
		  const opts = {
			headers: {
			  Authorization: "Bearer " + store.token,
			},
		  };
		  try {
			const resp = await fetch(
			  process.env.BACKEND_URL + "/api/protected",
			  opts
			);
			const data = await resp.json();
			setStore({ user: data });
			return data;
		  } catch (error) {
			console.error("There has been an error retrieving data");
		  }
		},
  
		login: async (email, password) => {
		  const opts = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
			  email: email,
			  password: password,
			}),
		  };
		  try {
			const resp = await fetch(
			  process.env.BACKEND_URL + "/api/token",
			  opts
			);
			if (resp.status !== 200) {
			  alert("There has been some error");
			  return false;
			}
			const data = await resp.json();
			sessionStorage.setItem("token", data.token);
			setStore({ token: data.token });
  
			return true;
		  } catch (error) {
			console.error("There has been an error login in");
		  }
		},
  
		register: async (email, password) => {
		  const opts = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
			  email: email,
			  password: password,
			  is_active: 1,
			}),
		  };
		  try {
			const resp = await fetch(
			  process.env.BACKEND_URL + "/api/register",
			  opts
			);
			if (resp.status !== 200) {
			  alert("There has been some error");
			  return false;
			}
			const data = await resp.json();
			return data;
		  } catch (error) {
			console.error("There has been an error login in");
		  }
		},
  
		getMessage: async () => {
		  try {
			const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
			const data = await resp.json();
			setStore({ message: data.message });
			return data;
		  } catch (error) {
			console.log("Error loading message from backend", error);
		  }
		},
		changeColor: (index, color) => {
		  const store = getStore();
  
		  const demo = store.demo.map((elm, i) => {
			if (i === index) elm.background = color;
			return elm;
		  });
  
		  setStore({ demo: demo });
		},
	  },
	};
  };
  
  export default getState;
