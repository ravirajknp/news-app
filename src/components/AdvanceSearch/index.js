import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Col, Modal, Row, Select } from "antd";
import "./index.css";
import { getCategories, getSources } from "../../service/service";
import { Context } from "../../store";
import { SET_ADVANCE_SEARCH, SET_FILTERS, SET_FILTERS_VALUE, SET_SEARCH } from "../../store/action";

const { Option } = Select;

const AdvanceSearch = ({ isModelActive, onClose }) => {
  const { state, dispatch } = useContext(Context);

  const setFilters = () => {
    if (state.filters.length >= state.advanceSearch.length) return;
    dispatch({
      type: SET_FILTERS,
      payload: state.filters.length,
    });
  };

  const fetchCategories = useCallback(async () => {
    const response = await getCategories();
    dispatch({
      type: SET_ADVANCE_SEARCH,
      payload: {
        name: "category",
        data: response,
      },
    });
  }, [dispatch]);

  const fetchSources = useCallback(async () => {
    const response = await getSources();
    dispatch({
      type: SET_ADVANCE_SEARCH,
      payload: {
        name: "source",
        data: response?.sources,
      },
    });
  }, [dispatch]);

  useEffect(() => {
    if (!isModelActive) return;
    fetchCategories();
    fetchSources();
  }, [fetchCategories, fetchSources, isModelActive]);

//   console.log(state, "state");

  return (
    <Modal title="Advance Search" visible={isModelActive} onCancel={onClose} onOk={onClose}>
      <div className="adv-search">
        <div className="btn-1">
          <Button type="Default" size="large" onClick={setFilters}>
            Add New Filter
          </Button>
        </div>
        <div className="btn-2">
          {state?.filters.map((filter, index) => (
            <DropdownWithInput
              key={index}
              searchData={state.advanceSearch}
              filter={filter}
              index={index}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default AdvanceSearch;

const DropdownWithInput = ({ filter, index }) => {
  const { state, dispatch } = useContext(Context);

  const dropDownChange = (value) => {
    // console.log(value, "onchang", index);

    dispatch({
      type: SET_FILTERS_VALUE,
      payload: {
          index: index,
          value: value
        },
    });
  };
//   console.log(filter, "filter");

  //   return null;

  const onOptionChange = (name, value)=> {
    // console.log("value",value);
    console.log("name", name)
    dispatch({
        type: SET_SEARCH,
        payload: {
            [name]: value
        }
    })
  }

  return (
    <Row style={{ marginTop: 20 }}>
      <Col span={12}>
        <Select
          //   showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          style={{ width: "90%" }}
          onChange={dropDownChange}
          defaultValue={""}

          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          // filterOption={(input, option) =>
          //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          // }
        >
          {state.advanceSearch.map((data) => {
            return <Option value={data.name}>{data.label}</Option>;
          })}
        </Select>
      </Col>
      <Col span={12}>
        <Select
          showSearch
          mode={filter.name === "sentiment" ? "" : "tags"}
          style={{ width: "100%" }}
          placeholder="Select a person"
          optionFilterProp="children"
          //   defaultValue={filter}
          onChange={(value)=> onOptionChange(filter.name, value)}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          // filterOption={(input, option) =>
          //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          // }
        >
          {filter?.options?.map((fill) => {
            return <Option value={fill?.iptc_code || fill?.id}>{fill?.category || fill?.name}</Option>;
          })}
        </Select>
      </Col>
    </Row>
  );
};
