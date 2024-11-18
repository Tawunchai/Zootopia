import axios from "axios";
import { CalendarInterface } from "../../interface/ICalendar";
import { ReviewInterface } from "../../interface/IReview";
import { UsersInterface } from "../../interface/IUser";

const apiUrl = "http://localhost:8000";

// Calendar API
const getAuthHeader = (): string | null => {
  const token = localStorage.getItem("token");
  const tokenType = localStorage.getItem("token_type");
  return token && tokenType ? `${tokenType} ${token}` : null;
};

export const getCalendars = async (): Promise<CalendarInterface[]> => {
  try {
    const response = await axios.get<CalendarInterface[]>(
      `${apiUrl}/calendar`,
      {
        headers: { Authorization: getAuthHeader() },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching calendars: " + (error as Error).message);
  }
};

export const createCalendar = async (
  calendar: Omit<CalendarInterface, "id">
): Promise<CalendarInterface> => {
  try {
    const response = await axios.post<CalendarInterface>(
      `${apiUrl}/create-calendar`,
      calendar,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: getAuthHeader(),
        },
      }
    );
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

// Reviews API

export const ListReview = async (): Promise<ReviewInterface[] | false> => {
  try {
    const response = await fetch(`${apiUrl}/reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("การตอบสนองของเครือข่ายไม่ถูกต้อง");
    return await response.json();
  } catch (error) {
    console.error("ข้อผิดพลาดในการดึงข้อมูลรีวิว:", error);
    return false;
  }
};

export const GetUserByIdReview = async (id: number | undefined): Promise<UsersInterface | false> => {
  try {
    if (id === undefined) return false;

    const response = await fetch(`${apiUrl}/user-review/${id}`, {
      method: "GET",
    });

    if (!response.ok) throw new Error("การตอบสนองของเครือข่ายไม่ถูกต้อง");
    return await response.json();
  } catch (error) {
    console.error("ข้อผิดพลาดในการดึงข้อมูลผู้ใช้ตาม ID:", error);
    return false;
  }
};

export const CreateReview = async (formData: FormData): Promise<any | false> => {
  try {
    const response = await fetch(`${apiUrl}/reviews-create`, {
      method: "POST",
      body: formData, // Send the FormData
    });

    if (response.status !== 201) throw new Error("Invalid response from server");

    return await response.json();
  } catch (error) {
    console.error("Error creating review:", error);
    return false;
  }
};

