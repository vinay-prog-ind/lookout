import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CitiesContextProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Suspense, lazy } from "react";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import PagenotFound from "./pages/PagenotFound";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";

const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Homepage = lazy(() => import("./pages/Homepage"));
const PagenotFound = lazy(() => import("./pages/PagenotFound"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

// import { useContext } from "react";
export default function App() {
  return (
    <>
      {" "}
      <AuthProvider>
        <CitiesContextProvider>
          <Router>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route path="/" index element={<Homepage />} />
                <Route path="Pricing" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="login" element={<Login />} />

                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      {" "}
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="cities" />} />
                  <Route
                    path="cities"
                    // element={<CityList  />}
                    element={<CityList />}
                  />
                  <Route path="cities/:id" element={<City />} />
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                </Route>

                <Route path="*" element={<PagenotFound />} />
              </Routes>
            </Suspense>
          </Router>
        </CitiesContextProvider>
      </AuthProvider>
    </>
  );
}
