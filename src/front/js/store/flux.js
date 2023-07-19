const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: {
        name: "jose",
        last_name: "zangarini",
        role: "admin",
      },
			users: [],
			id: "",
      project: { 
        project_name : "",
        account_manager_id: "",
        assistant_id: "",
        customer_id: "",
        description:""
    },
    },
    actions: {

      Project : async(project) =>{
        const store = getStore();
        const actions = getActions();
        try {
          let response = await fetch(`${process.env.BACKEND_URL}/api/regproject`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project),
        });
        if (response.ok) {
          console.log(project)
          return true
          }
        } 
        catch (err) {
        console.log(err);
        }
      },

      Register : async (user) => {
        const store = getStore();
        const actions = getActions();
        try {
          let response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          });
          if (response.ok) {
            console.log(user);
            return true;
          }
        } 
        catch (err) {
        console.log(err);
        }
      },
  };
};

export default getState;
