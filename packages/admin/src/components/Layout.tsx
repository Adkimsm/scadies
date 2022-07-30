import { useAuth } from '../components/Auth'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Button, Drawer, Text } from '@geist-ui/core'
import { AlignLeft } from '@geist-ui/icons'

const App: React.FC<{children: React.ReactNode}> = (props) => {
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
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
