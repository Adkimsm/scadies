import { useAuth } from '../components/Auth'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, Drawer, Text, Card } from '@geist-ui/core'
import { AlignLeft } from '@geist-ui/icons'
import { version as adminVersion } from '../../package.json'

function App() {
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

    let postNum = 0

    fetch(`${import.meta.env.VITE_CORE_URI}/api/posts`)
        .then(res => res.json())
        .then(res => (postNum = Object.keys(res).length))

    let lastLoggedIp = '192.168.255.255'

    let lastLoggedTime = '0000-00-00 00:00'

    fetch(`${import.meta.env.VITE_CORE_URI}/api/logged`)
        .then(res => res.json())
        .then(res => {
            lastLoggedIp = res[0].ip
            lastLoggedTime = res[0].time
        })

    let coreVersion = '0.0.1'

    fetch(`${import.meta.env.VITE_CORE_URI}/api/ver`)
        .then(res => res.json())
        .then(res => (coreVersion = res.v))

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
                <Card
                    shadow
                    style={{
                        maxWidth: '1000px',
                        minWidth: '300px',
                        width: '75vw',
                    }}
                >
                    <Card shadow>
                        <Text h2 b>
                            概览
                        </Text>
                        <Text p>共有 {postNum} 篇文章。</Text>
                    </Card>
                    <Card shadow>
                        <Text h2 b>
                            最近登录
                        </Text>
                        <Text p>上次登录 IP： {lastLoggedIp}</Text>
                        <Text p>上次登录时间： {lastLoggedTime}</Text>
                    </Card>
                    <Card shadow>
                        <Text h2 b>
                            系统信息
                        </Text>
                        <Text p>Core 版本： {coreVersion}</Text>
                        <Text p>Admin 版本： {adminVersion}</Text>
                    </Card>
                </Card>
            </div>
        </>
    )
}

export default App
