/**
 * author: Tsong
 * time: 20/03/2024 19:24
 */
import { useLocation, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import "./PrescriptionDetail.less";
import { Table } from "antd";
import { useNavigate, NavLink } from "react-router-dom";
import { render } from "less";
import {useEffect, useState} from "react";
import {getMyPrescriptionDetail} from "@/service/prescription/prescription.js";

// dataSource and columns for table
const dataSource = [
  {
    key: "1",
    id: "1",
    medicine: "Paracetamol",
    total_quantity: 6,
    unit: "tablet",
    daily_usage: 1,
    med_price: 6,
  },
  {
    key: "2",
    id: "2",
    medicine: "Cough Syrup",
    total_quantity: 1,
    unit: "bottle",
    daily_usage: 3,
    med_price: 9,
  },
  {
    key: "3",
    id: "3",
    medicine: "Aspirin",
    total_quantity: 3,
    unit: "tablet",
    daily_usage: 4,
    med_price: 3,
  },
];

const PrescriptionDetail = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const { pathname, state } = location;
  const {id} = params
  const [dataList, setDataList] = useState([])

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    const params = {
      prescriId: id,
    }
    const {data} = await getMyPrescriptionDetail(params)
    setDataList(data)
  }

  const columns = [
    {
      title: "Medicine Name",
      dataIndex: "bnfName",
      key: "medicine",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Total Quantity",
      key: "totalQuantity",
      render: (text, record) => (
          record.quantity * record.item
      )
    },
    {
      title: "Daily Usage",
      dataIndex: "adqusage",
      key: "adqusage",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Total Item Price",
      dataIndex: "totalItemPrice",
      key: "totalPrice",
    },
  ];

  return (
    <div className="prescription-page user-framework-container">
      <div className="user-framework-title">Prescription Details</div>
      <ArrowBack className="back-icon" onClick={() => navigate(-1)} />
      <div className="prescription-detail-container">
        <div className="prescription-ref">{`Ref: ${id}`}</div>
        <Table dataSource={dataList} columns={columns} className="table" pagination={false}/>
      </div>

    </div>
  );
};

export default PrescriptionDetail;
