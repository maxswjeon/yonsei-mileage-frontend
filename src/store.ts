import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Course } from "./models/course";

type CourseWithMileage = Course & { mileage: number };

interface InformationState {
  a1: number;
  a2: number;
  b1: number;
  b2: number;
  subjects: number;
  grade: number;
  graduate: boolean;
  courses: CourseWithMileage[];
  setData: (data: Partial<InformationState>) => void;
  reset: () => void;
  addCourse: (course: Course) => void;
  clearCourses: () => void;
}

export const useStore = create<InformationState>()(
  devtools(
    persist(
      (set) => ({
        a1: -1,
        a2: -1,
        b1: -1,
        b2: -1,
        subjects: -1,
        grade: -1,
        graduate: false,
        courses: [],
        setData: (data: Partial<InformationState>) => {
          set(() => ({ ...data }));
        },
        reset: () => {
          set(() => ({
            a1: -1,
            a2: -1,
            b1: -1,
            b2: -1,
            subjects: -1,
            grade: -1,
          }));
        },
        addCourse: (course: Course) => {
          set((state) => ({
            ...state,
            courses: [...state.courses, { ...course, mileage: 0 }],
          }));
        },
        clearCourses: () => {
          set((state) => ({ ...state, courses: [] }));
        },
      }),
      {
        name: "yonsei",
        getStorage: () => localStorage,
      }
    )
  )
);
