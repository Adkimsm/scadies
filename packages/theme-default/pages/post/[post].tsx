import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import React from 'react'

type PostInfo = {
    title: string
    content: string
    other?: { [ket: string]: string }
}

const Post = () => {
    const [postInfo, setPost] = useState<PostInfo>()
    const router = useRouter()
    const { post } = router.query

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_CORE_URL}/api/posts/${post}`)
            .then(res => res.json())
            .then(res => setPost(res))
    }, [])

    return (
        <>
            <h1>{postInfo?.title}</h1>
            <p>{postInfo?.content}</p>
        </>
    )
}

export default Post
