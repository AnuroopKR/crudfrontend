import react from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './utils/store'
import User from './user/User'
import Admin from './admin/Admin'



function App() {

  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      
      <Route path='/user/*' element={<User/>}/>
      <Route path='/admin/*' element={<Admin/>}/>

    </Routes>
    
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
