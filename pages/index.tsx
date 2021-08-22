import Head from 'next/head'
import { GetStaticProps } from 'next'
import { savingI, interestI } from "../types";
import { getDataForFrontpage } from "../lib/dana/tabungan";
import Layout from "../components/layout"
import Hero from "../components/home/Hero"
import Tabungan from "../components/home/Tabungan"
import Events from "../components/home/Events"
import InterestRate from "../components/home/InterestRate"

export const getStaticProps: GetStaticProps = async () => {
	const savingsAndInterests = await getDataForFrontpage();
	return {
	  props: {
		  frontPageData:savingsAndInterests
	  }
	}
  }

export default function Home({frontPageData}:{
    frontPageData:{
      savings:savingI[], 
      interests:interestI[]
    }
  }
) {
  console.log(frontPageData);
  return (
    <Layout>
      <Head>
        <title>Bank NTT - preview site</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <Tabungan />
      <Events />
      <InterestRate interests={frontPageData.interests} />      
    </Layout>
  )
}
