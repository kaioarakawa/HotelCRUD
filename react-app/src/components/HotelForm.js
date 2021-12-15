import React, { useEffect } from "react";
import {
  Grid,
  TextField,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/hotel";
import Swal from 'sweetalert2';

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 230,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
});

const initialFieldValues = {
  name: "",
  hotelResume: "",
  rate: "",
  amenities: "",
  address: "",
};

const HotelForm = ({ classes, ...props }) => {

  //validate()

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";
    if ("hotelResume" in fieldValues)
      temp.hotelResume = fieldValues.hotelResume
        ? ""
        : "This field is required.";
    if ("rate" in fieldValues)
      temp.rate = fieldValues.rate ? "" : "This field is required.";
    if ("amenities" in fieldValues)
      temp.amenities = fieldValues.amenities ? "" : "This field is required.";
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, validate, props.setCurrentId);

  //material-ui select
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        Swal.fire(
          'Created!',
          'Submitted successfully.',
          'success'
        )
      };
      if (props.currentId === 0) props.createHotel(values, onSuccess);
      else props.updateHotel(props.currentId, values, onSuccess);
    }
  };

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.hotelList.find((x) => x.id === props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  return (
    <form
      autoComplete="off"
      noValidate
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="name"
            variant="outlined"
            label="Hotel Name"
            value={values.name}
            onChange={handleInputChange}
            {...(errors.name && {
              error: true,
              helperText: errors.name,
            })}
          />

          <FormControl
            variant="outlined"
            className={classes.formControl}
            {...(errors.rate && { error: true })}
          >
            <InputLabel ref={inputLabel}>Ratintg</InputLabel>
            <Select
              id="rateHotel"
              name="rate"
              value={values.rate}
              onChange={handleInputChange}
              labelWidth={labelWidth}
            >
              <MenuItem value="">Select Rate</MenuItem>
              <MenuItem value="0">0</MenuItem>
              <MenuItem value="0.5">0.5</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="1.5">1.5</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="2.5">2.5</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="3.5">3.5</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="4.5">4.5</MenuItem>
              <MenuItem value="5">5</MenuItem>
            </Select>
            {errors.rate && <FormHelperText>{errors.rate}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="amenities"
            variant="outlined"
            label="Amenities"
            value={values.amenities}
            onChange={handleInputChange}
            {...(errors.amenities && {
              error: true,
              helperText: errors.amenities,
            })}
          />
          <TextField
            name="address"
            variant="outlined"
            label="Address"
            value={values.address}
            onChange={handleInputChange}
            {...(errors.amenities && {
              error: true,
              helperText: errors.amenities,
            })}
          />
        </Grid>
      </Grid>
      <Grid>
          <TextField
            name="hotelResume"
            variant="outlined"
            label="Description"
            multiline
            style ={{width: '88%'}}
            value={values.hotelResume}
            onChange={handleInputChange}
            {...(errors.hotelResume && {
              error: true,
              helperText: errors.hotelResume,
            })}
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.smMargin}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              className={classes.smMargin}
              onClick={resetForm}
            >
              Reset
            </Button>
          </div>
        </Grid>
    </form>
  );
};

const mapStateToProps = (state) => ({
  hotelList: state.hotel.list,
});

const mapActionToProps = {
  createHotel: actions.create,
  updateHotel: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(HotelForm));
