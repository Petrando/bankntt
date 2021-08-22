import { useEffect, useState, Fragment } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CheckIcon from '@material-ui/icons/Check';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Image from "next/image"
import Layout from "../../../../components/layout";
import styles from "../../../../styles/produk/dana/Tabungan.module.css";
import { getAllTabunganIds, getTabunganData  } from '../../../../lib/dana/tabungan'
import LearnMore from '../../../../components/globals/LearnMore';

export const getStaticProps: GetStaticProps = async ({params}) => {  
  const savingData = await getTabunganData(params.id as string)
  return {
    props: {
      savingData
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  
  const paths = await getAllTabunganIds();
  return {
    paths,
    fallback: false
  }
}

interface SavingI {
    name?:string;
    about?:string;
    photo?:{
        data:string;
        ['Content-Type']:string;
        width:number;
        height:number;
    };
    termsFeatures?:{
        name:string;
        features:string[];
    }[]
}

export default function Post({ savingData }: {
  savingData: {
    name: string,
    about: string,
    photo: string,
    termsFeatures:any[]
  }
}) {
    const [mySavingData, setMySavingData] = useState<SavingI>(null)

useEffect(()=>{    
    const newSavingData:SavingI = {};
    newSavingData.name = savingData.name;
    newSavingData.about = savingData.about;
    newSavingData.photo = JSON.parse(savingData.photo);
    newSavingData.termsFeatures = savingData.termsFeatures

    setMySavingData(newSavingData);
}, [savingData])

const termsFeatures = (d, i) => {
    return (
        <Fragment key={i}>  
            <p className={styles.featureTitle}>
                {d.name}
            </p>
            {
                d.features.map((df, i)=><div key={i} className={styles.feature}>
                                            <span className={`${styles.featureIcon} ${"startColumnFlex"}`}>
                                                {
                                                    d.name==="Prasyarat"?
                                                    <ThumbUpIcon fontSize="small" />:
                                                    d.name==="Syarat Khusus"?
                                                    <ThumbUpIcon fontSize="small" />:
                                                    d.name==="Fasilitas"?
                                                    <AssignmentTurnedInIcon fontSize="small" />:
                                                    <CheckBoxIcon fontSize="small" />
                                                }
                                            </span>
                                            <span className={styles.featureAbout}>
                                                {df}
                                            </span>
                                        </div>
                              )
            }
        </Fragment>
    )
}
  
return (
  	<Layout>
        <main className={`${styles.main} ${"startColumnFlex"} ${styles.marginBottom}`}>
            {
                mySavingData &&
                <>
                    <h2 className={`${"title"} ${styles.title}`}>
                        {mySavingData.name}
                    </h2>
                    <div className={styles.imgContainer}>
                        <Image 
                            src={`data:${mySavingData.photo["Content-Type"]};base64, ${mySavingData.photo["data"]}`}
                            layout="fill"
                            objectFit="cover" 
                            alt={mySavingData.name} 
                        />
                    </div>       
                    <p className={"about"}>
                        {
                            mySavingData.about
                        }
                    </p>
                    {
                        mySavingData.termsFeatures.length > 0 &&
                        mySavingData.termsFeatures.map((d, i)=>termsFeatures(d, i))
                    } 
                    <p className={`${"learnMoreContainer"} ${"learnMoreTop"}`}>
				        <LearnMore linkTo="/produk/dana/gallery-tabungan" 
						   label="Gallery Tabungan" 
						   onBrightSurface={true}/>
			        </p>      
                </>
            }
        </main>
        <style jsx>{`
            .learnMoreTop {
                margin-top: 40px;
            }
        `}</style>
    </Layout>
  )  	
}