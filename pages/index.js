import Head from 'next/head'
import styles from '../styles/Home.module.css'
import logParser from '../lib/log_parser'

export default function Home({ logs }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Quake Logger</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.section}>
        <p>{JSON.stringify(logs)}</p>
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const logs = logParser();
  return {
    props: { logs }, // will be passed to the page component as props
  }
}
