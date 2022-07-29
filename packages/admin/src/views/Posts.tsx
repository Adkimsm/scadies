import { useAuth } from '../components/Auth'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, Drawer, Text, Spacer } from '@geist-ui/core'
import { AlignLeft, Edit, X } from '@geist-ui/icons'

function Posts() {
    const [, reRender] = useState<any>()
    const { authed } = useAuth()
    console.log(authed)
    const goTo = useNavigate()

    useEffect(() => {
        if (authed == false) {
            console.log('goto')
            goTo('/login', { replace: true })
        }
    })
    const [state, setState] = useState(false)
    const open = () => setState(true)

    type Post = {
        [key: string]: string
    }

    const [posts, setPosts] = useState<Array<Post>>([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_CORE_URI}/api/posts`)
            .then(res => res.json())
            .then(res => setPosts(res))
    }, [])

    const deletePost = (id: string) =>
        fetch(`${import.meta.env.VITE_CORE_URI}/api/posts/delete/${id}`)

    return (
        <>
            <Button
                icon={<AlignLeft />}
                auto
                onClick={() => open()}
                style={{ margin: '30px' }}
            ></Button>
            <Drawer
                visible={state}
                onClose={() => setState(false)}
                placement="left"
            >
                <Drawer.Title>
                    <Text h3 style={{ marginTop: '25px' }}>
                        Dashboard
                    </Text>
                </Drawer.Title>
                <Drawer.Content>
                    <p style={{ opacity: 0, userSelect: 'none' }}>
                        Geist UI 是我最爱的组件库。Geist UI 是我最
                    </p>
                </Drawer.Content>
            </Drawer>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100vw',
                }}
            >
                <div
                    style={{
                        maxWidth: '1000px',
                        minWidth: '300px',
                        width: '75vw',
                        padding: '2rem',
                    }}
                >
                    <div
                        style={{
                            textAlign: 'center',
                            margin: '3rem',
                            fontFamily: 'serif',
                        }}
                    >
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
                                                <Link
                                                    to={`/posts/edit/${post.id}`}
                                                >
                                                    <Button
                                                        icon={<Edit />}
                                                    ></Button>
                                                </Link>
                                                <Button
                                                    onClick={() =>
                                                        deletePost(post.id)
                                                            .then(res =>
                                                                res.json()
                                                            )
                                                            .then(() =>
                                                                reRender('')
                                                            )
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Posts
