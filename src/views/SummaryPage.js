import React from 'react';
import SuperHeroImage from '../assets/marvel_superheroes2.jpg';
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Grid, Typography, makeStyles, IconButton } from "@material-ui/core";
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
	}
}));

export default function SummaryPage() {
	const classes = useStyles();

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
				<Grid container spacing={3}>
					<Grid item xs={12}>
					<Typography className={classes.paperTitle}>Summary Info</Typography>
						<img src={SuperHeroImage} className={classes.superHeroImg} alt="superHeroImage"/>
					</Grid>
                    <Typography className={classes.summaryInfo}>This is a new page that will display the information input by the user in the form. There should be a summary of the customer information from the "Customer Form" and a summary of all of the heroes and quantities selected, including heroes with a quantity of 0.
                    At the bottom of this page, there should be a total of the number of heroes selected and the number of unique powers. For example, if a user selects 2 "Molecule Man" heroes, the total of heroes would be 2, and the total of powers would be 3.</Typography>
				</Grid>
			</div>
		</div>
	);
}
