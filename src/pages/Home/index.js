import React, { useContext, useEffect, useCallback } from "react";
import { DatePicker } from "antd";
import "./index.css";
import SubHeader from "../SubHeader";
import { getNewsFeeds } from "../../service/service";
import { Context } from "../../store";
import { SET_NEWS, SET_SEARCH, SET_SELECTED_NEWS } from "../../store/action";

const { RangePicker } = DatePicker;

const Home = () => {
  const { state, dispatch } = useContext(Context);

  const fetchNews = useCallback(async () => {
    const news = await getNewsFeeds({
      query: state.searchCriteria.query,
      start_date: state.searchCriteria.start_date,
      end_date: state.searchCriteria.end_date,
      source: state.searchCriteria.source.join(","),
      category: state.searchCriteria.category.join(","),
      sentiment: state.searchCriteria.sentiment,
    });

    dispatch({
      type: SET_NEWS,
      payload: news.result.data,
    });

    // console.log(news.result.data);
  }, [state.searchCriteria, dispatch]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const onDateChangeHandler = (date) => {
    const startDate = date[0].format("YYYY-MM-DD");
    const endDate = date[1].format("YYYY-MM-DD");
    dispatch({
      type: SET_SEARCH,
      payload: {
        start_date: startDate,
        end_date: endDate,
      },
    });
  };
  const onNewsClick = (news) => {
    dispatch({
      type: SET_SELECTED_NEWS,
      payload: news,
    });
  };

 const formatDate = (dt)=> {
   console.log(dt);
    const date = new Date(dt);
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const newDate = `${day}-${month}-${year}`;
    return newDate;
  }


  return (
    <div className="home-page">
      <div className="left-side-container">
        <div className="date-range-picker">
          <RangePicker className="date-picker" onChange={onDateChangeHandler} />
        </div>
        <ul>
          {state.news.map((news) => {
            return (
              <li
                className="news-heading-block"
                onClick={() => onNewsClick(news)}
              >
                <h3 className="publication">{news.publication}</h3>
                <div className="news-title">{news.title}</div>
                <label className="news-date">{formatDate(news.date)}</label>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="right-side-container">
        <div className="news-heading">
          {state?.selectedNews?.title}
          <div className="news-sub-content">
            <div className="news-public">
              {state?.selectedNews?.publication}
            </div>
            <div className="news-date">{formatDate(state?.selectedNews?.date)}</div>
          </div>
        </div>

        <div className="news-content">{state?.selectedNews?.content}</div>
      </div>
    </div>
  );
};

export default Home;
