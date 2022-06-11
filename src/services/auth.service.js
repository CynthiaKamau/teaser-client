import axios from "axios";

const login = (email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  return axios.post('/auth/login', body, config)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

const register = (first_name, middle_name, last_name,email, role_id,gender, phone_number, county,sub_county, ward, constituency, landmark, terms_and_conditions, password, password_confirmation) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ first_name, middle_name, last_name,email, role_id,gender, phone_number, county,sub_county, ward, constituency, landmark, terms_and_conditions, password, password_confirmation });

  // return axios.post('/auth/login', body, config)
  return axios
    .post("/auth/register", body, config)

    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export default {
  login,
  register,
};
