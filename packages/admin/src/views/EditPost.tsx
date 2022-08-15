import Layout from '../components/Layout'
import {
    Text,
    Input,
    Textarea,
    useInput,
    Button,
    useToasts,
} from '@geist-ui/core'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'

type PostInfo = {
    title: string
    content: string
    other?: { [ket: string]: string }
}

function getPostInfo(id = ''): Promise<PostInfo> {
    return fetch(`${import.meta.env.VITE_CORE_URI}/api/posts/${id}`).then(
        res => {
            if (res.ok) return res.json()
            else throw new TypeError('Server went wrong')
        }
    )
}

const save = (info: PostInfo, id = '') =>
    fetch(`${import.meta.env.VITE_CORE_URI}/api/posts/new/${id}`, {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }).then(res => {
        if (res.ok) return res.json()
        else throw new Error('permission denied')
    })

function NewPost() {
    const { postid: postID } = useParams()
    const { setToast } = useToasts()
    const { state: content, setState: setContent, bindings } = useInput('Hello')
    const {
        state: title,
        setState: setTitle,
        bindings: bindingsForTitle,
    } = useInput('World')
    const [postInfo, setPostInfo] = useState<PostInfo>()

    useEffect(() => {
        ;(async function () {
            const xhr = await getPostInfo(postID)
            await setPostInfo(xhr)
            await setTitle(xhr.title)
            await setContent(xhr.content)
        })()
    }, [])

    return (
        <Layout style={{ textAlign: 'center' }}>
            <Text h1>Edit Post</Text>
            <Input
                label="Title"
                width="70%"
                scale={4 / 3}
                placeholder="Hello World"
                {...bindingsForTitle}
            />
            <Text p style={{ textAlign: 'left' }}>
                Content:{' '}
            </Text>
            <Textarea height="50vw" width="100%" {...bindings} />
            <Button
                onClick={() => {
                    save({ title, content }, postID)
                        .then(res => {
                            setToast(
                                res.y
                                    ? { text: '保存成功', type: 'secondary' }
                                    : {
                                          text: '服务器发生错误，请查阅 Core 日志',
                                          type: 'error',
                                      }
                            )
                        })
                        .catch(() => {
                            setToast({
                                text: 'Token 错误，请刷新重试',
                                type: 'error',
                            })
                        })
                }}
            >
                Save
            </Button>
        </Layout>
    )
}

export default NewPost
