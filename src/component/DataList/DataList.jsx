/**
 * author: Tsong
 * time: 23/03/2024 02:03
 */
import "./DataList.less"
import {useEffect, useState} from "react";
import {Card, List, Pagination} from "antd";
import Selector from "@/component/Selector/Selector.jsx";
import {useNavigate} from "react-router-dom";
import MyDatePicker from "@/component/DatePicker/MyDatePicker.jsx";

const DataList = (props) => {
    const {selectors, getData, path, state, practRole, status} = props
    console.log(selectors[0].options)
    const navigate = useNavigate()
    // 初始化选择器的键值对
    let optionsIni = {}
    selectors[0].options ?
        selectors.map(selector => {
            optionsIni[selector.key] = selector.options[0].value
        })
        :
        optionsIni = {
            startDate: null,
            endDate: null
        }
    // 分页和数据状态
    console.log(optionsIni)
    const [dataState, setDataState] = useState({
        currPage: 1,
        pageSize: 5,
        totalCount: 0,
        dataList: [],
    })
    // 选择器的键值对状态
    const [options, setOptions] = useState(optionsIni)

    useEffect(() => {
        console.log("on mounted")
        const params = {
            ...options,
            page: dataState.currPage,
            pageSize: dataState.pageSize,
            status: status
        }
        getListData(params)
    }, []);

    const getListData = async (params) => {
        const data = await getData(params)
        setDataState({
            ...dataState,
            currPage: data.currPage,
            totalCount: data.totalCount,
            dataList: data.list,
        })
    }

    const onPageChange = async (page, pageSize) => {
        page = page === dataState.currPage ? 1 : page // page相同相当于改了pageSize, 需要返回第一页

        console.log(`page change: ${page}, ${pageSize}`)
        const params = {
            ...options,
            page: page,
            pageSize: pageSize,
            status: status
        }
        const data = await getData(params)
        console.log(data)
        setDataState({
            ...dataState,
            currPage: page,
            pageSize: pageSize,
            totalCount: data.totalCount,
            dataList: data.list,
        })
    }

    const onOptionChange = async (value, key) => {
        console.log(`option change: ${key}: ${value}`)
        setOptions({
            ...options,
            [key]: value,
        })
        const params = {
            ...options,
            [key]: value, // 因为set后不会马上更新，所以只能同步修改要用的值
            page: dataState.currPage,
            pageSize: dataState.pageSize,
            status: status
        }
        const data = await getData(params)
        console.log(data)
        setDataState({
            ...dataState,
            currPage: 1,
            totalCount: data.totalCount,
            dataList: data.list,
        })
    }

    const onDateOptionChange = async (value, key) => {
        console.log(`option change: ${key}`)
        setOptions({
            ...options,
            startDate: key[0],
            endDate:key[1],
        })
        const params = {
            ...options,
            startDate: key[0],
            endDate:key[1], // 因为set后不会马上更新，所以只能同步修改要用的值
            page: dataState.currPage,
            pageSize: dataState.pageSize,
            status: status
        }
        const data = await getData(params)
        console.log(data)
        setDataState({
            ...dataState,
            currPage: 1,
            totalCount: data.totalCount,
            dataList: data.list,
        })
    }

    const dataSelectors = selectors.map((item, idx) => {
        return <Selector autoFocus={true} key={idx} title={item.title} onChange={ (val) => onOptionChange(val, item.key)} options={item.options}/>
    })

    const onClickItem = (id, type) => {
        console.log(`${path}/${id}`)
        navigate(`${path}/${id}`, {state: {...state, type: type}})
    }

    return (
        <div className="data-component-content">
            <div className="data-component-control">
                {selectors[0].options ?
                    dataSelectors
                    :
                    <MyDatePicker title={selectors[0].title} onChange={(val1, val2) => onDateOptionChange(val1, val2)}/>}
            </div>
            <List
                className="data-component-list"
                itemLayout="horizontal"
                dataSource={dataState.dataList}
                split={false}
                renderItem={(item, index) => (
                    <Card
                        className="data-component-list-item"
                        key={index}
                        title={item.time}
                        onClick={() => onClickItem(item.id, item.type)}>
                        <p>{item.title}</p>
                    </Card>
                )}
            />
            <Pagination
                className="data-component-pagination"
                showSizeChanger
                onChange={onPageChange}
                current={dataState.currPage}
                pageSize={dataState.pageSize}
                total={dataState.totalCount}
                pageSizeOptions={[5, 10, 20]}
            />
        </div>
    )
}

export default DataList
