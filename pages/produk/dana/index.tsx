import React from "react";
import Link from "next/link";
import {AccountBalanceWallet, Atm, CreditCardTwoTone, AttachMoney, PhoneAndroid, PhonelinkSetup} from '@material-ui/icons/';
import Layout from "../../../components/layout";
import Button, {AquaButton} from "../../../components/globals/Button";
import styles from "../../../styles/produk/dana/DanaMain.module.css";

const Dana = () => {
    const DanaButton = ({idx, isTop, label, to, icon}:
                        {idx:number, isTop:boolean, label:string, to:string, icon:JSX.Element}):
                        React.ReactNode => 
    {
        return (
            <Link key={idx} href={to}>
                <a className={`${styles.anchorStyle} ${"centerRowFlex"}`}>
                    {
                        isTop?
                        <Button label={label} icon={icon} notActive={to==="#"} />:
                        <AquaButton label={label} icon={icon} notActive={to==="#"}  />                                                                                
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
                         {label:"Tabungan", to:"/produk/dana/gallery-tabungan/", icon:<AccountBalanceWallet />}, 
                         {label:"Deposito", to:"#", icon:<CreditCardTwoTone />}, 
                         {label:"Giro", to:"#", icon:<AttachMoney />}
                        ].map((d, i)=>DanaButton({idx:i, isTop:true, ...d}))
                    }
                </fieldset>
                <fieldset className={`${styles.fieldsetStyle}`} >
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