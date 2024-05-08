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

  const columns = [
    {
      title: "Date and Time",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
    },
    {
      title: "Pharmacy",
      dataIndex: "pharmacy",
      key: "pharmacy",
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "price",
    },
    {
      // title: "Look Details",
      dataIndex: "id",
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

  return (
    <div className="prescription-page user-framework-container">
      <div className="user-framework-title">{state.title}</div>
      <ArrowBack className="back-icon" onClick={() => navigate(-1)} />
      <Table dataSource={dataSource} columns={columns} className="table" />
    </div>
  );
};

export default PrescriptionHistory;
