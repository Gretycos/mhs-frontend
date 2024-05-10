/**
 * author: Tsong
 * time: 20/03/2024 19:24
 */
import { useLocation, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import "./PrescriptionHistory.less";
import { Table } from "antd";
import { useNavigate, NavLink } from "react-router-dom";
import { render } from "less";
import {useEffect, useState} from "react";
import {getMyPrescriptionList} from "@/service/prescription/prescription.js";

// dataSource and columns for table
const dataSource = [
  {
    key: "1",
    id: "1",
    date: "2024-03-24 10:00",
    doctor: "Dr. John Doe",
    pharmacy: "Pharmacy A",
    total_price: "3",
  },
  {
    key: "2",
    id: "2",
    date: "2024-02-11 11:00",
    doctor: "Dr. Jane Doe",
    pharmacy: "Pharmacy B",
    total_price: "10",
  },
  {
    key: "3",
    id: "3",
    date: "2024-01-12 12:00",
    doctor: "Dr. Jim Doe",
    pharmacy: "pharmacy C",
    total_price: "5",
  },
];

const PrescriptionHistory = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const { pathname, state } = location;
  // 分页和数据状态
  const [dataState, setDataState] = useState({
    currPage: 1,
    pageSize: 10,
    totalCount: 0,
    dataList: [],
  })

  useEffect(() => {
    const params = {
      page: 1,
      pageSize: 10
    }
    getData(params)
  }, []);

  const getData = async (params) => {
    const {data} = await getMyPrescriptionList(params)
    console.log(data)
    setDataState({
      ...dataState,
      currPage: params.page,
      pageSize: params.pageSize,
      totalCount: data.totalCount,
      dataList: data.list,
    })
  }

  const columns = [
    {
      title: "Ref",
      dataIndex: "prescriId",
      key: "ref",
    },
    {
      title: "Time",
      dataIndex: "prescriTime",
      key: "date",
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
    },
    // {
    //   title: "Pharmacy",
    //   dataIndex: "pharmacy",
    //   key: "pharmacy",
    // },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "price",
    },
    {
      // title: "Look Details",
      dataIndex: "prescriId",
      key: "id",
      render: (text) => {
        return (
          <NavLink to={`${pathname}/${text}`} className="forgot-form-login">
            Look Details
          </NavLink>
        );
      },
    },
  ];

  const onPageChange = async (page, pageSize) => {
    page = page === dataState.currPage ? 1 : page // page相同相当于改了pageSize, 需要返回第一页
    console.log(`page change: ${page}, ${pageSize}`)
    const params = {
      page: page,
      pageSize: pageSize,
    }
    // const data = await getData(params)
    await getData(params)
  }

  return (
    <div className="prescription-page user-framework-container">
      <div className="user-framework-title">{state.title}</div>
      <ArrowBack className="back-icon" onClick={() => navigate(-1)} />
      <Table
          className="prescription-table"
          dataSource={dataState.dataList}
          columns={columns}
          pagination={{
            current: dataState.currPage,
            pageSize: dataState.pageSize,
            total: dataState.totalCount,
            onChange: onPageChange,
          }}
      />
    </div>
  );
};

export default PrescriptionHistory;
