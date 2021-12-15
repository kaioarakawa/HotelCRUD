import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/hotel";
import {
  Grid,
  Paper,
  withStyles,
} from "@material-ui/core";
import HotelForm from "./HotelForm";
import DataTable from "./DataTable/DataTable";

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

const Hotels = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.fetchAllHotels();
  }, []); //componentDidMount

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        <h1 className="display-4">Hotels</h1>
      </Grid>
      <Grid container>
        <Grid item xs={4}>
          <HotelForm {...{ currentId, setCurrentId }} />
        </Grid>
        <Grid item xs={8}>
          <DataTable userId={currentId => setCurrentId(currentId)} />
        </Grid>
      </Grid>
    </Paper>
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
)(withStyles(styles)(Hotels));
