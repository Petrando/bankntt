import Head from 'next/head'
import Image from 'next/image'
import Navbar from "./navbar";
import Footer from "./Footer";

const name = 'Petrando Richard'
export const siteTitle = 'Next.js - Tailwind play'

export default function Layout({ children, home }: {
  														children: React.ReactNode
  														home?: boolean
													}
) {
  return (
  	<div className={'container'}>
  		<Navbar />
  		{
  			children
  		}
  		<Footer />
  		<style jsx>{`
        	.container {
          		min-height: 100vh;          		        	
        	}
        `}</style>
  	</div>
  )
}