import React, { useMemo, useState, useEffect } from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import { useNavigate } from "react-router-dom";
import { LoaderTwo } from "../utils/Loader";
import { useSelector } from "react-redux";
import {
  AiOutlineSortDescending,
  AiOutlineSortAscending,
} from "react-icons/ai";
import PopupCard from "../utils/PopupCard";

function ResultsTable() {
  const navigate = useNavigate();
  const [filterInput, setFilterInput] = useState("");
  const [loading, setLoading] = useState(true);
  const { FinalData } = useSelector((state) => state.authSlice);
  const [popup, setPopup] = useState(false);
  const [studentDetails, setStudentDetails] = useState({});

  useEffect(() => {
    // Simulate asynchronous data fetching
    setTimeout(() => {
      setLoading(false);
    }, 100); // Adjust the timeout value as needed
  }, []);

  // Define the columns
  const columns = useMemo(
    () => [
      {
        Header: "HallTicket No",
        accessor: "hallticketNo",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Date of Birth",
        accessor: "dateOfBirth",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Maths",
        accessor: "Maths",
      },
      {
        Header: "Physics",
        accessor: "Physics",
      },
      {
        Header: "Chemistry",
        accessor: "Chemistry",
      },
      {
        Header: "Total",
        accessor: "Total",
      },
      {
        Header: "Rank",
        accessor: "Rank",
      },
      {
        Header: "Details",
        accessor: "button",
      },
    ],
    []
  );

  // Filter Logic
  const data = useMemo(() => {
    return FinalData
      ? FinalData.map((item) => ({
          ...item,
          button: (
            <button onClick={() => handleButtonClick(item)}>Get Details</button>
          ),
        }))
      : [];
  }, [FinalData]);

  const handleButtonClick = (rowData) => {
    console.log(rowData);
    setStudentDetails(rowData);
    setPopup(true);
  };

  // Initialize the table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 50 }, // Set initial pageSize to 5
    },
    useFilters,
    useSortBy,
    usePagination
  );

  // Handle filter input change
  const handleFilterChange = (e) => {
    const value = e.target.value || "";
    setFilterInput(value);
  };

  // Render the table
  return (
    <div className="results-table">
      <button onClick={() => navigate("/dash")}>Home</button>
      <h2>Results</h2>
      <input
        className="input-field"
        type="text"
        value={filterInput}
        onChange={handleFilterChange}
        placeholder="Search by Hall Ticket Number or Name"
      />
      {loading ? (
        <div
          style={{
            position: "fixed",
            height: "100vh",
            width: "100%",
            display: "grid",
            placeItems: "center",
          }}
        >
          <LoaderTwo />
        </div>
      ) : (
        <div className="tableDiv">
          <table {...getTableProps()} className="table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="table-header"
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="table-header-cell"
                    >
                      {column.render("Header")}
                      {column.isSorted && (
                        <span className="icon-span">
                          {column.isSortedDesc ? (
                            <AiOutlineSortDescending className="desc" />
                          ) : (
                            <AiOutlineSortAscending className="asce" />
                          )}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="table-body">
              {page.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <tr
                    key={rowIndex}
                    {...row.getRowProps()}
                    className="table-row"
                  >
                    {row.cells.map((cell, colIndex) => {
                      return (
                        <td
                          key={colIndex}
                          {...cell.getCellProps()}
                          className="table-cell"
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {popup && <PopupCard details={studentDetails} setPopup={setPopup} />}
      <div className="page-buttons">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          first page
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"prev"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>{" "}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {"next"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          last page
        </button>{" "}
      </div>
    </div>
  );
}

export default ResultsTable;
