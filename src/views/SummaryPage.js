import React from "react";
import SuperHeroImage from '../assets/marvel_superheroes2.jpg';
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, makeStyles, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	appBar: {
		backgroundColor: '#4485A4',
		color: 'white',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		textAlign: 'center',
		fontWeight: 600,
	},
	paperTitle: {
		flexGrow: 1,
		textAlign: 'center',
		position: 'absolute',
		width: '100%',
		top: '30vh',
		left: '0px',
		color: 'white',
		fontSize: '4vw',
	},
	summaryInfo: {
		textAlign: 'center',
        marginL: '20px'
	},
	superHeroImg: {
		width: "100%",
	},
	backBtn: {
		color: 'white'
	},
	userTitle: {
		textAlign: 'center',
		fontSize: '30px',
		marginTop: '20px',
		fontWeight: 600,
	},
	secondaryTitle: {
		textAlign: 'center',
		fontSize: '20px',
		marginTop: '20px'
	},
	userContent: {
		justifyContent: 'center'
	}
}));

export default function SummaryPage(props) {
	const classes = useStyles();
	const userInfo = props.location.selectedName || {}

	return (
		<div className={classes.root}>
				<AppBar className={classes.appBar} position="static">
				<Toolbar>

				<Link to="/home">
				<IconButton edge="start" className={classes.backBtn} color="inherit" aria-label="menu">
      <ArrowBackIosIcon  />
    </IconButton>
        </Link>
					<Typography variant="h6" className={classes.title}>
						Uber for Supers 
					</Typography>
				</Toolbar>
			</AppBar>
			<div className={classes.root}>
					<Typography className={classes.paperTitle}>Summary Info</Typography>
						<img src={SuperHeroImage} className={classes.superHeroImg} alt="superHeroImage"/>
					<div className={classes.userContent}>
				<div className={classes.userTitle}>{userInfo.selectedName.name}</div>
              <div className={classes.secondaryTitle}>{userInfo.selectedName.email}</div>
              <div className={classes.secondaryTitle}>{userInfo.selectedName.phone}</div>
              <div className={classes.secondaryTitle}>{userInfo.selectedName.zip}</div>
			  </div>
			</div>
		</div>
	);
}
