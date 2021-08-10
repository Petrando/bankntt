import { useState } from "react";
import Link from "next/link"
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {Drawer, Paper, Grid } from "@material-ui/core/";
import useUser from "../../lib/useUser";
import TopNav from "./topnav";
import { styles } from "./post.styles";
import layoutStyles from "../../styles/admin/Layout.module.css";

const menuList = [
    {
        label:"Produk Dana",
        to:"/admin/dana",
        subMenu:[
            {
                label:"Tabungan", to:"/admin/dana/tabungan"
            },
            {
                label:"Deposito", to:"/admin/dana/deposito"
            },
            {
                label:"Giro", to:"/admin/dana/giro"
            }
        ]
    },
    {
        label:"Events",
        to:"/admin/events"
    },
    {
        label:"Interest Rate",
        to:"/admin/interests"
    }
]

const useStyles = makeStyles(styles);

export default function Layout({ children, home }: {
  														children: React.ReactNode
  														home?: boolean
													}
) {
  const classes = useStyles();
  const { user, mutateUser } = useUser({redirectTo:"/admin/login"});
  const [isOpened, setIsOpened] = useState(true);
  
  return (
  	<div className={'container'}>
  		<TopNav toggleOpened={()=>{setIsOpened(!isOpened)}} isOpened={isOpened} />
        <div className={layoutStyles.layoutContent}>
            <div className={`${layoutStyles.drawer} ${isOpened?layoutStyles.opened:layoutStyles.closed}`}>
                Drawer
            </div>
            <div className={layoutStyles.main}>
                {
                    children
                }
            </div>
        </div>
  		<style jsx>{`
        	.container {
                max-width: 100%;
          		min-height: 100vh;          		        	
        	}
        `}</style>
  	</div>
  )
}
/*
<div className={classes.container}>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawer, {
                        [classes.closed]: !isOpened,
                        [classes.opened]: isOpened,
                    }),
                }}
            >
                <Grid container spacing={1}>
                    {
                        menuList.map((d, i)=><MenuItem key={i} {...d} />)
                    }
                </Grid>
            </Drawer>
            <main className={classes.main}>
                {
  			        children
  		        }
            </main>
        </div> 		
*/        

interface MenuItemI {
    label:string;
    to:string;
    subMenu?:MenuItemI[];
}

const MenuItem = ({label, to, subMenu}:MenuItemI) => {
    const classes = useStyles();
    return (
        <Link href={to}>
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                {label}
            </Paper>
        </Grid>
        </Link>


    )
}