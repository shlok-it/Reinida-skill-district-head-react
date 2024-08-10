import React, { useEffect, useMemo, useState } from 'react';
import { toast } from "react-toastify";
import { call_secure_get_api } from "../../connect/api";
import { formatDate} from '../../helper/general.js';
import { changeBCSubTitle } from "../../slices/thunk";
import { useDispatch } from "react-redux";
import DataTableShow from '../../Components/Common/DataTableShow.js';
const Listing = () => {
  const [display, setDisplay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emp_list, setEmp_list] = useState([]);
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [indexfrom, setIndexfrom] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const this_month = formatDate(
    new Date(new Date().setMonth(new Date().getMonth()))
  );
  const page = 1;
  const [colName, setColName] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [search_date, setSearchDate] = useState("");
  const [search_key, setSearch_key] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    fetch_push_notification();
    dispatch(changeBCSubTitle('Notification List'));
  }, []);

  const fetch_push_notification = (pagenum = page, size = perPage, col = colName, sort = sortBy) => {
    call_secure_get_api(
      `notification/list?page=${pagenum}&per_page=${size}&colName=${col}&sortBy=${sort}&search_date=${search_date}&search_key=${search_key}&delay=1`
    ).then(
      (resolve) => {
        if (resolve.status == true) {
          setData(resolve.data.data);
          setIndexfrom(resolve.data.from);
          setTotalRows(resolve.data.total);
          setLoading(false);
        }
        else {
          toast.error(resolve.message, "error", 5000);
          setData([]);
        }
      },
      (reject) => {
        console.log(reject);
      }
    )
  }
  const columns = useMemo(
    () => [
      {
        name: "#",
        cell: (d, index) => <div>{indexfrom + index}</div>,
        sortable: false,
        width: '30px',
      },
      {
        name: "Created",
        selector: (row) => row.created_at,
        sortable: true,
        wrap: true,
      },
      {
        name: "Send Date",
        selector: (row) => row.send_at,
        sortable: true,
        wrap: true,
      },
      {
        name: "Title",
        selector: (row) => row.title,
        sortable: true,
        wrap: true,
      },
      {
        name: "Notification Text",
        selector: (row) => row.notification_text,
        wrap: true,
        sortable: false,
      },
      {
        name: "Target To",
        cell: (d) => {
          return ((d.target_to && d.target_to.length > 0) ? d.target_to.length : 'All Staff')
        },
        sortable: false,
      },
      {
        name: "Status",
        cell: (d) => {
          return (d.status == "1" ?
            <div className="badge rounded-pill text-success bg-light-success fs-12 " >Active</div>
            :
            <div className="badge rounded-pill text-danger bg-light-danger fs-12 ">Inactive</div>
          )
        },
        sortable: false,
      }
    ],
    [indexfrom, emp_list, data]
  );
 


  const handlePageChange = (page) => {
    fetch_push_notification(page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    fetch_push_notification(page, newPerPage);
    setPerPage(newPerPage);
  };

  const handleSort = (column, sortDirection) => {
    const str = column.selector.toString();
    const arr = str.split('.');
    const colName = arr[1] ? arr[1] : '';
    fetch_push_notification(page, perPage, colName, sortDirection);
    setColName(colName);
    setSortBy(sortDirection);
  };
  return (
    <>
      <div className="card radius-10">
        <div className="card-body">
          <div className="d-lg-flex align-items-center mb-4 gap-3">
            <div className="position-relative">
              <input
                type="text"
                className="form-control form-control-sm radius-30"
                placeholder="Search Title"
                value={search_key || ''}
                onChange={(e) => setSearch_key(e.target.value)}
              />
            </div>
            <div className="position-relative">
              <input
                type="date"
                max={this_month}
                value={search_date || ''}
                onChange={(e) => setSearchDate(() => e.target.value)}
                className="form-control form-control-sm radius-30"
              />
            </div>
            <div className="position-relative">
              <button onClick={() => fetch_push_notification()} className="btn btn-secondary btn-sm radius-30 mt-2 mt-lg-0">Search</button>
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
    </>
  );
}
export default Listing;