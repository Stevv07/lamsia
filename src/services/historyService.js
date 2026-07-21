import api from '@/services/api'

export const getMedicationHistory = async () => {
  const response = await api.get('/histories/medication');
  return response.data
};
