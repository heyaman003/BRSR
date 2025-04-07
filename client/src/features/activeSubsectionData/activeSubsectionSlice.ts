import { Question, SubSection } from "@/models/models";
import { Table } from "@/models/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const activeSubsectorSlice = createSlice({
  name: "activeSubsection",
  initialState: {
    data: {} as SubSection,
  },
  reducers: {
    setActiveSubsection: (state, action: PayloadAction<SubSection>) => {
      state.data = {
        ...action.payload,
        questions: action.payload.questions.sort((a, b)=>a.index-b.index)
          .map((question) => ({
            ...question,
            answer_table: question.answer_table?.map((table) => ({
              ...table,
              rows: table.rows.sort((a, b)=>a.index - b.index).map((row) => ({
                ...row,
                cells: row.cells.sort((a, b)=>a.index - b.index)
              })),
            }))
          }))
      }
    },
    updateTableData: (state, action: PayloadAction<{tableData:Table, questionId: string}>) => {
      const { questionId, tableData } = action.payload;
      state.data = {
        ...state.data, 
        questions:state.data.questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              answer_table: question.answer_table?.map((table) =>
                table.id === tableData.id ? tableData : table
              ),
            }
          : question
      )
    }},
    updateCellData: (state, action: PayloadAction<{questionIndex: number, tableIndex: number, rowIndex: number, cellIndex: number, value: string}>) => {
      const { questionIndex, tableIndex, rowIndex, cellIndex, value } = action.payload;

      state.data = {
        ...state.data,
        questions: state.data.questions.map((question) =>
          question.index === questionIndex
            ? {
                ...question,
                answer_table: question.answer_table?.map((table, ind) =>
                  ind === tableIndex
                    ? {
                        ...table,
                        rows: table.rows.map((row) =>
                          row.index === rowIndex
                            ? {
                                ...row,
                                cells: row.cells.map((cell) =>
                                  cell.index === cellIndex
                                    ? { ...cell, data: value }
                                    : cell
                                ),
                              }
                            : row
                        ),
                      }
                    : table
                ),
              }
            : question
        )
      }

    },
    updateTextAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.data = {
        ...state.data,
        questions: state.data.questions.map((question: Question) =>
          question.id === questionId
            ? { ...question, answer_text: answer }
            : question
        )
      }
      
    },
  },
});

export const { setActiveSubsection, updateTableData, updateTextAnswer, updateCellData } =
  activeSubsectorSlice.actions;
export const activeSubsectionReducer = activeSubsectorSlice.reducer;
