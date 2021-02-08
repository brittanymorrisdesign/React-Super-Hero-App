import React, { useState, useEffect } from "react";
import CloseIcon from '@material-ui/icons/Close';
import HeroesTable from "./Table"
import useAxios from "axios-hooks";
import { Link } from 'react-router-dom'
import { Slide, IconButton, AppBar, Toolbar, Dialog, Typography, Button, makeStyles, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: '#4485A4',
    color: 'white',
  },
  title: {
    marginLeft: theme.spacing(1),
    fontWeight: 600,
    flex: 1,
  },
  continueBtn: {
    textAlign: '0 auto',
    backgroundColor: '#4485A4',
    border: 'none',
    color: 'white',
    '&:hover': {
      color: 'white',
      backgroundColor: '#4485A4',
      border: 'none'
    },
  },
  summaryBtn: {
    marginLeft: '30px',
    backgroundColor: '#4485A4',
    color: 'white',
    display:'inline-block',
    textDecoration:'none',
    '&:hover': {
        color: '#4485A4',
        backgroundColor: 'white',
    },
  },
  squadTitle: {
    textAlign: 'center',
    fontSize: '30px',
    marginTop: '20px',
    fontWeight: 600,
  },
  secondaryTitle: {
    textAlign: 'center',
    fontSize: '20px',
    marginTop: '20px'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function HeroForm(selectedName) {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [{ data: heroData, loading: loadingHeroData }] = useAxios(
    'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json',
  );

  useEffect(() => {
    heroData && setData(heroData)
}, [heroData]);

  return (
    <div>
     <Button className={classes.continueBtn} variant="outlined" color="primary" onClick={handleClickOpen}>
        Continue
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Hero Form
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {loadingHeroData ? (
                                <CircularProgress style={{ marginLeft: "70px", marginTop: "20px" }} />
                            ) : (
                              <>
                              <div>
                              <div >
                            <div className={classes.squadTitle}>{data.squadName}</div>
                            <div className={classes.secondaryTitle}>{data.homeTown}</div>
                            <div className={classes.secondaryTitle}>{data.formed}</div>
                            <div className={classes.secondaryTitle}>{data.active}</div>
                            <div className={classes.secondaryTitle}>{data.secretBase}</div>
                              </div>
                    <HeroesTable superHeroData={data.members} />
                  </div>
                  <Link to={{
                          pathname: "/summary",
                          selectedName
                        }}>
                  <Button className={classes.summaryBtn}  variant="outlined" color="primary">
                    Request Heroes
                    </Button>
                      </Link>
                      </>
                            )}
      </Dialog>
    </div>
  );
}
