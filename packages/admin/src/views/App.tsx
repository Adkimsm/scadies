import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import { Text, Card } from '@geist-ui/core'
import { version as adminVersion } from '../../package.json'

function App() {
    const [hitokoto, setHitokoto] = useState({
        hitokoto: '',
        from: '',
    })

    let postNum = 0

    /*
    let coreVersion = '0.0.1'

    fetch(`${import.meta.env.VITE_CORE_URI}/api/ver`)
        .then(res => res.json())
        .then(res => (coreVersion = res.v))
*/

    useEffect(() => {
        fetch('https://v1.hitokoto.cn/?encode=json')
            .then(res => res.json())
            .then(res => setHitokoto(res))

        fetch(`${import.meta.env.VITE_CORE_URI}/api/posts`)
            .then(res => res.json())
            .then(res => (postNum = Object.keys(res).length))
    }, [])

    return (
        <Layout>
            <Text h3 b style={{ textAlign: 'center' }}>
                『 {hitokoto.hitokoto} 』
            </Text>
            <Text p style={{ textAlign: 'right' }}>
                {' '}
                ---- {hitokoto.from}
            </Text>

            <Card
                shadow
                margin={'2rem'}
                padding={'3rem'}
                style={{ borderRadius: '20px' }}
            >
                <Text h2 b>
                    概览
                </Text>
                <Text p>共有 {postNum} 篇文章。</Text>
                <Text h2 b>
                    系统信息
                </Text>
                {/*<Text p>Core 版本： {coreVersion}</Text>*/}
                <Text p>Admin 版本： {adminVersion}</Text>
            </Card>
        </Layout>
    )
}

export default App
