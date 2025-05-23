// src/mocks/db.js
export const mockDB = {
  lessons: [],
  teachers: [
    {
      id: 1,
      teacherId: 2,
      firstName: "Rahat",
      lastName: "Kerimkul",
      birthDate: "03.16.2004",
      phoneNumber: "87716819404",
      email: "kerimkul.raha@mail.ru",
      salary: "12000",
      gender: "MALE",
    },
  ],
  courses: [
    {
      id: 1,
      educationCenterId: 1, // 👈 Replace with actual EC ID if available dynamically
      name: "Birge English School",
      description: "dsaasddsaasd",
      courseCategory: "art",
      ageRange: "10-15",
      price: "12000",
      durability: "4",
    },
  ],
  groups: [
    {
      id: 1,
      name: "123asd",
      minParticipants: "1",
      maxParticipants: "12",
      startEducationDate: "05.23.2025",
      language: "EN",
      course: "1",
      teacher: "1",
    },
  ],
  attendance: [],
  schedules: [
    {
      id: 101,
      groupId: 1,
      dayOfWeek: "MONDAY",
      startTime: "10:00",
      endTime: "11:00",
    },
    {
      id: 102,
      groupId: 1,
      dayOfWeek: "WEDNESDAY",
      startTime: "14:00",
      endTime: "15:00",
    },
  ],
};
