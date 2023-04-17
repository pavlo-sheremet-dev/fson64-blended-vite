import React from "react";
import { CiSearch } from "react-icons/ci";
import styles from "./Filter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../../redux/selectors";
import { changeFilter } from "../../redux/filterSlice";

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const handleChange = (e) =>
    dispatch(changeFilter(e.target.value.toLowerCase()));

  return (
    <div className={styles.search}>
      <div className={styles.searchWrapper}>
        <CiSearch className={styles.searchIcon} />

        <input
          className={styles.searchInput}
          type="text"
          id="search"
          placeholder="Search something.."
          value={filter}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
