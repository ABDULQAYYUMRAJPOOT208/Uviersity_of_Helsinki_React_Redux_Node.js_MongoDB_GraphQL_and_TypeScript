import axios from "axios";
const baseUrl = "http://localhost:3001/phonebook";

const getAll = () => {
  const allPhone = axios.get(baseUrl);
  return allPhone.then((response) => response.data);
};

const create = (person) => {
  const newPerson = axios.post(baseUrl, person);
  return newPerson.then((response) => response.data);
};

const update = (id, person) => {
  const request = axios.put(`${baseUrl}/${id}`, person);
  return request.then((response) => response.data);
};

const deleteData = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};
export default { getAll, create, update, deleteData };
