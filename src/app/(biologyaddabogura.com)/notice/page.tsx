import React from "react";
import NoticePageContainer from "./_components/NoticePageContainer";
import { getPublishedNotices } from "@/lib/queries/public-content";
import { formatNoticeDate } from "@/lib/queries/public-mappers";

export const dynamic = "force-dynamic";

const Notice = async () => {
  const notices = await getPublishedNotices();

  return (
    <div>
      <NoticePageContainer
        notices={notices.map((notice) => ({
          id: notice.id,
          date: formatNoticeDate(notice.date),
          title: notice.title,
          priority: notice.priority,
          category: notice.category,
          description: notice.description,
          status: notice.status,
        }))}
      />
    </div>
  );
};

export default Notice;
