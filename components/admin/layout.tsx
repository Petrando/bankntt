import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import useUser from "../../lib/useUser";
import TopNav from "./topnav";
import { styles } from "./post.styles";

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
                Drawer
            </Drawer>
            <main className={classes.main}>
                {
  			        children
  		        }
            </main>
        </div> 		
  		<style jsx>{`
        	.container {
          		min-height: 100vh;          		        	
        	}
        `}</style>
  	</div>
  )
}