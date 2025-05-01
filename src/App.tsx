
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/login/LoginPage'
import HomePage from './pages/homepage/HomePage'
import FestivalPage from './pages/festivals/FestivalPage'
import RegisterPage from './pages/register/RegisterPage'
import ArtistsPage from './pages/artists/ArtistsPage'
import MyFestivalsPage from './pages/my-festivals/MyFestivalsPage'
import PageNavigator from './components/pagenavigator/PageNavigator'
import ProfilePage from './pages/profile/ProfilePage'
import EditProfile from './pages/profile/EditProfile'
import PrivateRoute from './components/privateroute/PrivateRoute'

function App() {
  return (
    <>
    <BrowserRouter>
      <PageNavigator />
      <Routes>
        <Route index element={<HomePage />}/>

        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<ProfilePage />}/>
          <Route path='/profile-edit' element={<EditProfile />}/>
          <Route path='/my-festivals' element={<MyFestivalsPage />}/>
        </Route>




        <Route path='/festivals' element={<FestivalPage />}/>
        <Route path='/artists' element={<ArtistsPage />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
