import HomeContainer from "./_components/HomeContainer";
import { getPublishedFaqs, getPublishedPrograms } from "@/lib/queries/public-content";
import { toCourse } from "@/lib/queries/public-mappers";

// Content is edited in the admin panel and must show up without a redeploy.
export const dynamic = "force-dynamic";

const HOME_PROGRAM_LIMIT = 3;

export default async function Home() {
  const [programs, faqs] = await Promise.all([
    getPublishedPrograms(HOME_PROGRAM_LIMIT),
    getPublishedFaqs(),
  ]);

  return (
    <HomeContainer
      courses={programs.map(toCourse)}
      faqs={faqs.map(({ id, question, answer }) => ({ id, question, answer }))}
    />
  );
}
