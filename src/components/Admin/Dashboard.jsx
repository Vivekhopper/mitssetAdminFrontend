import React, { useState, useCallback } from "react";
import { FaUser } from "react-icons/fa";
import Questions from "./Questions";
import Answers from "./Answers";
import DisplayComponent from "./DisplayComponent";
import { useNavigate } from "react-router-dom";
import navimage from "/assets/images/navImage.jpg";
import AddAdmin from "./AddAdmin";
import ChangePassword from "./ChangePassword";
import { EvaluateResults } from "./EvaluateResults";
import bgimage from "/assets/images/bg.png";
import { logout } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { LoaderTwo } from "../utils/Loader";
function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminName } = useSelector((state) => state.authSlice);

  const [selectedOption, setSelectedOption] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  const handleOptionClick = useCallback(
    (option) => {
      if (selectedOption === option) {
        return;
      }
      setSelectedOption(option);
    },
    [selectedOption]
  );

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className="dashboardBox">
      <div className="navbar">
        <img src={navimage} alt="" />
        <div>
          <h2>Madanapalle Institute of Technology & Science Entrance Test</h2>
        </div>
      </div>
      <div className="wholeContent">
        <div className="options">
          <div className="name">
            <div>
              <FaUser className="user" />{" "}
            </div>
            <div>{adminName ? adminName : "admin"}</div>
          </div>
          <div className="content">
            {/* <div onClick={()=>navigate('/dash')}>Home</div> */}
            <div
              className={selectedOption === "changePassword" ? "active" : ""}
              onClick={() => handleOptionClick("changePassword")}
            >
              Change Password
            </div>
            <div
              className={selectedOption === "addadmin" ? "active" : ""}
              onClick={() => handleOptionClick("addadmin")}
            >
              Add Admin
            </div>
            <div onClick={logoutHandler}>Sign Out</div>
          </div>
        </div>
        <div className="details">
          <div className="detailsBox">
            <div className="selectOptions">
              <div
                className={selectedOption === "questions" ? "active" : ""}
                onClick={() => handleOptionClick("questions")}
              >
                Add Questions
              </div>
              <div
                className={selectedOption === "answers" ? "active" : ""}
                onClick={() => handleOptionClick("answers")}
              >
                Add Answers
              </div>
              <div
                className={selectedOption === "results" ? "active" : ""}
                onClick={() => handleOptionClick("results")}
              >
                Evaluate Results
              </div>
              <div
                className={selectedOption === "getResults" ? "active" : ""}
                onClick={() => {
                  navigate("/results");
                }}
              >
                Get Results
              </div>
              <div
                className={selectedOption === "graphs" ? "active" : ""}
                onClick={() => handleOptionClick("graphs")}
              >
                Graphs
              </div>
            </div>
            <div className="changeOptions" onLoad={handleImageLoad}>
              {isLoading && <LoaderTwo />}
              {selectedOption === "" && (
                <img className="backgroundImage" src={bgimage} alt="image" />
              )}
              {selectedOption === "results" && <EvaluateResults />}
              {selectedOption === "graphs" && <DisplayComponent />}
              {selectedOption === "questions" && <Questions />}
              {selectedOption === "answers" && <Answers />}
              {selectedOption === "addadmin" && <AddAdmin />}
              {selectedOption === "changePassword" && <ChangePassword />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
