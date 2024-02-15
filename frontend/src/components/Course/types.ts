import { AccountInterface } from "../Login/types";

export interface FullCourseInterface {
  id: string;
  shortName: string;
  longName: string;
  year: number;
  semester: number;
  domain: string;
  posts: PostInterface[];
}

export interface PostInterface {
  id: string;
  classId: string;
  userId: string;
  title: string;
  description: string;
  resourceType: string;
  resourceUrl: string;
  classSection: string;
  user: AccountInterface;
  likes: LikeInterface[];
  comments: CommentInterface[];
}

interface LikeInterface {
  id: string;
  userId: string;
  postId: string;
}

interface CommentInterface {
  id: string;
  userId: string;
  postId: string;
  message: string;
  createdAt: string;
  user: AccountInterface;
}

export interface CourseFilters {
  section: "materials" | "courses" | "seminars" | "laboratory" | "forum";
}

export const courseFiltersObkect = [
  "materials",
  "courses",
  "seminars",
  "laboratory",
  "forum",
];
