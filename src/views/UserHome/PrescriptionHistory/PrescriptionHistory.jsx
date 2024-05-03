/**
 * author: Tsong
 * time: 20/03/2024 19:24
 */
import { useLocation, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import "./PrescriptionHistory.less";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";

// dataSource and columns for table
const dataSource = [
  {
    key: "1",
    id: "PX110345C",
    date: "2024-03-24",
    time: "10:00",
    doctor: "Dr. John Doe",
    diagnosis: "Fever",
    medicine: "Paracetamol",
    quantity: "21",
    unit: "tablet",
    note: "Take after meal",
  },
  {
    key: "2",
    id: "PX110346D",
    date: "2024-02-11",
    time: "11:00",
    doctor: "Dr. Jane Doe",
    diagnosis: "Cold",
    medicine: "Cough Syrup",
    quantity: "1",
    unit: "bottle",
    note: "Take before sleep",
  },
  {
    key: "3",
    id: "PX110347E",
    date: "2024-01-12",
    time: "12:00",
    doctor: "Dr. Jim Doe",
    diagnosis: "Headache",
    medicine: "Aspirin",
    quantity: "14",
    unit: "tablet",
    note: "Take with water",
  },
];

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Doctor",
    dataIndex: "doctor",
    key: "doctor",
  },
  {
    title: "Diagnosis",
    dataIndex: "diagnosis",
    key: "diagnosis",
  },
  {
    title: "Medicine",
    dataIndex: "medicine",
    key: "medicine",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
  },
  {
    title: "Note",
    dataIndex: "note",
    key: "note",
  },
];

const PrescriptionHistory = () => {
  const location = useLocation();
  const params = useParams();

  const navigate = useNavigate();

  const { pathname, state } = location;

  return (
    <div className="prescription-page user-framework-container">
      <div className="user-framework-title">{state.title}</div>
      <ArrowBack className="back-icon" onClick={() => navigate(-1)} />
      <Table dataSource={dataSource} columns={columns} className="table" />
    </div>
  );
};

export default PrescriptionHistory;
