import api from "./api";

export const getWeeklySchedule = async (date) => {
  const response = await api.get("/schedule-view/weekly", {
    params: {
      date,
    },
  });

  return response.data;
};

export const getDailySchedule = async (date) => {
  const response = await api.get("/schedule-view/daily", {
    params: {
      date,
    },
  });

  return response.data;
};
