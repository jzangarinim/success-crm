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
        title,
        managerId,
        assistantId,
        customerId,
        description
      ) => {
        const store = getStore();
        const actions = getActions();
        try {
          let response = await fetch(
            `${process.env.BACKEND_URL}/api/projects`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                project_name: `${title}`,
                account_manager_id: `${managerId}`,
                assistant_id: `${assistantId}`,
                customer_id: `${customerId}`,
                description: `${description}`,
              }),
            }
          );
          if (response.ok) {
            return true;
          }
        } catch (err) {
          console.log(err);
        }
      },

      Register: async (
        email,
        password,
        department,
        name,
        last_name,
        city,
        country
      ) => {
        try {
          let response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: `${email}`,
              password: `${password}`,
              department: `${department}`,
              name: `${name}`,
              last_name: `${last_name}`,
              city: `${city}`,
              country: `${country}`,
            }),
          });
          if (response.ok) {
            return true;
          }
        } catch (err) {
          console.log(err);
        }
      },

      Login: async (
        email,
        password 
        ) => {
        try {
          let response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: `${email}`,
              password: `${password}`,
            }),
          });
          if (response.ok) {
            return true;
          }
        } catch (err) {}
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
