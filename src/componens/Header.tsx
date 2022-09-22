import React from "react";
import { logout } from "../store/auth/auth.slice";
import { useAppDispatch, useAuth, useUsername } from "../store/hooks";
import Search from "./Search";

const Header: React.FC = () => {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const user = useUsername();

  const handleClickLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="header">
      <div className="user-info">
        {isAuth && (
          <>
            <h2 className="user-info__caption">
              {user}
            </h2>

            <button
              type="button"
              onClick={handleClickLogout}
              className="user-info__logout"
            >
              Logout
            </button>

            <Search />
          </>
        )}
        {!isAuth && "Для просмотра контактов нужно авторизироваться"}
      </div>
    </div>
  );
};

export default Header;
