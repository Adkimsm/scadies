import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
const Home: NextPage = () => {
    const [siteInfos, setSiteInfos] = useState<any>({
        title: 'Hell World',
        desc: 'Just so so.',
    })
    const [posts, setPosts] = useState<any>({})

    useEffect(() => {
        ;(async function () {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_CORE_URL}/api/siteInfos`
            )
            const data = await response.json()
            setSiteInfos(data)
        })()
    }, [])

    useEffect(() => {
        ;(async function () {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_CORE_URL}/api/posts`
            )
            const data = await response.json()
            setPosts(data)
        })()
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title></title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to {siteInfos.title}!</h1>

                <p className={styles.description}>{siteInfos.desc}</p>

                <div className={styles.grid}>
                    {Object.keys(posts).length >= 1 ? (
                        Object.keys(posts).map((postKey: any, i: number) => {
                            const post = posts[postKey]
                            return (
                                <a
                                    href="https://nextjs.org/docs"
                                    className={styles.card}
                                    key={i}
                                >
                                    <h2>{post.title} &rarr;</h2>
                                </a>
                            )
                        })
                    ) : (
                        <p>还没有文章～～～</p>
                    )}
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer>
        </div>
    )
}

export default Home
