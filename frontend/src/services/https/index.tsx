import axios from "axios";
import { CalendarInterface } from "../../interface/ICalendar";
import { ReviewInterface } from "../../interface/IReview";
import { UsersInterface } from "../../interface/IUser";
import { EventsInterface } from "../../interface/IEvent";
import { HabitatInterface } from "../../interface/IHabitat";
import { AnimalsInterface } from "../../interface/IAnimal";

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

export const GetAllRatingsAvg = async (): Promise<{ rating: number; percentage: number }[] | false> => {
  try {
    const response = await fetch(`${apiUrl}/ratings`, {  
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("การตอบสนองของเครือข่ายไม่ถูกต้อง");
    const data = await response.json();

    if (!Array.isArray(data.ratings)) return false;

    const ratings: number[] = data.ratings;
    const ratingCount = ratings.length;

    const ratingSummary = ratings.reduce<{ [key: number]: number }>(  // สรุปการกระจายคะแนน
      (acc, rating) => {
        acc[rating] = (acc[rating] || 0) + 1;
        return acc;
      },
      {}
    );

    const avgRatings = Object.keys(ratingSummary).map((rating) => ({
      rating: Number(rating),
      percentage: (ratingSummary[Number(rating)] / ratingCount) * 100,  // คำนวณเปอร์เซ็นต์ของแต่ละคะแนน
    }));

    return avgRatings;
  } catch (error) {
    console.error("ข้อผิดพลาดในการดึงค่าเฉลี่ยคะแนนรีวิว:", error);
    return false;
  }
};

export const onLikeButtonClick = async (
  reviewID: number,
  userID: number
): Promise<any | false> => {
  try {
    const response = await fetch(`${apiUrl}/reviews/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userID, review_id: reviewID }),
    });

    if (!response.ok) throw new Error("การตอบสนองของเครือข่ายไม่ถูกต้อง");
    return await response.json();
  } catch (error) {
    console.error("ข้อผิดพลาดในการกดไลค์:", error);
    return false;
  }
};

export const fetchLikeStatus = async (
  reviewID: number,
  userID: number
): Promise<{ hasLiked: boolean; likeCount: number } | false> => {
  try {
    const response = await fetch(
      `${apiUrl}/reviews/${userID}/${reviewID}/like`
    );
    if (!response.ok) throw new Error("การตอบสนองของเครือข่ายไม่ถูกต้อง");
    const data = await response.json();
    return {
      hasLiked: data.hasLiked ?? false,
      likeCount: data.likeCount ?? 0,
    };
  } catch (error) {
    console.error("ข้อผิดพลาดในการดึงสถานะไลค์:", error);
    return false;
  }
};

export const onUnlikeButtonClick = async (reviewID: number, userID: number) => {
  try {
    const response = await fetch(`${apiUrl}/reviews/unlike`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userID, review_id: reviewID }),
    });

    if (!response.ok) throw new Error("การตอบสนองของเครือข่ายไม่ถูกต้อง");
    return await response.json();
  } catch (error) {
    console.error("ข้อผิดพลาดในการยกเลิกไลค์:", error);
    return false;
  }
};

export const GetFilteredReviews = async (
  starLevel: string
): Promise<ReviewInterface[] | false> => {
  try {
    const query = new URLSearchParams();
    query.append("starLevel", starLevel); 

    const response = await fetch(
      `${apiUrl}/reviews/filter?${query.toString()}`, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 204) return []; 
    if (!response.ok) throw new Error("การตอบสนองของเครือข่ายไม่ถูกต้อง");

    return await response.json(); 
  } catch {
    return false; 
  }
};


export const SearchReviewsByKeyword = async (
  keyword: string
): Promise<ReviewInterface[] | false> => {
  try {
    const query = new URLSearchParams();
    query.append("keyword", keyword); // ส่งแค่ keyword

    const response = await fetch(
      `${apiUrl}/reviews/search?${query.toString()}`, // ไม่ส่ง courseID
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 204) return []; // ถ้าไม่มีรีวิวให้แสดง
    if (!response.ok) throw new Error("การตอบสนองของเครือข่ายไม่ถูกต้อง");

    return await response.json(); // ดึงข้อมูลรีวิว
  } catch (error) {
    console.error("ข้อผิดพลาดในการค้นหารีวิวตามคำสำคัญ:", error);
    return false;
  }
};


//Event API
export const CreateEvent = async (formData: FormData): Promise<any | false> => {
  try {
    const response = await fetch(`${apiUrl}/events-create`, {
      method: "POST",
      body: formData, // ส่ง FormData ไปยัง backend
    });

    if (response.status !== 201) throw new Error("Invalid response from server");

    return await response.json();
  } catch (error) {
    console.error("Error creating event:", error);
    return false;
  }
};

export const ListEvent = async (): Promise<EventsInterface[] | false> => {
  try {
    const response = await fetch(`${apiUrl}/events`, {
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

//Habitat API
export const ListHabitat = async (): Promise<HabitatInterface[] | false> => {
  try {
    const response = await fetch(`${apiUrl}/habitats`, {
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

export const CreateHabitat = async (formData: FormData): Promise<any | false> => {
  try {
    const response = await axios.post(`${apiUrl}/habitats-create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // ส่งไฟล์รูปภาพ
      },
    });

    if (response.status !== 201) {
      throw new Error('Failed to create habitat.');
    }

    return response.data;  // ส่งข้อมูล habitat ที่สร้างแล้วกลับมา
  } catch (error) {
    console.error("Error creating habitat:", error);
    return false;  // ส่งค่า false ถ้ามีข้อผิดพลาด
  }
};

//Animal API
async function GetSexs() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/sexs`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

async function GetBiological() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/biologicals`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

async function GetBehaviorals() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/behaviorals`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

async function GetZones() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/zones`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

//Animal API
export const ListAnimal = async (): Promise<AnimalsInterface[] | false> => {
  try {
    const response = await fetch(`${apiUrl}/animals`, {
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

export const CreateAnimal = async (formData: FormData): Promise<any | false> => {
  try {
    const response = await axios.post(`${apiUrl}/animals-create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",  
        Authorization: getAuthHeader(), 
      },
    });

    if (response.status !== 201) {
      throw new Error("Error creating animal");
    }

    return response.data;
  } catch (error) {
    console.error("Error creating animal:", error);
    return false;  // Return false in case of error
  }
};

//Report API
export const CreateReport = async (formData: FormData): Promise<any | false> => {
  try {
    const response = await axios.post(`${apiUrl}/reports-create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Sending form data (including file)
        Authorization: getAuthHeader(), // Authorization header with token
      },
    });

    if (response.status !== 201) {
      throw new Error("Failed to create report.");
    }

    return response.data; // Return the report data if successful
  } catch (error) {
    console.error("Error creating report:", error);
    return false; // Return false if there is an error
  }
};

export {
  GetSexs,
  GetBiological,
  GetBehaviorals,
  GetZones,
};
