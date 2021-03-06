import { useState } from "react";
import Link from "next/link"
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {Drawer, Paper, Grid } from "@material-ui/core/";
import {ArrowDropUp, ArrowDropDown} from '@material-ui/icons/';
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
  //const { user, mutateUser } = useUser();
  const [isOpened, setIsOpened] = useState(true);

  return (
  	<div className={'container'}>
        {
            user?.isLoggedIn &&
            <>
            <TopNav toggleOpened={()=>{setIsOpened(!isOpened)}} isOpened={isOpened} />
            <div className={layoutStyles.layoutContent}>
                <div className={`${layoutStyles.drawer} ${isOpened?layoutStyles.opened:layoutStyles.closed}`}>
                    {
                        menuList.map((d, i)=><MenuItem key={i} {...d} />)
                    }
                </div>
                <div className={layoutStyles.main}>
                    {
                        children
                    }
                </div>  
            </div>
            </>
        }
        {
            !user &&
            <div className={'loadingContainer'}>
                <h3>Loading....</h3>
            </div>
        }
  		<style jsx>{`
        	.container {
                max-width: 100%;
          		min-height: 100vh;          		        	
        	}
            .loadingContainer {
                width:100%;
                height:100vh;
                display:flex;align-items:center;
                justify-content:center;
            }
        `}</style>
  	</div>
  )
}     

interface MenuItemI {
    label:string;
    to:string;
    subMenu?:MenuItemI[];
}

const MenuItem = ({label, to, subMenu}:MenuItemI) => {
    const classes = useStyles();
    const [menuActive, setActive] = useState<boolean>(false);
    
    return (
        <>
            {
                subMenu?
                <>
                    <div className={`${layoutStyles.paper} ${menuActive && subMenu && "activeMenu"}`}
                        onClick={()=>{setActive(!menuActive)}}
                    >
                        <span style={{width:"80%"}}>
                            {label}
                        </span>
                        <span style={{width:"20%"}}>
                        {
                            menuActive?
                            <ArrowDropUp />:
                            <ArrowDropDown />
                        }
                        </span>
                    </div>
                {
                    
                    menuActive && 
                    <div className={layoutStyles.subMenuContainer}>
                        {
                            subMenu.map((d, i)=><SubMenuItem key={i} {...d} />)
                        }
                    </div>
                }
                </>
                :
                <Link href={subMenu?"#":to}>    
                    <div className={layoutStyles.paper}>
                        {label}
                    </div>
                </Link>
            } 
            <style jsx>{`
                .activeMenu {
                    margin-bottom:0px !important;
                }
            `}</style>                               
        </>
    )
}

const SubMenuItem = ({label, to}:MenuItemI) => {
    const classes = useStyles();

    return (
        <Link href={to}>    
            <div className={`${layoutStyles.paper} ${layoutStyles.subMenuItem}`}>
                {label}
            </div>
        </Link>
    )
}