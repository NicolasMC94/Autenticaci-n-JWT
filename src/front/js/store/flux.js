const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		tokenLS: null,
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
		// Use getActions to call a function within a fuction
		exampleFunction: () => {
		  getActions().changeColor(0, "green");
		},
  
		getMessage: async () => {
		  try {
			// fetching data from the backend
			const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
			const data = await resp.json();
			setStore({ message: data.message });
			// don't forget to return something, that is how the async resolves
			return data;
		  } catch (error) {
			console.log("Error loading message from backend", error);
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
		},
  
		createUser: async (email, password) => {
		  try {
			// fetching data from the backend
			const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify({
				email: email,
				password: password,
			  }),
			});
			const data = await resp.text();
  
			if (resp.status == 404) {
			  return false;
			}
			if (resp.status == 200) {
			  return true;
			}
			return data;
		  } catch (error) {
			console.log("Error loading message from backend", error);
		  }
		},
  
		login: async (email, password) => {
		  try {
			const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
			  method: "POST",
			  body: JSON.stringify({
				email: email,
				password: password,
			  }),
			  headers: {
				"Content-Type": "application/json",
			  },
			});
			const data = await resp.json();
			if (resp.status === 200) {
			  localStorage.setItem("token", data.token);
			  setStore({ tokenLS: data.token });
			  return true;
			} else {
			  return false;
			}
		  } catch (error) {
			console.log("Error loading message from backend", error);
		  }
		},
		deleteTokenLS: () => {
		  setStore({ tokenLS: null });
		},
	  },
	};
  };
  
  export default getState;