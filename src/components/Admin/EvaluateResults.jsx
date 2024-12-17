import { useState } from "react";
import { LoaderTwo } from "../utils/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { changeFinalData } from "../redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
// export let FinalData = null;
export function EvaluateResults() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const evaluateFunction = async () => {
    console.log("evaluate");
    setIsLoading(true);

    try {
      const response = await axios.get(
        import.meta.env.VITE_EVALUATE_RESULT_URL,
        {
          withCredentials: true,
        }
      );

      if (!response.data.finalResults) {
        throw new Error("Network response was not ok");
      }

      const finalData = response.data.finalResults;
      console.log(finalData);
      const Result = finalData.map((item, index) => ({
        hallticketNo: item.hallTicketNo,
        dateOfBirth: item.dateOfBirth,
        Maths: item.scores.mathematics,
        Physics: item.scores.physics,
        Chemistry: item.scores.chemistry,
        Total: item.scores.total,
        name: item.name,
        gender: item.gender,
      }));
      Result.sort((a, b) => b.Total - a.Total);

      // Loop through the sorted data and update the rank
      Result.forEach((item, index) => {
        item.Rank = index + 1;
      });
      dispatch(changeFinalData(Result));
      toast.success("Results Evaluated", { autoClose: 2000 });
      setTimeout(() => navigate("/results"), 600);
      setIsLoading(false);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setIsLoading(false);
      toast.error("something went wrong");
    }
  };

  return (
    <>
      {isLoading ? (
        <LoaderTwo />
      ) : (
        <button onClick={evaluateFunction} className="evaluateResults">
          Click Here To Start Evaluation
        </button>
      )}
      <ToastContainer />
    </>
  );
}

// export  {data,}; // Export the data variable
