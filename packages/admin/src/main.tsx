import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import ReactDOM from 'react-dom/client'
import App from './views/App'
import Login from './views/Login'
import Reg from './views/Reg'
import Posts from './views/Posts'
import NewPost from './views/NewPost'
import EditPost from './views/EditPost'
import Auth from './components/Auth'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <GeistProvider>
        <CssBaseline />
        <Auth>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/reg" element={<Reg />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/new">
                        <Route path="post" element={<NewPost />} />
                    </Route>
                    <Route path="/edit">
                        <Route path="post/:postid" element={<EditPost />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Auth>
    </GeistProvider>
)
