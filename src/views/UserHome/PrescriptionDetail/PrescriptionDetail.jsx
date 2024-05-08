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

  const columns = [
    {
      title: "Medicine Name",
      dataIndex: "medicine",
      key: "medicine",
    },
    {
      title: "Total quantity",
      dataIndex: "total_quantity",
      key: "total_quantity",
    },
    // {
    //   title: "Unit",
    //   dataIndex: "unit",
    //   key: "unit",
    // },
    {
      title: "Daily Usage",
      dataIndex: "daily_usage",
      key: "daily_usage",
    },
    {
      title: "Total Price",
      dataIndex: "med_price",
      key: "price",
    },
  ];

  return (
    <div className="prescription-page user-framework-container">
      <div className="user-framework-title">Prescription Details</div>
      <ArrowBack className="back-icon" onClick={() => navigate(-1)} />
      <Table dataSource={dataSource} columns={columns} className="table" />
    </div>
  );
};

export default PrescriptionDetail;
