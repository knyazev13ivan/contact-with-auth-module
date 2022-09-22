import React from "react";
import { useAppDispatch, useSearchValue } from "../store/hooks";
import { setSearchValue } from "../store/search/search.slice";
// import svgSearch from "../icons/search.svg";

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchValue = useSearchValue();

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setSearchValue(e.target.value));

  return (
    <div className="search">
      <input className="search__input" type="text" value={searchValue} onChange={handleChangeSearch} />
      {/* <img className="search__img" src={svgSearch} alt="search" /> */}
    </div>
  );
};

export default Search;
