import ChatBox from "@/components/chat/ChatBox";
import CommentSidebar from "../commentSidebar/comment.sidebar";
import SustainabilityLoader from "@/components/component/SustainabiltyLoader";
import BooleanInput from "@/components/question/boolean.input";
import TableUI from "@/components/question/table";
import TextQuestionUI from "@/components/question/text";
import { Button } from "@/components/ui/button";
import { Question, SubSection, Table } from "@/models/models";
import { useFetch } from "@/hooks/use-fetch";
import { Loader2, MessageSquareText, AtSign } from "lucide-react";
import { User } from "@/lib/types";
import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { toast } from "sonner";
import {fetchSubsectionData,updateSubsectionData,} from "@/utils/dataFetching";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {acceptCurrentChangeText,acceptIncomingChangeText,setActiveSubsection,updateTextAnswer} from "@/features/activeSubsectionData/activeSubsectionSlice";
import { RootState } from "@/store/store";
import MentionInput from "../user.mentioned";

interface SectionUiArgs {
  subsectionId: string;
  companyId: string | null;
}

const Section: React.FC<SectionUiArgs> = ({ subsectionId, companyId }) => {
  const dispatch = useDispatch();
  const customFetch = useFetch();
  const [searchParams] = useSearchParams();
  const [loaderProgress, setLoaderProgress] = useState<number>(10);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [activeQuestionMention, setactiveQuestionMention] = useState<{id: string; isActive: boolean;}>({ id: "", isActive: false });
  const [listUser, setUserList] = useState<User[]>([]);
  const role: string = useSelector((state: RootState) => state.auth.user?.data.role);
  const userId: string = useSelector((state: RootState) => state.auth.user?.data.id);
  const subsectionData: SubSection = useSelector((state: RootState) => state.activeSubsection.data);
 
  const loadUserData = async (
    companyId: string | null
  ): Promise<Object | void> => {
    try {
      if (!companyId) throw new Error("Company not found.");

      const res = await customFetch(`/company/${companyId}`, { method: "GET" });

      if (res.statusCode > 399 || res.statusCode < 200)
        throw new Error(res.message);

      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    role === "SUPERADMIN" &&
      loadUserData(companyId).then((res: any) => {
        setUserList(res.users);
        console.log(res.users);
      });
  }, [companyId]);

  const smoothScrollTo = (targetY: number, duration = 1000) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime: number | null = null;

    const animationStep = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      window.scrollTo(0, startY + distance * progress);
      if (progress < 1) {
        requestAnimationFrame(animationStep);
      }
    };

    requestAnimationFrame(animationStep);
  };

  useEffect(() => {
    if (subsectionData) {
      const hash = window.location.hash.substring(1); // Extract question ID from hash
      if (hash) {
        const questionElement = document.getElementById(hash);
        if (questionElement) {
          const targetY =
            questionElement.getBoundingClientRect().top + window.scrollY;
          smoothScrollTo(targetY, 1000); // Scroll over 1 second
        }
      }
    }
  }, [subsectionData, window.location.hash]);

  const [selectedQuestionForComment, setSelectedQuestionForComment] =
    useState<string>("");

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (subsectionId) {
      setIsLoaderVisible(true);
      setLoaderProgress(0);
      fetchSubsectionData(subsectionId, setLoaderProgress)
        .then((res: Object) => {
          dispatch(setActiveSubsection(res as SubSection));
        })
        .finally(() => {
          setLoaderProgress(100);
          timer = setTimeout(() => setIsLoaderVisible(false), 300);
        });
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [subsectionId]);

  useLayoutEffect(() => {
    const questionId = searchParams.get("question");
    if (questionId) {
      const questionElement = document.getElementById(questionId);
      questionElement?.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchParams, subsectionData]);

  function setUserToMention(id: string): void {
    setactiveQuestionMention({ id, isActive: !activeQuestionMention.isActive });
  }
  return isLoaderVisible ? (
    <SustainabilityLoader progress={loaderProgress} />
  ) : (
    <section className="pt-6 relative w-full flex-grow overflow-auto">
      {subsectionData && (
        <div>
          <h1 className="font-bold text-md bg-yellow-200 w-fit px-4 rounded-lg   my-3 mb-5 ">
            {subsectionData.title}
          </h1>
          {subsectionData.questions &&
            subsectionData.questions.map((question: Question) => (
              <div className="mb-5 py-3" key={question.id} id={question.id}>
                <h3 className="text-center font-semibold text-green-500 text-lg mb-4">
                  {question.heading}
                </h3>
                <div className="flex gap-3 justify-between w-[96%]">
                  <p
                    className={`text-sm mb-2 text-green-800 font-semibold w-[90%]
                      `}
                  >
                    {question.desc}
                  </p>
                  {role == "SUPERADMIN" && (
                    <button
                      onClick={() => setUserToMention(question.id)}
                      className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 transition-colors text-sm font-medium"
                    >
                      <AtSign size={18} />
                      <span className="text-base">Assign</span>
                    </button>
                  )}
                  <MentionInput
                    question={question}
                    activeQuestionMention={activeQuestionMention}
                    users={listUser}
                  />
                  <button
                    onClick={() => setSelectedQuestionForComment(question.id)}
                    className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 transition-colors text-sm font-medium"
                  >
                    <MessageSquareText size={18} />

                    <span className="text-base">
                      {question._count.comments}
                    </span>
                  </button>
                </div>

                {/* When question type is table */}
                {question.type === "TABLE" &&
                  question.answer_table &&
                  question.answer_table.map(
                    (table: Table, tableIndex: number) => (
                      <TableUI
                        companyId={companyId}
                        key={table.id}
                        tableId={table.id}
                        questionId={question.id}
                        tableIndex={tableIndex}
                        questionIndex={question.index}
                      />
                    )
                  )}

                {/* When question type is a text */}
                {question.type === "TEXT" && (
                  <>
                    <span className="flex gap-4 my-2 ml-1 w-[97%]">
                      <TextQuestionUI
                       
                        assignedToId={question.assignedToId}
                        value={question.answer_text}
                        key={question.id}
                        updateTextAnswer={(answer: string) =>
                          dispatch(
                            updateTextAnswer({
                              questionId: question.id,
                              answer,
                            })
                          )
                        }
                      />

                      {/* When text question has conflicts - render the button to accept the current change */}
                      {question.text_conflict && (
                        <Button
                          onClick={() =>
                            dispatch(
                              acceptCurrentChangeText({
                                questionId: question.id,
                              })
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 w-52"
                        >
                          Accept Current Change
                        </Button>
                      )}
                    </span>

                    {/* When text question has conflicts -  render the incoming change */}
                    {question.text_conflict && (
                      <span className="flex gap-4 my-2 ml-1 w-[97%]">
                        <pre
                          className={`ml-1 max-h-32 overflow-auto flex rounded-md border-input bg-background px-3 py-2 text-sm
                          file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground
                          disabled:cursor-not-allowed disabled:opacity-50 outline-none w-[97%] bg-green-100 border border-green-600 text-green-800`}
                        >
                          {question.text_conflict}
                        </pre>

                        {/* Button to accept the incoming change */}
                        <Button
                          onClick={() =>
                            dispatch(
                              acceptIncomingChangeText({
                                questionId: question.id,
                              })
                            )
                          }
                          className="bg-green-600 text-white font-semibold px-3 py-1 w-52"
                        >
                          Accept Incoming Change
                        </Button>
                      </span>
                    )}
                  </>
                )}

                {/* When question type is boolean */}
                {question.type === "BOOLEAN" && (
                  <>
                    <div className="flex gap-4 pr-7">
                      <BooleanInput
                        updateAnswer={(answer: string) =>
                          dispatch(
                            updateTextAnswer({
                              questionId: question.id,
                              answer,
                            })
                          )
                        }
                        answer={question.answer_text}
                      />

                      {/* Button to accept the current change in case of conflict */}
                      {question.text_conflict && (
                        <Button
                          onClick={() =>
                            dispatch(
                              acceptCurrentChangeText({
                                questionId: question.id,
                              })
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 w-52"
                        >
                          Accept Current Change
                        </Button>
                      )}
                    </div>

                    {/* Render Incoming change in case of conflicts */}
                    {question.text_conflict && (
                      <div className="flex pr-7 mt-4 gap-4">
                        <button
                          disabled={true}
                          className={` ${
                            question.text_conflict?.startsWith("1")
                              ? "bg-green-600"
                              : "bg-red-600"
                          } rounded-sm px-8 py-2 text-gray-50 font-bold text-sm`}
                        >
                          {question.text_conflict?.startsWith("1")
                            ? "Yes"
                            : "No"}
                        </button>

                        <input
                          placeholder="Reason"
                          className=" flex-grow px-3 py-1 rounded-sm border border-gray-300"
                          disabled={true}
                          value={
                            question.text_conflict
                              ? question.text_conflict.substring(1)
                              : ""
                          }
                        />

                        {/* Button to accept the incoming conflict */}
                        <Button
                          onClick={() =>
                            dispatch(
                              acceptIncomingChangeText({
                                questionId: question.id,
                              })
                            )
                          }
                          className="bg-green-600 text-white font-semibold px-3 py-1 w-52"
                        >
                          Accept Incoming Change
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
        </div>
      )}
      {subsectionData && (
        <div>
          <Button
            disabled={isSaving}
            onClick={() => {
              setIsSaving(true);
              toast.promise(
                updateSubsectionData(subsectionData, companyId || ""),
                {
                  success: (res) => {
                    return res.message;
                  },
                  error: (err) => {
                    return err.message;
                  },
                  finally: () => setIsSaving(false),
                }
              );
            }}
            className=" bg-yellow-500 hover:bg-yellow-600 w-24 text-white font-bold px-8 py-2 rounded-sm"
          >
            {isSaving ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </div>
      )}
      <ChatBox />
      <CommentSidebar
        setSubsectionData={(subsectionData: SubSection) => {
          dispatch(setActiveSubsection(subsectionData));
        }}
        closeSidebar={() => setSelectedQuestionForComment("")}
        questionId={selectedQuestionForComment}
      />
    </section>
  );
};

export default memo(Section);
