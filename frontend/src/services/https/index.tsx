import axios from "axios";
import { Calendar } from "../../interface/Calendar";

const apiUrl = "http://localhost:8000";

const getAuthHeader = (): string | null => {
  const token = localStorage.getItem("token");
  const tokenType = localStorage.getItem("token_type");
  return token && tokenType ? `${tokenType} ${token}` : null;
};

export const getCalendars = async (): Promise<Calendar[]> => {
  try {
    const response = await axios.get<Calendar[]>(`${apiUrl}/calendar`, {
      headers: { Authorization: getAuthHeader() },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching calendars: " + (error as Error).message);
  }
};

export const createCalendar = async (calendar: Omit<Calendar, "id">): Promise<Calendar> => {
  try {
    const response = await axios.post<Calendar>(`${apiUrl}/create-calendar`, calendar, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating calendar event:", error);
    throw new Error("Error creating calendar: " + (error as Error).message);
  }
};

export const deleteCalendar = async (calendarId: number): Promise<void> => {
  try {
    await axios.delete(`${apiUrl}/delete-calendar/${calendarId}`, {
      headers: { Authorization: getAuthHeader() },
    });
  } catch (error) {
    throw new Error("Error deleting calendar: " + (error as Error).message);
  }
};
