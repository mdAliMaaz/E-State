import { Profile, ProtectedRoutes, PublicRoutes } from "./components";
import {
  CreateListing,
  EditListing,
  HomePage,
  LoginPage,
  SignupPage,
  MyListingPage,
  ListingDetailsPage,
} from "./pages";

import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Route>

        {/* Privtate Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/myListing' element={<MyListingPage />} />
          <Route path='/listing/add' element={<CreateListing />} />
          <Route path='/listing/:id' element={<ListingDetailsPage />} />
          <Route path='/listing/edit/:id' element={<EditListing />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
