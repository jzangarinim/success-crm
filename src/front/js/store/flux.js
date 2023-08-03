const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: {
        email: "default@example.com",
        name: "Jhon",
        last_name: "Snow",
        city: "Caracas",
        country: "Venezuela",
        role: localStorage.getItem("role") || null,
      },
      token: localStorage.getItem("token") || null,
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

      editUser: async (id, original, edited) => {
        try {
          let response = await fetch(
            `${process.env.BACKEND_URL}/api/users/${id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: `${edited.name ? edited.name : original.name}`,
                last_name: `${
                  edited.last_name ? edited.last_name : original.last_name
                }`,
                department: `${
                  edited.department ? edited.department : original.department
                }`,
                role: `${edited.role ? edited.role : original.role}`,
                hourly_rate: `${
                  edited.hourly_rate ? edited.hourly_rate : original.hourly_rate
                }`,
                weekly_availability: `${
                  edited.weekly_availability
                    ? edited.weekly_availability
                    : original.weekly_availability
                }`,
                city: `${edited.city ? edited.city : original.city}`,
                country: `${
                  edited.country ? edited.country : original.country
                }`,
                is_active: `${
                  edited.is_active ? edited.is_active : original.is_active
                }`,
              }),
            }
          );
          if (response.ok) {
            return true;
          }
        } catch (error) {}
      },

      Login: async (email, password) => {
        const store = getStore();
        try {
          let response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: `${email}`,
              password: `${password}`,
            }),
          });
          let data = await response.json();
          if (response.ok) {
            setStore({
              token: data.token,
              user: { ...store.user, role: data.role },
            });
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
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
      deleteProject: async (id) => {
        try {
          let response = await fetch(
            `${process.env.BACKEND_URL}/api/projects/${id}`,
            {
              method: "DELETE",
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
