import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/hotel";
import TableHeader from "./Header";
import Pagination from "./Pagination";
import Search from "./Search";
import { withStyles, ButtonGroup, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Swal from "sweetalert2";

const styles = (theme) => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem",
    },
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});

const DataTable = ({ userId, classes, ...props }) => {
  const [query, setQuery] = useState("name");
  const [hotels, setHotels] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const ITEMS_PER_PAGE = 10;

  const headers = [
    { name: "Name", field: "name", sortable: true },
    { name: "Hotel Resume", field: "hotelResume", sortable: true },
    { name: "Rate", field: "rate", sortable: true },
    { name: "Amenities", field: "amenities", sortable: true },
    { name: "Address", field: "address", sortable: true },
    { name: "Actions", field: "actions", sortable: false },
  ];

  useEffect(() => {
    props.fetchAllHotels();
    setHotels(props.hotelsList);
  }, []);

  function handleQueryChange(e){
    setQuery(e.target.value)
  }

  const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure to delete this hotel?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        props.deleteHotel(id, () =>
          Swal.fire("Deleted!", "Your file has been deleted.", "success")
        );
      }
    });
  };

  const hotelsData = useMemo(() => {
    if (props.hotelsList !== []) {
      let computedHotels = props.hotelsList;

      if (search) {
        computedHotels = computedHotels.filter(
            query==="name" ? (hotel) => hotel.name.toLowerCase().includes(search.toLowerCase()) : (hotel) => hotel.amenities.toLowerCase().includes(search.toLowerCase())
        );
      }

      setTotalItems(computedHotels.length);

      //Sorting comments
      if (sorting.field) {
        const reversed = sorting.order === "asc" ? 1 : -1;
        computedHotels = computedHotels.sort(
          (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
        );
      }

      //Current Page slice
      return computedHotels.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    }
  }, [hotels, currentPage, search, sorting, props.hotelsList]);

  return (
    <>
      <div className="row w-100">
        <div className="col mb-3 col-12 text-center">
          <div className="row">
            <div className="col-md-8">
              <Pagination
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
            <div className="col-md-4 d-flex justify-content-between flex-row-reverse">
              <Search
                onSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
              />
              <select  style={{ width: "40%",  height: "70%" }} value={query} onChange={handleQueryChange} className="form-select" aria-label="Name">
                <option value="name">Name</option>
                <option value="amenities">Amenities</option>
              </select>
            </div>
          </div>

          <table className="table table-striped">
            <TableHeader
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {hotelsData.map((hotel) => (
                <tr key={hotel.id}>
                  <th scope="row" >
                    {hotel.name}
                  </th>
                  <td>{hotel.hotelResume}</td>
                  <td>{hotel.rate}</td>
                  <td>{hotel.amenities}</td>
                  <td>{hotel.address}</td>
                  <td>
                    <ButtonGroup variant="text">
                      <Button>
                        <EditIcon
                          color="primary"
                          onClick={() => userId(hotel.id)}
                        />
                      </Button>
                      <Button>
                        <DeleteIcon
                          color="secondary"
                          onClick={() => onDelete(hotel.id)}
                        />
                      </Button>
                    </ButtonGroup>
                  </td>
                  {/* <td>{comment.body}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  hotelsList: state.hotel.list,
});

const mapActionToProps = {
  fetchAllHotels: actions.fetchAll,
  deleteHotel: actions.Delete,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(DataTable));
