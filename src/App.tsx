
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/login/LoginPage'
import HomePage from './pages/homepage/HomePage'
import FestivalsPage from './pages/festivals/FestivalsPage'
import RegisterPage from './pages/register/RegisterPage'
import ArtistsPage from './pages/artists/ArtistsPage'
import MyFestivalsPage from './pages/my-festivals/MyFestivalsPage'
import PageNavigator from './components/pagenavigator/PageNavigator'
import ProfilePage from './pages/profile/ProfilePage'
import EditProfile from './pages/profile/EditProfile'
import PrivateRoute from './components/privateroute/PrivateRoute'
import FestivalItem from './pages/festivals/FestivalItem'
import FestivalArtistsPage from './pages/festivals/FestivalArtistsPage'
import FestivalSchedulePage from './pages/festivals/FestivalSchedulePage'
import ArtistItem from './pages/artists/ArtistItem'
import CreateArtist from './pages/artists/CreateArtist'
import EditArtist from './pages/artists/EditArtist'

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




        <Route path='/festivals' element={<FestivalsPage />}/>
        <Route path='/festivals/:id' element={<FestivalItem />}/>
        <Route path='/festivals/:id/artists' element={<FestivalArtistsPage />}/>
        <Route path='/festivals/:id/schedule' element={<FestivalSchedulePage />}/>



        <Route path='/artists' element={<ArtistsPage />}/>
        <Route path='/artists/:id' element={<ArtistItem />}/>

        <Route path='/create-artist' element={<CreateArtist />}/>
        <Route path='/edit-artist/:id' element={<EditArtist />}/>



      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
