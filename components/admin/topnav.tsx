import React, {FC} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import useUser from "../../lib/useUser";
import { useRouter } from "next/router";
import fetchJson from "../../lib/fetchJson";
import styles from "../../styles/admin/Navbar.module.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textTransform: "capitalize"
    },
  }),
);

interface AppBarI {
  toggleOpened:()=>void;
  isOpened:boolean;
}

export default function ButtonAppBar({toggleOpened, isOpened}:AppBarI) {
  const classes = useStyles();
  const { user, mutateUser } = useUser();
  const router = useRouter();

  async function handleLogout(event) {
    //event.preventDefault();
   
    mutateUser(
      await fetchJson("/api/logout", { method: "POST" }),
      false,
    );
    router.push("/admin/login");
  }

  return (
    <div className={styles.navbar}>
      <span style={{width:"auto", display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"10px"}}>
        <span style={{cursor:"pointer", marginRight:"8px"}}
          onClick={toggleOpened}
        >
          {        
            isOpened?<ChevronLeftIcon />:<MenuIcon />
          }
        </span>
        {
              typeof user !== "undefined" &&
              <Typography variant="h6" className={classes.title}>
                Welcome, {user.username}
              </Typography>
          } 
      </span>
      <p style={{cursor:"pointer", marginRight:"10px"}} onClick={(e)=>handleLogout(e)} >
        Logout
      </p>
    </div>
  );
}

/*
<div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
            onClick={toggleOpened}
          >
            {
              isOpened?<ChevronLeftIcon />:<MenuIcon />
            }
          </IconButton>
          {
              typeof user !== "undefined" &&
              <Typography variant="h6" className={classes.title}>
                Welcome, {user.username}
              </Typography>
          }          
          <Button color="inherit" onClick={(e)=>{handleLogout(e)}}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
    */