import {
    Grid,
    Text,
    Card,
    Input,
    Spacer,
    Button,
    useToasts,
} from '@geist-ui/core'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../components/Auth'
import { useEffect, useState } from 'react'

const Home = () => {
    const location = useLocation()
    const search = new URLSearchParams(location.search)
    const from = search.get('from') || ''
    const goTo = useNavigate()

    const { authed, setAuthed } = useAuth(),
        [usrName, setUsrName] = useState(''),
        [usrPwd, setUsrPwd] = useState(''),
        [btnLoading, setBtnLoading] = useState(false)

    const { setToast } = useToasts()

    useEffect(() => {
        if (authed) {
            goTo(`${decodeURIComponent(from)}`)
            setToast({ text: '您已登录', type: 'secondary' })
        }
    }, [authed])

    const login = async () => {
        setBtnLoading(true)
        const xhr = await fetch(
            `${import.meta.env.VITE_CORE_URI}/api/session/login`,
            {
                method: 'POST',
                body: JSON.stringify({ usr: usrName, pwd: usrPwd }),
                headers: { 'Content-Type': 'application/json' },
            }
        )
        const res = await xhr.json()
        console.log(res)
        await setBtnLoading(false)
        if (!res.y) {
            if (res.name === false) {
                setToast({ text: '用户名错误', type: 'error' })
                return
            }
            if (res.pwd === false) {
                setToast({ text: '密码错误', type: 'error' })
                return
            }
        } else {
            setAuthed(true)
            localStorage.setItem('token', res.token)
        }
    }

    return (
        <>
            <Grid.Container
                gap={2}
                justify="center"
                height={'100vh'}
                width={'100vw'}
            >
                <Grid
                    xs={7.5}
                    style={{ margin: '30px' }}
                    justify="center"
                    width={'100%'}
                >
                    <Card
                        shadow
                        width={'100%'}
                        padding="2"
                        style={{ minWidth: '300px' }}
                    >
                        <Text h1 style={{ textAlign: 'center' }}>
                            登录
                        </Text>
                        <Spacer h={2.5} />
                        <Input
                            label="用户名"
                            scale={4 / 3}
                            placeholder="Username"
                            width="100%"
                            value={usrName}
                            onChange={e => setUsrName(e.target.value)}
                        />
                        <Spacer h={2.5} />
                        <Input.Password
                            label="密码"
                            scale={4 / 3}
                            placeholder="Password"
                            width="100%"
                            value={usrPwd}
                            onChange={e => setUsrPwd(e.target.value)}
                        />
                        <Spacer h={2.5} />
                        <Grid
                            xs={24}
                            style={{ margin: '0 30px' }}
                            justify="center"
                            width={'100%'}
                        >
                            <Button
                                width={'100%'}
                                loading={btnLoading}
                                onClick={() => {
                                    login()
                                }}
                            >
                                Sign in
                            </Button>
                        </Grid>
                    </Card>
                </Grid>
            </Grid.Container>
        </>
    )
}

export default Home
