import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";

import {
  CssBaseline,
  makeStyles,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  List,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Divider,
  IconButton,
  Badge,
  Container,
  Grid,
  Paper,
  Button,
  LinearProgress,
  ListItem,
  ListItemText,
  ListItemIcon,
  Link,
} from "@material-ui/core";

import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import PlaceIcon from "@material-ui/icons/Place";
import MapIcon from "@material-ui/icons/Map";
import CategoryIcon from "@material-ui/icons/Category";
import StarIcon from "@material-ui/icons/Star";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

// import { mainListItems, secondaryListItems } from './listItems';

import Chart_1 from "./components/Chart_1";
import Chart_2 from "./components/Chart_2";
import Chart_3 from "./components/Chart_3";
import Chart_4 from "./components/Chart_4";
import Chart_5 from "./components/Chart_5";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor: "#34656d",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    backgroundColor: "#e1e5ea",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    backgroundColor: "#e1e5ea",
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    backgroundColor: "#e1e5ea",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  inputForm: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  fixedHeight: {
    height: 560,
  },
  fixedHeight2: {
    height: 1200,
  },
  fixedHeight4: {
    height: 600,
  },
}));

function App() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  const [chart1Data, setChart1Data] = useState(null);
  const [chart2Data, setChart2Data] = useState(null);
  const [chart3Data, setChart3Data] = useState(null);
  const [chart4Data, setChart4Data] = useState(null);
  const [chart5Data, setChart5Data] = useState(null);

  // For Chart_1
  const [input, setInput] = useState("龐德羅莎");
  const [barnum1, setBarNum1] = useState(15);
  const [range, setRange] = useState([4, 5]);

  // For Chart_2
  const [barnum2, setBarNum2] = useState(25);
  const [word2, setWord2] = useState("衛生");
  const [tagging, setTagging] = useState("positive");
  const [standard, setStandard] = useState(3);

  // For Chart_4
  const [barnum4, setBarNum4] = useState(15);
  const [type4, setType4] = useState("health");

  // For Chart_5
  const [barnum5, setBarNum5] = useState(15);
  const [ratingnum5, setRatingNum5] = useState(1);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);
  const fixedHeightPaper4 = clsx(classes.paper, classes.fixedHeight4);

  useEffect(() => {
    fetchReviewTfidf();
  }, []);

  useEffect(() => {
    fetchWordFilter();
  }, []);

  useEffect(() => {
    fetchRatingTfidf();
  }, []);

  useEffect(() => {
    fetchMultiType();
  }, []);

  useEffect(() => {
    fetchMultiRating();
  }, []);

  const ref5 = useRef();

  const fetchReviewTfidf = async () => {
    let data = await fetch(
      `http://localhost:4000/ex-review-tfidf?n=${barnum1}&i=${input}&st=${range[0]}&ed=${range[1]}`,
      { credentials: "include" }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        return data;
      });
    console.log("Received: ", data);
    setChart1Data(data);
  };

  const fetchWordFilter = async () => {
    let data = await fetch(
      `http://localhost:4000/ex-word-filter?n=${barnum2}&w=${word2}&t=${tagging}&s=${standard}`,
      { credentials: "include" }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        return data;
      });
    console.log("Received: ", data);
    setChart2Data(data);
  };

  const fetchRatingTfidf = async () => {
    let data = await fetch(`http://localhost:4000/ex-rating-tfidf`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        return data;
      });
    console.log("Received: ", data);
    setChart3Data(data);
  };

  const fetchMultiType = async () => {
    let data = await fetch(
      `http://localhost:4000/ex-multi-type?n=${barnum4}&t=${type4}`,
      { credentials: "include" }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        return data;
      });
    console.log("Received: ", data);
    setChart4Data(data);
  };

  const fetchMultiRating = async () => {
    let data = await fetch(
      `http://localhost:4000/ex-multi-rating?n=${barnum5}&r=${ratingnum5}`,
      { credentials: "include" }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        return data;
      });
    console.log("Received: ", data);
    setChart5Data(data);
  };

  console.log(ref5.current);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position="absolute"
        className={clsx(classes.appBar, openDrawer && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              openDrawer && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Google Map Analysis
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !openDrawer && classes.drawerPaperClose
          ),
        }}
        open={openDrawer}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />
        <List>
          <div>
            <ListItem button component={Link} href="#chart-1">
              <ListItemIcon>
                <PlaceIcon />
              </ListItemIcon>
              <ListItemText primary="地標評論重點詞" />
            </ListItem>
            <ListItem button component={Link} href="#chart-2">
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="類別評論重點詞" />
            </ListItem>
            <ListItem button component={Link} href="#chart-3">
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="評分評論重點詞" />
            </ListItem>
            <ListItem button component={Link} href="#chart-4">
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
              <ListItemText primary="整題評論重點詞" />
            </ListItem>
            <ListItem button component={Link} href="#chart-5">
              <ListItemIcon>
                <SpellcheckIcon />
              </ListItemIcon>
              <ListItemText primary="評論單詞正負評統計" />
            </ListItem>
          </div>
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={4} id="chart-1">
            {!chart1Data ? (
              <Grid item xs={12} md={8} lg={12}>
                <Paper className={classes.paper}>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    不同地標評論重點詞分析 - "{input}"
                  </Typography>
                  <LinearProgress />
                </Paper>
              </Grid>
            ) : (
              <React.Fragment>
                <Grid item xs={12} md={8} lg={10}>
                  <Paper className={fixedHeightPaper}>
                    <Chart_1 input={input} chartData={chart1Data} />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={2}>
                  <Paper className={fixedHeightPaper}>
                    <Typography
                      component="h2"
                      variant="h6"
                      color="primary"
                      gutterBottom
                    >
                      Input Field
                    </Typography>
                    <form
                      className={classes.inputForm}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          id="num-textfield-1"
                          label="Number"
                          placeholder="Bars' number..."
                          value={barnum1}
                          multiline
                          variant="outlined"
                          size="small"
                          onChange={(event) => {
                            setBarNum1(event.target.value);
                          }}
                        />
                      </div>
                    </form>

                    <form
                      className={classes.inputForm}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          id="type-textfield-1"
                          label="Place"
                          placeholder="Type a place..."
                          value={input}
                          multiline
                          variant="outlined"
                          size="small"
                          onChange={(event) => {
                            setInput(event.target.value);
                          }}
                        />
                      </div>
                    </form>

                    <Typography id="range-slider" gutterBottom>
                      Rating Range
                    </Typography>
                    <Slider
                      value={range}
                      onChange={(event, newValue) => {
                        setRange(newValue);
                      }}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      step={1}
                      marks
                      min={1}
                      max={5}
                    />

                    <Button
                      className={classes.button}
                      variant="contained"
                      disabled={!barnum1 || !input}
                      onClick={() => {
                        setChart1Data(null);
                        fetchReviewTfidf();
                      }}
                    >
                      Submit
                    </Button>
                  </Paper>
                </Grid>
              </React.Fragment>
            )}
          </Grid>

          <Grid container spacing={4} id="chart-2">
            {!chart4Data ? (
              <Grid item xs={12} md={8} lg={12}>
                <Paper className={classes.paper}>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    不同地標類別評論重點詞分析 - "{type4}"
                  </Typography>
                  <LinearProgress />
                </Paper>
              </Grid>
            ) : (
              <React.Fragment>
                <Grid item xs={12} md={8} lg={10}>
                  <Paper className={fixedHeightPaper2}>
                    <Chart_4 input={type4} chartData={chart4Data} />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={2}>
                  <Paper className={fixedHeightPaper2}>
                    <Typography
                      component="h2"
                      variant="h6"
                      color="primary"
                      gutterBottom
                    >
                      Input Field
                    </Typography>
                    <form
                      className={classes.inputForm}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          id="num-textfield-4"
                          label="Number"
                          placeholder="Bars' number..."
                          value={barnum4}
                          multiline
                          variant="outlined"
                          size="small"
                          onChange={(event) => {
                            setBarNum4(event.target.value);
                          }}
                        />
                      </div>
                    </form>

                    <form
                      className={classes.inputForm}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          id="type-textfield-4"
                          label="Type"
                          placeholder="Type of place..."
                          value={type4}
                          multiline
                          variant="outlined"
                          size="small"
                          onChange={(event) => {
                            setType4(event.target.value);
                          }}
                        />
                      </div>
                    </form>

                    <Button
                      className={classes.button}
                      variant="contained"
                      disabled={!barnum4 || !type4}
                      onClick={() => {
                        setChart4Data(null);
                        fetchMultiType();
                      }}
                    >
                      Submit
                    </Button>
                  </Paper>
                </Grid>
              </React.Fragment>
            )}
          </Grid>

          <Grid container spacing={4} id="chart-3">
            {!chart5Data ? (
              <Grid item xs={12} md={8} lg={12}>
                <Paper className={classes.paper}>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    不同評分的評論重點詞分析 - "Rating {ratingnum5}"
                  </Typography>
                  <LinearProgress />
                </Paper>
              </Grid>
            ) : (
              <React.Fragment>
                <Grid item xs={12} md={8} lg={10}>
                  <Paper className={fixedHeightPaper4}>
                    <Chart_5 input={ratingnum5} chartData={chart5Data} />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={2}>
                  <Paper className={fixedHeightPaper4}>
                    <Typography
                      component="h2"
                      variant="h6"
                      color="primary"
                      gutterBottom
                    >
                      Input Field
                    </Typography>
                    <form
                      className={classes.inputForm}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          id="num-textfield-5"
                          label="Number"
                          placeholder="Bars' number..."
                          value={barnum5}
                          multiline
                          variant="outlined"
                          size="small"
                          onChange={(event) => {
                            setBarNum5(event.target.value);
                          }}
                        />
                      </div>
                    </form>

                    <FormControl className={classes.inputForm}>
                      <InputLabel id="select-rating-5">Rating</InputLabel>
                      <Select
                        labelId="select-rating-5"
                        id="select-rating-5-id"
                        value={ratingnum5}
                        onChange={(event) => {
                          setRatingNum5(event.target.value);
                        }}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      className={classes.button}
                      variant="contained"
                      disabled={!barnum5 || !ratingnum5}
                      onClick={() => {
                        setChart5Data(null);
                        fetchMultiRating();
                      }}
                    >
                      Submit
                    </Button>
                  </Paper>
                </Grid>
              </React.Fragment>
            )}
          </Grid>

          <Grid container spacing={4} id="chart-4">
            {!chart3Data ? (
              <Grid item xs={12} md={8} lg={12}>
                <Paper className={classes.paper}>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Google Map 整題評論重點詞分析
                  </Typography>
                  <LinearProgress />
                </Paper>
              </Grid>
            ) : (
              <React.Fragment>
                <Grid item xs={12} md={8} lg={12}>
                  <Paper className={fixedHeightPaper2}>
                    <Chart_3 chartData={chart3Data} />
                  </Paper>
                </Grid>
              </React.Fragment>
            )}
          </Grid>

          <Grid container spacing={4} id="chart-5">
            {!chart2Data ? (
              <Grid item xs={12} md={8} lg={12} ref={ref5}>
                <Paper className={classes.paper}>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    評論單詞 正負評論統計分析 - "{word2} {tagging}"
                  </Typography>
                  <LinearProgress />
                </Paper>
              </Grid>
            ) : (
              <React.Fragment>
                <Grid item xs={12} md={8} lg={10}>
                  <Paper className={fixedHeightPaper2}>
                    <Chart_2
                      input={{ w: word2, t: tagging }}
                      chartData={chart2Data}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={2}>
                  <Paper className={fixedHeightPaper2}>
                    <Typography
                      component="h2"
                      variant="h6"
                      color="primary"
                      gutterBottom
                    >
                      Input Field
                    </Typography>
                    <form
                      className={classes.inputForm}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          id="num-textfield-2"
                          label="Number"
                          placeholder="Bars' number..."
                          value={barnum2}
                          multiline
                          variant="outlined"
                          size="small"
                          onChange={(event) => {
                            setBarNum2(event.target.value);
                          }}
                        />
                      </div>
                    </form>

                    <form
                      className={classes.inputForm}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          id="type-textfield-2"
                          label="Word"
                          placeholder="Type a word..."
                          value={word2}
                          multiline
                          variant="outlined"
                          size="small"
                          onChange={(event) => {
                            setWord2(event.target.value);
                          }}
                        />
                      </div>
                    </form>

                    <FormControl className={classes.inputForm}>
                      <InputLabel id="select-tagging-2">Tagging</InputLabel>
                      <Select
                        labelId="select-tagging-2"
                        id="select-tagging-2-id"
                        value={tagging}
                        onChange={(event) => {
                          setTagging(event.target.value);
                        }}
                      >
                        <MenuItem value={"positive"}>
                          Positive Comments
                        </MenuItem>
                        <MenuItem value={"negative"}>
                          Negative Comments
                        </MenuItem>
                        <MenuItem value={"total"}>Both Comments</MenuItem>
                      </Select>
                    </FormControl>

                    <Typography id="discrete-slider" gutterBottom>
                      Standard
                    </Typography>
                    <Slider
                      className={classes.inputForm}
                      defaultValue={standard}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"
                      step={1}
                      marks
                      min={1}
                      max={5}
                      onChange={(event, newValue) => {
                        setStandard(newValue);
                      }}
                    />

                    <Button
                      className={classes.button}
                      variant="contained"
                      disabled={!barnum2 || !word2 || !tagging}
                      onClick={() => {
                        setChart2Data(null);
                        fetchWordFilter();
                      }}
                    >
                      Submit
                    </Button>
                  </Paper>
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default App;
