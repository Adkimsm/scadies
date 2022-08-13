import { useAuth } from '../components/Auth'
import { useNavigate, Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Button, Drawer, Text } from '@geist-ui/core'
import { AlignLeft } from '@geist-ui/icons'

const config = {
    sidebar: [
        {
            name: 'Home',
            ref: 'inside',
            href: '/',
        },
        {
            name: 'Posts',
            ref: 'inside',
            href: '/posts',
        },
        {
            name: 'New Post',
            ref: 'inside',
            href: '/new/post',
        },
    ],
}

const App: React.FC<{
    children: React.ReactNode
    style?: React.CSSProperties
}> = props => {
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
                <Drawer.Content style={{ textAlign: 'center' }}>
                    <p style={{ opacity: 0, userSelect: 'none' }}>
                        Geist UI 是我最爱的组件库。Geist UI 是我最
                    </p>
                    {config.sidebar.map((item, i) => {
                        return (
                            <Link to={item.href} key={i}>
                                <Button
                                    key={i}
                                    style={{
                                        width: '100%',
                                        marginBottom: '15px',
                                        display: 'inline-block',
                                        color: '#000',
                                    }}
                                >
                                    {item.name}
                                </Button>
                            </Link>
                        )
                    })}
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
                            margin: '3rem',
                            fontFamily: 'serif',
                            ...props.style,
                        }}
                    >
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
