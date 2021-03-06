import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => createStyles({
    root: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      color: "#000133",
    },
    appBar: {
      background: "#00022E",
      color: "#FC86AA",
    },
    icon: {
      padding: "10px",
    },
    title: {
      margin: "auto",
    },
    container: {
      display: "flex",
      flex: 1,
    },
    drawer: {
      background: "#D8DCD6",
      flexGrow: 1,
      position: "static",
      transition: "width .7s",
    },
    paper: {
      cursor: "pointer",
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    closed: {
      width: "0px",
    },
    opened: {
      width: "240px",
    },
    main: {
      flex: 1,
      background: "#f7f5f5",
      color: "black",
    },
    footer: {
      background: "#00022E",
      height: "50px",
      color: "#FC86AA",
    },
  });