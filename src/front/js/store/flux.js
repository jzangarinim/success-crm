const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: {
        email: "default@example.com",
        name: "Jhon",
        last_name: "Snow",
        city: "Caracas",
        country: "Venezuela",
      },
      // project: {
      //   project_name: "",
      //   account_manager_id: "",
      //   assistant_id: "",
      //   customer_id: "",
      //   description: "",
      // },
    },
    actions: {
      Project: async (        
        id,
        title,
        managerId,
        assistantId,
        customerId,
        description,
        startDate,
        endDate) => {
        const store = getStore();
        const actions = getActions();
        try {
          let response = await fetch(`${process.env.BACKEND_URL}/api/projects`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              project_name: `${title}`,
              account_manager_id: `${managerId}`,
              assistant_id: `${assistantId}`,
              customer_id: `${customerId}`,
              description: `${description}`,
              start_date: `${startDate}`,
              end_date: `${endDate}`,
            }),
        });
          if (response.ok) {
            console.log(project);
            return true;
          }
        } catch (err) {
          console.log(err);
        }
      },

      Register: async (
        id,
      email,
      password,
      department,
      name,
      last_name,
      city,
      country,
      )=> {
        try {
          let response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: `${email}`,
              password: `${password}`,
              department: `${department}`,
              name: `${name}`,
              last_name: `${lastName}`,
              city: `${city}`,
              country: `${country}`,
            }),
          });
          if (response.ok) {
            console.log(user);
            return true;
          }
        } catch (err) {
          console.log(err);
        }
      },

      Login: async (
        id,
        email,
        password,
      ) => {
        const store = getStore();
        const actions = getActions();
        try {
          let response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({      
              email: `${email}`
            }),
          });
          if (response.ok) {
            console.log(user);
            return true;
          }
        } catch (err) {
          console.log(err);
        }
      },

      editProject: async (
        id,
        title,
        managerId,
        assistantId,
        customerId,
        description,
        startDate,
        endDate
      ) => {
        try {
          let response = await fetch(
            `${process.env.BACKEND_URL}/api/projects/${id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                project_name: `${title}`,
                account_manager_id: `${managerId}`,
                assistant_id: `${assistantId}`,
                customer_id: `${customerId}`,
                description: `${description}`,
                start_date: `${startDate}`,
                end_date: `${endDate}`,
              }),
            }
          );
          if (response.ok) {
            return true;
          }
        } catch (error) {}
      },
    },
  };
};

export default getState;
