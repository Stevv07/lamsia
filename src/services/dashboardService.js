import api from './api';

export const getDashboard = async () => {
  const response = await api.get('/dashboards');

  return response.data;
}
