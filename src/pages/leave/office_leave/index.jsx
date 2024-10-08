import React, { useState, useEffect, useMemo } from "react";
import { call_secure_get_api } from "../../../connect/api.js";
import { toast } from "react-toastify";
import {
  formatTime,
  formatDateTime,
  formatMonth,
} from "../../../helper/general.js";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import { changeBCSubTitle } from "../../../slices/thunk";
import { useDispatch } from "react-redux";
import DataTableShow from "../../../Components/Common/DataTableShow.js";
const OfficeLeave = () => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(null);
  const { currentUser } = useStateContext();

  const [leave_month, setLeaveMonth] = useState(
    formatMonth(new Date(new Date().setMonth(new Date().getMonth())))
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [indexfrom, setIndexfrom] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const page = 1;
  const [colName, setColName] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [from_date, setFromDate] = useState("");
  const [to_date, setToDate] = useState("");
  useEffect(() => {
    get_emp_list();
    dispatch(changeBCSubTitle("Office Leave"));
  }, [leave_month]);
  const get_emp_list = (
    pagenum = page,
    size = perPage,
    col = colName,
    sort = sortBy
  ) => {
    setLoading(true);
    call_secure_get_api(
      `leave/office/list?page=${pagenum}&per_page=${size}&colName=${col}&sortBy=${sort}&from_date=${from_date}&to_date=${to_date}&delay=1`
    ).then(
      (resolve) => {
        if (resolve.status === true) {
          setData(resolve.data.data);
          setIndexfrom(resolve.data.from);
          setTotalRows(resolve.data.total);
          setLoading(false);
        } else {
          toast.error(resolve.message, "error", 5000);
          setData([]);
        }
      },
      (reject) => {
        console.log(reject);
        toast.error("Server Error", "error", 5000);
      }
    );
  };
  const parent_handler = (reload) => {
    setDisplay(null);
    if (reload) {
      get_emp_list();
    }
  };


  const columns = useMemo(
    () => [
      {
        name: "#",
        cell: (d, index) => <div>{indexfrom + index}</div>,
        sortable: false,
        width: "40px",
      },
      {
        name: "Reason",
        cell: (d) => {
          return (
            <div>
              <span>
                {d.leave_resion}{" "}
                {d.leave_type == 3
                  ? formatTime(d.from_time) + "-" + formatTime(d.to_time)
                  : ""}
              </span>
            </div>
          );
        },
        wrap: true,
      },
      

      {
        name: "Date From",
        selector: (row) => row.from_date,
        sortable: true,
        wrap: true,
        className: "text-nowrap",
      },
      {
        name: "Date To",
        selector: (row) => row.to_date,
        sortable: true,
        wrap: true,
        className: "text-nowrap",
      },{
        name: "Created",
        selector: (row) => formatDateTime(row.created_at,'date'),
        sortable: true,
        wrap: true,
      },
      {
        name: "type",
        cell: (d) => {
          return (
            <div>
              <span>
                {d.leave_type == 3
                  ? "Other"
                  : d.leave_type == 1
                  ? "Full Day"
                  : "Half Day (" + d.leave_session + ")"}
              </span>
            </div>
          );
        },
      },
     
      
    ],
    [indexfrom]
  );
  const handleSort = (column, sortDirection) => {
    const str = column.selector.toString();
    const arr = str.split(".");
    const colName = arr[1] ? arr[1] : "";
    get_emp_list(page, perPage, colName, sortDirection);
    setColName(colName);
    setSortBy(sortDirection);
  };
  const handlePageChange = (page) => {
    get_emp_list(page);
    setCurrentPage(page);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    get_emp_list(page, newPerPage);
    setPerPage(newPerPage);
  };
  const searchFun = (e) => {
    e.preventDefault();
    get_emp_list();
  };
  return (
    <React.Fragment>
      <div className="card radius-10">
        <div className="card-body">
          <div className="d-lg-flex align-items-center mb-4 gap-3">
            <div className="position-relative">
              <input
                type="date"
                className="form-control form-control-sm radius-30"
                value={from_date}
                onChange={(e) => setFromDate(() => e.target.value)}
                placeholder="From date"
              />
            </div>
            <div className="position-relative">
              <input
                type="date"
                className="form-control form-control-sm radius-30"
                value={to_date}
                min={from_date}
                onChange={(e) => setToDate(() => e.target.value)}
                placeholder="To date"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={(e) => searchFun(e)}
                className="btn btn-success"
              >
                Search
              </button>
            </div>
          </div>

          {display}
          <DataTableShow
            // title="Career Form"
            header={"table-light"}
            highlightOnHover={true}
            responsive={true}
            data={data}
            columns={columns}
            selectableRows={true}
            pagination={true}
            onSort={handleSort}
            progressPending={loading}
            sortServer={true}
            paginationServer={true}
            paginationTotalRows={totalRows}
            paginationDefaultPage={currentPage}
            onChangeRowsPerPage={handlePerRowsChange}
            onSelectedRowsChange={false}
            onChangePage={handlePageChange}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
export default OfficeLeave;
