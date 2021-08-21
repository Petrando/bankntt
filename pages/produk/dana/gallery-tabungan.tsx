import React, {useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image"
//import { GetStaticProps } from 'next'
//import { getSavingGalleryData } from "../../../lib/dana/tabungan/";
import { savingI } from "../../../types";
import fetchJson from "../../../lib/fetchJson";
import {AccountBalanceWallet, Atm, CreditCardTwoTone, AttachMoney, PhoneAndroid, PhonelinkSetup} from '@material-ui/icons/';
import Layout from "../../../components/layout";
import ImageInGrid from "../../../components/globals/ImageInGrid";
import styles from "../../../styles/produk/dana/GalleryTabungan.module.css";

/*
export const getStaticProps: GetStaticProps = async () => {
  const savingGalleryData = await getSavingGalleryData({termsFeatures:0, photo:0});
  console.log(savingGalleryData);
  return {
    props: {
      savingGalleryData
    }
  }
}*/

//{savingGalleryData}:{savingGalleryData:savingI[]}
const GalleryTabungan = ():JSX.Element => {
    const [galleryData, setGalleryData] = useState<savingI[]>([]);

    React.useEffect(()=>{
        getData();
    }, []);

    const getData = async () => {    
        try {
			    const galleryData = await fetchJson("/api/dana/tabungan/tabunganList", {
			      method: "POST",
			      //headers: { "Content-Type": "application/json" },
            headers: {
              Accept: 'application/json'
            },
			      body: JSON.stringify({projection:{termsFeatures:0}})
			    });			
          console.log(galleryData);
          setGalleryData(galleryData);
		    } catch (error) {
			    console.error("An unexpected error happened:", error);
		    }
    }
    
    return (
        <Layout>
            <main className={`${styles.main} ${"startColumnFlex"}`}>
                <h2 className={`${"title"} ${styles.title}`}>
                    Gallery Tabungan
                </h2>
                {
                    galleryData.length > 0 &&
                    <div className={`${"imageGallery"} ${"marginBottom"}`} >
                      {
                        galleryData.map(d => <div key={d._id} className={styles.tabungan} >
                                               <ImageInGrid 
                                                 photo={`data:${d.photo["Content-Type"]};base64, ${d.photo["data"]}`}
                                                 photoWidth={d.photo.width}
                                                 photoHeight={d.photo.height}
                                                 title={d.name}
                                                 about={d.about}
                                                 linkTo={`/produk/dana/tabungan/${d._id.toString()}`}
                                                 learnMoreLabel={"Selengkapnya"}
                                               />
                                             </div>
                                        )
                      }
                    </div>
                }
            </main> 
            <style jsx>{`
              .marginBottom {
                margin-bottom: 120px;
              }
            `}</style>
        </Layout>      
    )
}

export default GalleryTabungan;