import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, Text, Spacer } from '@geist-ui/core'
import { Edit, X } from '@geist-ui/icons'

export default function Posts() {
    const [, reRender] = useState<any>()

    type Posts = {
        [key: string]: {
            title: string
            content: string
        }
    }

    const [posts, setPosts] = useState<Posts>()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_CORE_URI}/api/posts`)
            .then(res => res.json())
            .then(res => setPosts(res))
    }, [])

    const token = localStorage.getItem('token')

    const deletePost = (id: string) =>
        fetch(`${import.meta.env.VITE_CORE_URI}/api/posts/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

    return (
        <Layout style={{ textAlign: 'center' }}>
            <Text h1>文章管理</Text>
            <Spacer h={'3rem'} />

            {posts ? (
                <table width="100%">
                    <thead>
                        <tr>
                            <td style={{ width: '20%', border: 'solid 2px' }}>
                                标题
                            </td>
                            <td style={{ width: '80%', border: 'solid 2px' }}>
                                操作
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(posts).map((postKey, i) => {
                            const post = posts[postKey]
                            return (
                                <tr key={i}>
                                    <td
                                        style={{
                                            width: '20%',
                                            border: 'solid 2px',
                                        }}
                                    >
                                        {post.title}
                                    </td>
                                    <td
                                        style={{
                                            width: '80%',
                                            border: 'solid 2px',
                                            textAlign: 'left',
                                        }}
                                    >
                                        <Link to={`/posts/edit/${postKey}`}>
                                            <Button
                                                width={'40px'}
                                                margin="10px"
                                                icon={<Edit />}
                                            ></Button>
                                        </Link>
                                        <Button
                                            width={'40px'}
                                            onClick={() =>
                                                deletePost(postKey)
                                                    .then(res => res.json())
                                                    .then(() => reRender(''))
                                            }
                                            icon={<X />}
                                        ></Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            ) : (
                <Text h3>
                    暂无文章~~~ 快去
                    <Link to="/posts/new">撰写一篇吧</Link>
                </Text>
            )}
        </Layout>
    )
}
