import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [startTime, setStartTime] = useState("");

  const parseExcel = (workbook, subject) => {
    const data = [];

    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];

      let rowIndex = 1;

      while (true) {
        const questionCell = worksheet[`A${rowIndex}`];
        if (!questionCell) break;

        const question = questionCell.v.trim();
        const options = [];

        for (let colIndex = 1; colIndex <= 4; colIndex++) {
          const optionCell =
            worksheet[XLSX.utils.encode_cell({ r: rowIndex - 1, c: colIndex })];
          if (!optionCell) break;

          const option = optionCell.v.trim();
          options.push({ text: option });
        }

        data.push({ question, options });
        rowIndex++;
      }
    });

    return { subject, data };
  };

  const handleQuestionsUpload = (subject) => (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const parsedQuestions = parseExcel(workbook, subject);
        console.log(parsedQuestions);
        setQuestions((prevQuestions) => [...prevQuestions, parsedQuestions]);
      } catch (error) {
        console.error("Error parsing Excel file:", error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    // console.log({ questions: questions });
    if (!startTime && questions.length !== 3) {
      return toast.warning("please select all things");
    }
    if (!startTime) {
      return toast.warning("please set the start time");
    }
    if (questions.length !== 3) {
      return toast.warning("please upload all papers");
    }
    try {
      const response = await axios.post(
        import.meta.env.VITE_ADD_QUESTIONS_URL,
        { questions: questions, startTime }, // Request data
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensure credentials are included
          mode: "cors", // Add this option
        }
      );

      // console.log(response.data);
      if (response.data.success) {
        toast.success("Uploaded successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Uploading");
    }
  };

  const changeStartTimeHandler = (e) => {
    setStartTime(() => e.target.value);
  };

  return (
    <>
      <form className="inputDetails">
        <h1>Questions Section</h1>
        <div className="labelInputsSet">
          <div className="labelInput">
            <label htmlFor="startTime">Set Start Time :</label> <br />
            <input
              id="startTime"
              type="time"
              value={startTime}
              onChange={changeStartTimeHandler}
            />
          </div>
          <div className="labelInput">
            <label htmlFor="mathsFile">Upload Mathematics Questions:</label>{" "}
            <br />
            <input
              className="excelInput"
              id="mathsFile"
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleQuestionsUpload("Mathematics")}
            />
          </div>
          <div className="labelInput">
            <label htmlFor="physicsFile">Upload Physics Questions:</label>
            <br />
            <input
              className="excelInput"
              id="physicsFile"
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleQuestionsUpload("Physics")}
            />
          </div>
          <div className="labelInput">
            <label htmlFor="chemistryFile">Upload Chemistry Questions:</label>
            <br />
            <input
              className="excelInput"
              id="chemistryFile"
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleQuestionsUpload("Chemistry")}
            />
          </div>
          <button className="sendSubmit" onClick={handleSend}>
            Send
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default Questions;
