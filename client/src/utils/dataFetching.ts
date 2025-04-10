import { SubSection } from "@/models/models";

export const fetchSubsectionData = async (
  subsectionId: string,
  updateProgress: (value: number) => void
) => {
  updateProgress(10);
  const raw = await fetch(
    `${import.meta.env.VITE_SERVER_URI}/section/subsection/${subsectionId}`,
    {
      credentials: "include",
      headers: { "X-Csrf-Token": sessionStorage.getItem("X-Csrf-Token") || "" },
    }
  );
  updateProgress(50);
  const res = await raw.json();
  await new Promise((res: any) => {
    updateProgress(90);
    res();
  });

  return res.data;
};

const doesSubsectionHaveConflict = (subsection: SubSection): boolean => {
  for (const question of subsection.questions) {
    if(question.text_conflict)return true
    if (question.answer_table)
      for (const table of question.answer_table) {
        if (table.conflict) return true;
      }
  }
  return false;
};

export const updateSubsectionData = async (subsectionData: SubSection) => {
  if(doesSubsectionHaveConflict(subsectionData))
    throw new Error("Please resolve all the conflicts first.")
  const raw = await fetch(
    `${import.meta.env.VITE_SERVER_URI}/section/subsection/${
      subsectionData.id
    }`,
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Csrf-Token": sessionStorage.getItem("X-Csrf-Token") || "",
      },
      body: JSON.stringify(subsectionData),
    }
  );
  const res = await raw.json();
  if (raw.status < 200 || raw.status >= 400) throw new Error(res.message);
  return res;
};
