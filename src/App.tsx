
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
import CreateFestival from './pages/festivals/CreateFestival'
import EditFestival from './pages/festivals/EditFestival'
import StagesPage from './pages/stages/StagesPage'
import StageItem from './pages/stages/StageItem'
import EditStage from './pages/stages/EditStage'
import CreateStage from './pages/stages/CreateStage'
import SchedulesPage from './pages/schedules/SchedulesPage'
import ScheduleItem from './pages/schedules/ScheduleItem'
import CreateSchedule from './pages/schedules/CreateSchedule'
import EditSchedule from './pages/schedules/EditSchedule'

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

        <Route path='/create-festival' element={<CreateFestival />}/>
        <Route path='/edit-festival/:id' element={<EditFestival />}/>


        <Route path='/artists' element={<ArtistsPage />}/>
        <Route path='/artists/:id' element={<ArtistItem />}/>

        <Route path='/create-artist' element={<CreateArtist />}/>
        <Route path='/edit-artist/:id' element={<EditArtist />}/>


        <Route path='/stages' element={<StagesPage />} />
        <Route path='/stages/:id' element={<StageItem />}/>
        <Route path='/create-stage' element={<CreateStage />}/>
        <Route path='/edit-stage/:id' element={<EditStage />}/>


        <Route path='/schedules' element={<SchedulesPage />}/>
        <Route path='/schedules/:id' element={<ScheduleItem />}/>
        <Route path='/create-schedule' element={<CreateSchedule />}/>
        <Route path='/edit-schedule/:id' element={<EditSchedule />}/>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
