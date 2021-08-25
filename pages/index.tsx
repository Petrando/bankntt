import Head from 'next/head'
import Layout from "../components/layout"
import Hero from "../components/home/Hero"
import Tabungan from "../components/home/Tabungan"
import Events from "../components/home/Events"
import InterestRate from "../components/home/InterestRate"

export default function Home() {
  
  return (
    <Layout>
      <Head>
        <title>Bank NTT - preview site</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <Tabungan />
      <Events />
      <InterestRate />      
    </Layout>
  )
}
