import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
function Answers() {
  const [answerData, setAnswerData] = useState({
    physics: [],
    chemistry: [],
    mathematics: [],
  });

  const handleFileUpload = (subject, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const parsedData = parseExcel(workbook);
      setAnswerData((prevData) => ({ ...prevData, [subject]: parsedData }));
    };
    reader.readAsArrayBuffer(file);
  };

  const parseExcel = (workbook) => {
    const data = [];

    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];

      let rowIndex = 1;

      while (true) {
        const questionCell = worksheet[`A${rowIndex}`];
        const optionCell = worksheet[`B${rowIndex}`];

        if (!questionCell || !optionCell) break; // If either cell is missing, we've reached the end of the data

        const questionNumber = questionCell.v.toString().trim();
        const correctOption = optionCell.v.toString().trim();

        data.push({ question: questionNumber, options: correctOption });

        rowIndex++;
      }
    });

    return data;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (
      answerData.chemistry.length === 0 &&
      answerData.physics.length === 0 &&
      answerData.mathematics.length === 0
    ) {
      return toast.warning("please upload all papers");
    } else if (answerData.physics.length === 0) {
      return toast.warning("please upload physics paper");
    } else if (answerData.mathematics.length === 0) {
      return toast.warning("please  upload mathematics paper");
    } else if (answerData.chemistry.length === 0) {
      return toast.warning("please upload chemistry paper");
    }
    try {
      const formattedOutput = {
        answer: Object.keys(answerData).map((subject) => ({
          subject,
          data: answerData[subject],
        })),
      };
      console.log(formattedOutput);

      // Sending data to endpoint
      const response = await axios.post(
        import.meta.env.VITE_ADD_ANSWERS_URL,

        formattedOutput,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response.data);
      if (response.data.success) {
        return toast.success("uploaded successfully");
      }
    } catch (error) {
      toast.error("Error Uploading");
      console.error(error);
    }
  };

  return (
    <>
      <form className="inputDetails">
        <h1>Answers Section</h1>
        <div className="labelInputsSet">
          <div className="labelInput">
            <label htmlFor="mathsFile">Upload Mathematics Answers:</label>
            <br />
            <input
              className="excelInput"
              id="mathsFile"
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) =>
                handleFileUpload("mathematics", e.target.files[0])
              }
            />
          </div>
          <div className="labelInput">
            <label htmlFor="physicsFile">Upload Physics Answers:</label>
            <br />
            <input
              className="excelInput"
              id="physicsFile"
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => handleFileUpload("physics", e.target.files[0])}
            />
          </div>
          <div className="labelInput">
            <label htmlFor="chemistryFile">Upload Chemistry Answers:</label>
            <br />
            <input
              className="excelInput"
              id="chemistryFile"
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => handleFileUpload("chemistry", e.target.files[0])}
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
}

export default Answers;
