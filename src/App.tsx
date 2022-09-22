import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./componens/Header";
import AuthPage from "./pages/AuthPage";
import ContactsPage from "./pages/ContactsPage";
import { useAuth } from "./store/hooks";

const App: React.FC = () => {
  const isAuth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      // navigate("/contacts");
    } else {
      navigate("/");
    }
  }, [isAuth]);

  return (
    <div className="container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
