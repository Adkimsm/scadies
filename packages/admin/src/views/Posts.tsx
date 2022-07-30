import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, Text, Spacer } from '@geist-ui/core'
import { Edit, X } from '@geist-ui/icons'

function Posts() {
    const [, reRender] = useState<any>()

    type Post = {
        [key: string]: string
    }

    const [posts, setPosts] = useState<Array<Post>>([])

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
        <Layout style={{ textAlign: "center"}}>
            <Text h1>文章管理</Text>
            <Spacer h={'3rem'} />

            {posts.length >= 1 ? (
                <table>
                    <tr>
                        <td>标题</td>
                        <td>操作</td>
                    </tr>
                    {posts.map((post, i) => {
                        return (
                            <tr key={i}>
                                <td>{post.title}</td>
                                <td>
                                    <Link to={`/posts/edit/${post.id}`}>
                                        <Button icon={<Edit />}></Button>
                                    </Link>
                                    <Button
                                        onClick={() =>
                                            deletePost(post.id)
                                                .then(res => res.json())
                                                .then(() => reRender(''))
                                        }
                                        icon={<X />}
                                    ></Button>
                                </td>
                            </tr>
                        )
                    })}
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

export default Posts
