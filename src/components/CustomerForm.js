import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: '#4485A4',
    color: 'white',
  },
  title: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontWeight: 600,
  },
  continueBtn: {
      textAlign: "0 auto",
      backgroundColor: '#4485A4',
      border: 'none',
      color: 'white',
      "&:hover": {
        color: 'white',
        backgroundColor: '#4485A4',
        border: 'none'
    },
  },
  form: {
      margin: "20px",
  },
  textField: {
    margin: "10px",
  },
  submitBtn: {
    margin: "10px",
    backgroundColor: '#4485A4',
    color: 'white',
  }
}));

const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .required('Your name is required'),
  phone: yup
    .string('Enter your phone number')
    .min(7, 'Your number should be of minimum 7 characters length')
    .required('Your number is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  zip: yup
    .string('Enter your zip code')
    .min(5, 'Zip Code should be of minimum 5 characters length')
    .max(5, 'Zip Code should be of maximum 5 characters length')
    .required('Zip Code is required'),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomerForm({ onNameUpdate }) {

  const classes = useStyles();
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      zip: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 4));
      onNameUpdate(values)
      handleClose()
    },
  });


  return (
    <div>
      <Button className={classes.continueBtn} variant="outlined" color="primary" onClick={handleClickOpen}>
        Continue
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Customer Form
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
      <TextField
          className={classes.textField}
          fullWidth
          id="name"
          name="name"
          label="Name"
          variant="outlined"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
         <TextField
          className={classes.textField}
          fullWidth
          id="phone"
          name="phone"
          label="Phone Number"
          variant="outlined"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <TextField
          className={classes.textField}
          fullWidth
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          className={classes.textField}
          fullWidth
          id="zip"
          name="zip"
          label="Zip Code"
          variant="outlined"
          value={formik.values.zip}
          onChange={formik.handleChange}
          error={formik.touched.zip && Boolean(formik.errors.zip)}
          helperText={formik.touched.zip && formik.errors.zip}
        />
        <Button className={classes.submitBtn} color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
      </Dialog>
    </div>
  );
}
