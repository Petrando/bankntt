import React, {useRef} from "react";
import Link from "next/link";
import {AccountBalanceWallet, Atm, CreditCardTwoTone, AttachMoney, PhoneAndroid, PhonelinkSetup} from '@material-ui/icons/';
import Layout from "../../components/layout";
import Button, {AquaButton} from "../../components/globals/Button";
import styles from "../../styles/produk/DanaMain.module.css";

const Dana = () => {
    const myRef = useRef<HTMLFieldSetElement>(null);
    const DanaButton = ({idx, isTop, label, to, icon}:
                        {idx:number, isTop:boolean, label:string, to:string, icon:JSX.Element}):
                        React.ReactNode => 
    {
        return (
            <Link key={idx} href={to}>
                <a className={`${styles.anchorStyle} ${"centerRowFlex"}`}>
                    {
                        isTop?
                        <Button label={label} icon={icon} />:
                        <AquaButton label={label} icon={icon} />                                                                                
                    }                  	
                </a>
          	</Link>
        )
    }

    return (
        <Layout>
            <main className={styles.main} >
                <div className={styles.mainOverlay} />
                <fieldset className={`${styles.fieldsetStyle}`}>
                    <legend>Produk Dana</legend>
                    {
                        [
                         {label:"Tabungan", to:"#", icon:<AccountBalanceWallet />}, 
                         {label:"Deposito", to:"#", icon:<CreditCardTwoTone />}, 
                         {label:"Giro", to:"#", icon:<AttachMoney />}
                        ].map((d, i)=>DanaButton({idx:i, isTop:true, ...d}))
                    }
                </fieldset>
                <fieldset className={`${styles.fieldsetStyle}`} ref={myRef}
                    onMouseOver={()=>{
                        console.log(myRef.current.offsetWidth);
                    }}
                >
                    <legend>Service Lainnya</legend>
                    {
                        [
                         {label:"Anjungan Tunai Mandiri", to:"#", icon:<Atm />}, 
                         {label:"Electronic Data Capture", to:"#", icon:<PhonelinkSetup />}, 
                         {label:"Mobile Apps", to:"#", icon:<PhoneAndroid />}
                        ].map((d, i)=>DanaButton({idx:i, isTop:false, ...d}))
                    }
                </fieldset>
            </main>
        </Layout>        
    )
}

export default Dana;