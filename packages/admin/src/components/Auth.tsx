import { createContext, useState, useContext, useEffect } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext = createContext<any>(undefined)

const Auth: React.FC<{ children: React.ReactNode }> = prop => {
    const [authed, setAuthed] = useState<boolean>()

    useEffect(() => {
        const token = localStorage.getItem('token') || ''
        if (!token) {
            setAuthed(false)
            return
        }
        fetch(
            `${import.meta.env.VITE_CORE_URI}/api/session/verifytoken/${token}`
        )
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.y !== true) setAuthed(false)
                else setAuthed(true)
            })
    }, [])

    return (
        <AuthContext.Provider value={{ authed, setAuthed }}>
            {prop.children}
        </AuthContext.Provider>
    )
}

export default Auth
export const useAuth = () => useContext(AuthContext)
