import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import './EditDialog.scss';

const validationSchema = yup.object({
  vehicle: yup
    .string('Enter vehicle')
    .required('Vehicle is required'),
  startDate: yup
    .string('Enter start date')
    .required('Start Date is required'),
  odometer: yup
    .number('Enter odometer value')
    .required('Odometer is required')
    .positive('Odometer must be a positive number'),
  volume: yup
    .number('Enter volume value')
    .required('Volume is required')
    .positive('Volume must be a positive number')
    .integer('Volume must be an integer number'),
});

const EditDialog = ({
  isOpen,
  editItem,
  onSubmit,
  onCancel,
  editLoading,
}) => {
  const vehicleTypes = [
    'Toyota Avanza',
    'Toyota Corolla',
    'Honda Civic',
  ];

  const fuelTypes = ['95 Supe Plus', '92 Gasoline', 'Solar'];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      vehicle: editItem.vehicle || '',
      startDate: editItem.startDate || '',
      odometer: editItem.odometer || '',
      volume: editItem.volume || '',
      fuelType: editItem.fuelType || '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({ ...editItem, ...values, id: editItem.id });
    },
  });

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      className="edit-dialog"
      aria-labelledby="edit-dialog"
    >
      <DialogTitle
        disableTypography
        id="edit-dialog-title"
        className="title"
      >
        Edit Fuel Entry
        <IconButton
          aria-label="close"
          className="close"
          onClick={onCancel}
        >
          <Icon>close</Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3} className="form">
          <Grid item xs={12}>
            <FormControl
              fullWidth
              error={
                formik.touched.vehicle &&
                Boolean(formik.errors.vehicle)
              }
            >
              <FormLabel className="input-label" component="legend">
                Vehicle
              </FormLabel>
              <Select
                name="vehicle"
                className={`dropdown-field ${
                  formik.touched.vehicle &&
                  Boolean(formik.errors.vehicle)
                    ? 'error'
                    : ''
                }`}
                variant="outlined"
                fullWidth
                value={formik.values.vehicle}
                onChange={formik.handleChange}
              >
                {vehicleTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.vehicle &&
                Boolean(formik.errors.vehicle) && (
                  <FormHelperText>
                    {formik.errors.vehicle}
                  </FormHelperText>
                )}
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <FormControl>
                <FormLabel className="input-label" component="legend">
                  Start Date
                </FormLabel>
                <KeyboardDatePicker
                  name="startDate"
                  className="date-field"
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  margin="none"
                  format="DD/MM/YYYY"
                  InputAdornmentProps={{ position: 'start' }}
                  InputProps={{ readOnly: true }}
                  value={formik.values.startDate}
                  onChange={(date) =>
                    formik.handleChange({
                      target: {
                        name: 'startDate',
                        value: date ? moment(date).format() : '',
                      },
                    })
                  }
                />
              </FormControl>
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={6}>
            <FormControl
              error={
                formik.touched.odometer &&
                Boolean(formik.errors.odometer)
              }
            >
              <FormLabel className="input-label" component="legend">
                Odometer
              </FormLabel>
              <TextField
                name="odometer"
                className={`input-field ${
                  formik.touched.odometer &&
                  Boolean(formik.errors.odometer)
                    ? 'error'
                    : ''
                }`}
                variant="outlined"
                value={formik.values.odometer}
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position="end">Kms</InputAdornment>
                }
              />
              {formik.touched.odometer &&
                Boolean(formik.errors.odometer) && (
                  <FormHelperText>
                    {formik.errors.odometer}
                  </FormHelperText>
                )}
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl
              error={
                formik.touched.volume && Boolean(formik.errors.volume)
              }
            >
              <FormLabel className="input-label" component="legend">
                Volume
              </FormLabel>
              <TextField
                name="volume"
                id="volume"
                className={`input-field ${
                  formik.touched.volume &&
                  Boolean(formik.errors.volume)
                    ? 'error'
                    : ''
                }`}
                variant="outlined"
                value={formik.values.volume}
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position="end">Ltrs</InputAdornment>
                }
              />
              {formik.touched.volume &&
                Boolean(formik.errors.volume) && (
                  <FormHelperText>
                    {formik.errors.volume}
                  </FormHelperText>
                )}
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl
              fullWidth
              error={
                formik.touched.fuelType &&
                Boolean(formik.errors.fuelType)
              }
            >
              <FormLabel className="input-label" component="legend">
                Fuel Type (optional)
              </FormLabel>
              <Select
                name="fuelType"
                className={`dropdown-field ${
                  formik.touched.fuelType &&
                  Boolean(formik.errors.fuelType)
                    ? 'error'
                    : ''
                }`}
                variant="outlined"
                fullWidth
                value={formik.values.fuelType}
                onChange={formik.handleChange}
              >
                {fuelTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.fuelType &&
                Boolean(formik.errors.fuelType) && (
                  <FormHelperText>
                    {formik.errors.fuelType}
                  </FormHelperText>
                )}
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="actions-container">
        <Button
          onClick={onCancel}
          variant="contained"
          className="cancel-btn"
          disabled={editLoading}
        >
          Cancel
        </Button>
        <Button
          autoFocus
          onClick={formik.handleSubmit}
          variant="contained"
          className="submit-btn"
          disabled={editLoading}
        >
          {editLoading ? (
            <CircularProgress color="inherit" size={20} />
          ) : (
            'Save'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
