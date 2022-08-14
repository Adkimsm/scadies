import Layout from '../components/Layout'
import {
    Text,
    Input,
    Textarea,
    useInput,
    Button,
    useToasts,
} from '@geist-ui/core'
import { v4 } from 'uuid'

type PostInfo = {
    title: string
    content: string
    other?: { [ket: string]: string }
}

const save = (info: PostInfo) =>
    fetch(`${import.meta.env.VITE_CORE_URI}/api/posts/new/${v4()}`, {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }).then(res => res.json())

function NewPost() {
    const { setToast } = useToasts()
    const { state: content, bindings } = useInput('Hello')
    const { state: title, bindings: bindingsForTitle } = useInput('World')

    return (
        <Layout style={{ textAlign: 'center' }}>
            <Text h1>New Post</Text>
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
                    save({ title, content }).then(res => {
                        setToast(
                            res.y
                                ? { text: '保存成功', type: 'secondary' }
                                : { text: 'Token 错误', type: 'error' }
                        )
                    })
                }}
            >
                Save
            </Button>
        </Layout>
    )
}

export default NewPost
