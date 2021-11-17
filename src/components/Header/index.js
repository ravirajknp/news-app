import React, { useContext, useRef, useState } from "react";
import { Button, Input } from "antd";
import "antd/dist/antd.css";
// import { AudioOutlined } from '@ant-design/icons';
import "./index.css";
import AdvanceSearch from "../AdvanceSearch";
// import { getNewsFeeds } from "../../service/service";
import { Context } from "../../store";
import { SET_SEARCH } from "../../store/action";

const { Search } = Input;

const Header = () => {
  const [isModelActive, setModelActive] = useState(false);

  const { state, dispatch } = useContext(Context);
  const changeRef = useRef("");

  const onSearch = (value) => dispatch({
    type: SET_SEARCH,
    payload: {
      query:value
    }
  }) 



  // const onChangeHandler = (event) => {
  //   event.preventDefault();
  //   console.log(changeRef.current.state.value);
  // };

  return (
    <>
      <div className="logo">
        <span className="heading-1">News</span>
        <span className="heading-2">Reader</span>
      </div>
      <div className="header">
        <Search
          onSearch={onSearch}
          className="search-input"
          ref={changeRef}
          // onChange={onChangeHandler}
          placeholder="Search here..."
          enterButton="Search"
        />

        <Button
          size="large"
          className="button"
          onClick={() => setModelActive(true)}
        >
          Advance Search
        </Button>

        <AdvanceSearch
          isModelActive={isModelActive}
          onClose={() => setModelActive(false)}
        />
      </div>
    </>
  );
};

export default Header;
