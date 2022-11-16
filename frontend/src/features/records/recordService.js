import axios from "axios";

const API_URL = "/api/records";

//Add record to collection/wishlist
const addRecordToCollection = async (recordData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL, recordData, config);

  return response.data;
};

//Remove record from collection/wishlist
const removeUserFromRecord = async (recordData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/${recordData.record}`,
    recordData,
    config
  );

  return response.data;
};

const recordService = {
  addRecordToCollection,
  removeUserFromRecord,
};

export default recordService;
