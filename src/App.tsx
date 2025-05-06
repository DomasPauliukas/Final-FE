
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login/LoginPage'
import HomePage from './pages/homepage/HomePage'
import FestivalsPage from './pages/festivals/FestivalsPage/FestivalsPage'
import RegisterPage from './pages/register/RegisterPage'
import ArtistsPage from './pages/artists/ArtistsPage/ArtistsPage'
import MyFestivalsPage from './pages/my-festivals/MyFestivalsPage'
import PageNavigator from './components/pagenavigator/PageNavigator'
import ProfilePage from './pages/profile/ProfilePage/ProfilePage'
import EditProfile from './pages/profile/EditProfile/EditProfile'
import PrivateRoute from './components/privateroute/PrivateRoute'
import FestivalItem from './pages/festivals/FestivalItem/FestivalItem'
import FestivalArtistsPage from './pages/festivals/FestivalArtistsPage/FestivalArtistsPage'
import FestivalSchedulePage from './pages/festivals/FestivalSchedulePage/FestivalSchedulePage'
import ArtistItem from './pages/artists/ArtistItem/ArtistItem'
import CreateArtist from './pages/artists/CreateArtist/CreateArtist'
import EditArtist from './pages/artists/EditArtist/EditArtist'
import CreateFestival from './pages/festivals/CreateFestival/CreateFestival'
import EditFestival from './pages/festivals/EditFestival/EditFestival'
import StagesPage from './pages/stages/StagesPage/StagesPage'
import EditStage from './pages/stages/EditStage/EditStage'
import CreateStage from './pages/stages/CreateStage/CreateStage'
import SchedulesPage from './pages/schedules/SchedulesPage/SchedulesPage'
import ScheduleItem from './pages/schedules/ScheduleItem/ScheduleItem'
import CreateSchedule from './pages/schedules/CreateSchedule/CreateSchedule'
import EditSchedule from './pages/schedules/EditSchedule/EditSchedule'
import UsersPage from './pages/users/UsersPage'
import { useAuth } from './context/AuthContext'
import AdminRoute from './components/privateroute/AdminRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import { ToastContainer } from 'react-toastify'
import AllTicketsPage from './pages/tickets/AllTicketsPage'
import StageItem from './pages/stages/StageItem/StageItem'

function App() {
  const { user } = useAuth()
  return (
    <>
    <BrowserRouter>
      <PageNavigator />
      <Routes>
        <Route index element={<HomePage />}/>
      
      {!user && 
        <>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
        </>
      }

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<ProfilePage />}/>
          <Route path='/profile-edit' element={<EditProfile />}/>
          <Route path='/my-festivals' element={<MyFestivalsPage />}/>
        </Route>

        <Route element={<AdminRoute />}>
          <Route path='/admin' element={<AdminDashboard />}/>
          <Route path='/users' element={<UsersPage />}/>
          <Route path='/edit-user/:userId' element={<EditProfile />}/>
          <Route path='/create-festival' element={<CreateFestival />}/>
          <Route path='/edit-festival/:id' element={<EditFestival />}/>
          <Route path='/create-artist' element={<CreateArtist />}/>
          <Route path='/edit-artist/:id' element={<EditArtist />}/>
          <Route path='/create-stage' element={<CreateStage />}/>
          <Route path='/edit-stage/:id' element={<EditStage />}/>
          <Route path='/create-schedule' element={<CreateSchedule />}/>
          <Route path='/edit-schedule/:id' element={<EditSchedule />}/>
          <Route path='/tickets' element={<AllTicketsPage />} />
        </Route>

        <Route path='/festivals' element={<FestivalsPage />}/>
        <Route path='/festivals/:id' element={<FestivalItem />}/>
        <Route path='/festivals/:id/artists' element={<FestivalArtistsPage />}/>
        <Route path='/festivals/:id/schedule' element={<FestivalSchedulePage />}/>

        <Route path='/artists' element={<ArtistsPage />}/>
        <Route path='/artists/:id' element={<ArtistItem />}/>

        <Route path='/stages' element={<StagesPage />} />
        <Route path='/stages/:id' element={<StageItem />}/>

        <Route path='/schedules' element={<SchedulesPage />}/>
        <Route path='/schedules/:id' element={<ScheduleItem />}/>
      </Routes>
    </BrowserRouter>

    <ToastContainer position='bottom-center' autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
    </>
  )
}

export default App
