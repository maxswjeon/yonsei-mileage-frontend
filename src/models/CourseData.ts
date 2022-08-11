import { Course } from "./course";
import { History } from "./history";

export type CourseData = {
  course: Course;
  data: History[];
  min: number;
  min_by_grade: number[];
};
