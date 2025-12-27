export type NoticePriority = "HIGH" | "MEDIUM" | "LOW";
export type NoticeStatus = "New" | "Active" | "Upcoming" | "Expired";

export interface Notice {
  id: string;
  date: string;
  title: string;
  priority: NoticePriority;
  category: string;
  description: string;
  status: NoticeStatus;
}

