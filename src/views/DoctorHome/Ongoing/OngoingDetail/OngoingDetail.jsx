/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./OngoingDetail.less";
import {
  Button,
  Card,
  Modal,
  Input,
  Select,
  Table,
  InputNumber,
  App,
  DatePicker,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import DetailCard from "@/component/DetailCard/DetailCard.jsx";
import {
  getAppointMedHistory,
  updateMedHistory,
} from "@/service/med/medHistory.js";
import {
  getpractAppointDetail,
  getpractAppointDetails,
  updateStatus,
} from "@/service/appointment/doctorAppointment.js";
import {
  getTestAbleAppointTime,
  getTestpractAppointDetail,
  getTestpractAppointDetails,
  insertTestAppointments,
} from "@/service/appointment/testAppointment.js";
import { insertTestReport } from "@/service/med/testReport.js";
import { addPrescri } from "@/service/prescription/prescription.js";
import { getDrugs } from "@/service/prescription/drug.js";
import dayjs from "dayjs";

const { Meta } = Card;
const { Search } = Input;
const { Column } = Table;

const OngoingDetail = (props) => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { params, state, practRole } = props;
  const time = state.time;
  // console.log(state);
  const { id } = useParams();
  const title =
    practRole === 0 ? "Doctor Appointment Record" : "Test Appointment Record";

  const [detailData, setDetailData] = useState({
    time: "",
    ref: "",
    type: "",
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    doctor: "",
    reason: "",
    medHistoryId: "",
    testId: "",
    result: "",
  });

  const [prescription, setPrescription] = useState();

  const [prescriDrug, setPrescriDrug] = useState();

  const [result, setResult] = useState();

  const [diagnosis, setDiagnosis] = useState();

  const [testSlot, setTestSlot] = useState();

  const [keyword, setKeyword] = useState();

  const [drugList, setDrugList] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const [changingStatus, setChangingStatus] = useState(false);

  const [testAppoints, setTestAppoints] = useState(null);

  const [isDiagModalOpen, setIsDiagModalOpen] = useState(false);
  const [isPrescriModalOpen, setIsPrescriModalOpen] = useState(false);
  const [isDrugModalOpen, setIsDrugModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [drug, setDrug] = useState({});
  const [item, setItem] = useState(1);
  const [daily, setDaily] = useState(1);
  const parseType = (first, second) => {
    let type = "";
    if (practRole === 0) {
      type += "CLINIC - ";
      switch (second) {
        case 0:
          type += "FACE-TO-FACE";
          break;
        case 1:
          type += "TELEPHONE";
          break;
      }
    } else {
      type += "TEST - ";
      switch (second) {
        case 0:
          type += "EyeSight";
          break;
        case 1:
          type += "Height and Weight";
          break;
        case 2:
          type += "Blood Pressure";
          break;
        case 3:
          type += "Blood Sugar";
          break;
        case 4:
          type += "Audiometry";
          break;
      }
    }
    return type;
  };

  const parseStatus = (status) => {
    let s;
    switch (status) {
      case 0:
        s = "unfulfilled";
        break;
      case 1:
        s = "accepted";
        break;
      case 2:
        s = "transferred";
        break;
      case 3:
        s = "rejected";
        break;
      case 4:
        s = "completed";
        break;
      default:
        s = "unfulfilled";
        break;
    }
    return s;
  };

  const testType = [
    {
      value: 0,
      label: "EyeSight",
    },
    {
      value: 1,
      label: "Height and Weight",
    },
    {
      value: 2,
      label: "Blood Pressure",
    },
    {
      value: 3,
      label: "Blood Sugar",
    },
    {
      value: 4,
      label: "Audiometry",
    },
  ];

  useEffect(() => {
    getDetailData();

    //getTestSlot()
    setTestSlot([]);

    setDrugList([]);

    setPrescription([]);

    setTestAppoints(null);
  }, []);

  const getDetailData = async () => {
    // 用id去查数据
    const params1 = {
      appointId: id,
    };

    const res1 =
      practRole === 0
        ? await getpractAppointDetails(params1)
        : await getTestpractAppointDetails(params1);

    console.log(res1.data.testAppointVOs);
    setDetailData({
      time: time,
      ref: res1.data.appointmentId,
      firstName: res1.data.firstName,
      lastName: res1.data.lastName,
      doctor: res1.data.doctor,
      status: parseStatus(res1.data.status),
      type: parseType(state.type, res1.data.type),
      birthday: res1.data.birthday,
      gender: res1.data.gender,
      reason: res1.data.reason,
      medHistoryId: res1.data.medHistoryId,
      testId: res1.data.testId,
      result: res1.data.result,
      patientId: res1.data.patientId,
      practId: res1.data.practId,
    });

    setDiagnosis(res1.data.diagnosis);
    // console.log(res1.data)
    console.log(res1.data);
    setTestAppoints(res1.data.testAppointVOs);
    setTotalPrice(0);
  };

  const getTestSlot = async () => {
    const { data } = getTestAbleAppointTime();

    // console.log(data)
  };

  const addTestAppoint = async () => {
    const params = {
      patientId: detailData.patientId,
      practId: testParams.doctorId,
      doctorAppointId: id,
      testAppointTime: `${testParams.testDate} ${testParams.testTime}`,
      testType: testParams.testType,
    };
    // console.log(params)
    const res = insertTestAppointments(params);
    message.success("submit succeed", 2);
  };

  const insertDiagnosis = async () => {
    const params = {
      testAppointId: id,
      patientId: detailData.patientId,
      practId: detailData.practId,
      testType: state.type,
      result: diagnosis,
      diagnosis: diagnosis,
      medHistoryId: detailData.medHistoryId,
      totalItemPrice: totalPrice,
      prescriDrugList: prescription,
    };
    // console.log(params, prescription.length, diagnosis)
    practRole === 0
      ? prescription.length === 0
        ? await updateMedHistory(params)
        : await addPrescri(params)
      : await insertTestReport(params);
    message.success("succeed", 2);
    setTimeout(() => {
      // 等两秒才刷新出来
      navigate("/doctor/ongoing", { state: state, replace: true });
      setChangingStatus(false);
    }, 2000);
  };

  const addPrescriptionList = () => {
    let data = prescription;
    let total = totalPrice;
    // console.log(total)

    if (
      data.find((result) => {
        return result.bnfCode === drug.bnfCode;
      })
    ) {
      data.map((result) => {
        // console.log(result, drug.price * item, drug)
        if (result.bnfCode === drug.bnfCode) {
          // console.log(total, result.totalItemPrice, drug.price * item, item)
          total = total - result.totalItemPrice + drug.price * item;
          // console.log(total)
          result.item = item;
          result.adqusage = daily;
          result.totalQuantity = drug.quantity * item;
          result.totalItemPrice = drug.price * item;
        }
      });
    } else {
      total = total + drug.price * item;
      data.push({
        bnfCode: drug.bnfCode,
        bnfName: drug.bnfName,
        totalQuantity: drug.quantity * item,
        totalItemPrice: drug.price * item,
        item: item,
        adqusage: daily,
        // action: <button onClick={()=>removeData(drug.bnfCode)}>remove</button>
      });
    }

    // console.log(total)
    setPrescription([...data]);
    setTotalPrice(total);
  };

  const showDiagModal = () => {
    setIsDiagModalOpen(true);
  };
  const showPrescriModal = () => {
    setIsPrescriModalOpen(true);
  };

  const showDrugModal = (record) => {
    // console.log(record)
    // console.log(drugList)
    // console.log(e.target.getAttribute("key"))
    // console.log(idx)
    // console.log(drugList)
    setDrug(record);
    // console.log(index, drugList.find(item => {return item.index === index}))
    setIsDrugModalOpen(true);
  };
  const showTestModal = () => {
    setIsTestModalOpen(true);
  };

  const handleDiagOk = async () => {
    // console.log(diagnosis)
    await insertDiagnosis();
    setIsDiagModalOpen(false);
  };

  const handlePrescriOk = () => {
    setIsPrescriModalOpen(false);
  };

  const handleDrugOk = () => {
    addPrescriptionList();
    setItem(1);
    setDaily(1);
    setIsDrugModalOpen(false);
  };

  const handleTestOk = async () => {
    await addTestAppoint();
    setTimeout(() => {
      setIsTestModalOpen(false);
      navigate(0, {replace: true})
    }, 2000)
  };

  const handleDiagCancel = () => {
    setIsDiagModalOpen(false);
  };

  const handlePrescriCancel = () => {
    setIsPrescriModalOpen(false);
  };

  const handleDrugCancel = () => {
    setIsDrugModalOpen(false);
  };

  const handleTestCancel = () => {
    setIsTestModalOpen(false);
  };

  const handleItemChange = (value) => {
    setItem(value);
  };

  const handleDailyChange = (value) => {
    setDaily(value);
  };

  const handleInputChange = (e) => {
    setDiagnosis(e.target.value);
  };

  const onSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const onPrescriSearch = async () => {
    const params = {
      keyword: keyword,
    };
    const { data } = await getDrugs(params);
    // console.log(prescription)
    // let drugs = []
    // var indx = 1;
    // console.log(indx)
    // const drugs  = data.map((d, idx) => {
    //     return {
    //         index: idx,
    //         bnf_code: d.bnfCode,
    //         bnf_name: d.bnfName,
    //         quantity: d.quantity,
    //         price: d.price,
    //         action: <Button key={idx} onClick={() => showDrugModal(idx)}>select</Button>
    //     }
    // })
    // console.log(data)
    // data.forEach(d => {
    //     drugs.push({
    //         index:indx,
    //         bnf_code: d.bnfCode,
    //         bnf_name: d.bnfName,
    //         quantity: d.quantity,
    //         price: d.price,
    //         action: <Button key={indx} onClick={indx => showDrugModal(e)}>select</Button>
    //     })
    //     console.log(indx, drugs)
    //     indx += 1
    // })
    setDrugList(data);
  };

  const removeData = (record) => {
    // console.log(record, prescription, totalPrice)
    const total = totalPrice - record.totalItemPrice;
    const data = prescription.filter((item) => item.bnfCode !== record.bnfCode);
    //prescription.filter(item => item.bnfCode===bnfCode).price;
    //let data = prescription.filter(item => item.bnfCode!== bnfCode);
    // console.log(data, total, prescription)

    setPrescription([...data]);
    setTotalPrice(total);
  };

  const drugColumns = [
    {
      title: "BNF_Code",
      dataIndex: "bnfCode",
      key: "BNF_code",
    },
    {
      title: "BNF_Name",
      dataIndex: "bnfName",
      key: "BNF_name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (test, record) => (
        <Button onClick={() => showDrugModal(record)}>select</Button>
      ),
    },
  ];

  const diagModal = () => {
    return (
      <>
        <Modal
          open={isDiagModalOpen}
          centered
          width={1000}
          onCancel={handleDiagCancel}
          title={<p className="ongoing-detail-card-content-font1">Diagnosis</p>}
          footer={[
            <div className="ongoing-detail-button-container">
              <Button
                size={"large"}
                className="ongoing-detail-button"
                onClick={handleDiagOk}
              >
                Submit
              </Button>
            </div>,
          ]}
        >
          <div className="ongoing-detail-modal-container">
            <div className="ongoing-detail-input-container">
              <Input.TextArea
                className="ongoing-detail-input"
                rows={10}
                placeholder="please enter diagnosis"
                value={diagnosis}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
        </Modal>
      </>
    );
  };

  const prescriColumns = [
    {
      title: "BNF_Code",
      dataIndex: "bnfCode",
      key: "BNF_code",
    },
    {
      title: "BNF_Name",
      dataIndex: "bnfName",
      key: "BNF_name",
    },
    {
      title: "TotalQuantity",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
    },
    {
      title: "Price",
      dataIndex: "totalItemPrice",
      key: "totalItemPrice",
    },
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Daily Dose",
      dataIndex: "adqusage",
      key: "adqusage",
    },
    {
      title: "Action",
      key: "action",
      render: (test, record) => (
        <Button onClick={() => removeData(record)}>remove</Button>
      ),
    },
  ];

  const prescriModal = () => {
    return (
      <>
        <Modal
          open={isPrescriModalOpen}
          centered
          width={1000}
          onCancel={handlePrescriCancel}
          title={
            <p className="ongoing-detail-card-content-font1">Prescription</p>
          }
          footer={[
            <div className="ongoing-detail-button-container">
              <Button
                size={"large"}
                className="ongoing-detail-button"
                onClick={handlePrescriOk}
              >
                Save
              </Button>
            </div>,
          ]}
        >
          <div className="ongoing-detail-modal-container">
            <div className="ongoing-detail-select-container" key={0}>
              <Search
                className="ongoing-detail-search"
                placeholder="search drugs by BNF name"
                onChange={(e) => onSearchChange(e)}
                onSearch={(e) => onPrescriSearch(e)}
                enterButton
              />
            </div>
            <div className="ongoing-detail-list-container" key={1}>
              <Table
                columns={drugColumns}
                dataSource={drugList}
                className="ongoing-table-style"
              >
                {/*<Column title="BNF_Code" dataIndex="bnf_code" key="BNF_code"/>*/}
                {/*<Column title="BNF_Name" dataIndex="bnf_name" key="BNF_name"/>*/}
                {/*<Column title="Quantity" dataIndex="quantity" key="quantity"/>*/}
                {/*<Column title="Price" dataIndex="price" key="price"/>*/}
                {/*<Column title="Action" dataIndex="action" key="action"/>*/}
              </Table>
            </div>
            <div className="ongoing-detail-list-container" key={2}>
              <Table
                columns={prescriColumns}
                dataSource={prescription}
                className="ongoing-table-style"
              >
                {/*<Column title="BNF_Code" dataIndex="bnfCode" key="BNF_code"/>*/}
                {/*<Column title="BNF_Name" dataIndex="bnfName" key="BNF_name"/>*/}
                {/*<Column title="TotalQuantity" dataIndex="totalQuantity" key="totalQuantity"/>*/}
                {/*<Column title="Price" dataIndex="totalItemPrice" key="totalItemPrice"/>*/}
                {/*<Column title="Item" dataIndex="item" key="item"/>*/}
                {/*<Column title="Daily" dataIndex="adqusage" key="adqusage"/>*/}
                {/*<Column title="Action" dataIndex="action" key="action"/>*/}
              </Table>
            </div>
            <div>TotalPrice: {totalPrice}</div>
          </div>
        </Modal>
      </>
    );
  };

  const drugModal = () => {
    //console.log(drug, item, daily)
    return (
      <>
        <Modal
          open={isDrugModalOpen}
          centered
          width={1000}
          onCancel={handleDrugCancel}
          title={
            <p className="ongoing-detail-card-content-font1">{drug.bnfName}</p>
          }
          footer={[
            <div className="ongoing-detail-button-container">
              <Button
                size={"large"}
                className="ongoing-detail-button"
                onClick={handleDrugOk}
              >
                Confirm
              </Button>
            </div>,
          ]}
        >
          <div className="ongoing-detail-modal-container">
            <div className="ongoing-detail-select-container" key={1}>
              <p className="ongoing-detail-card-content-font1">Drug Items</p>
              <InputNumber
                className="ongoing-detail-select-tools"
                min={1}
                max={99}
                defaultValue={item}
                value={item}
                changeOnWheel
                onChange={handleItemChange}
              />
            </div>
            <div className="ongoing-detail-select-container" key={2}>
              <p className="ongoing-detail-card-content-font1">Daily Dose</p>
              <InputNumber
                className="ongoing-detail-select-tools"
                min={1}
                max={99}
                defaultValue={daily}
                value={daily}
                changeOnWheel
                onChange={handleDailyChange}
              />
            </div>
          </div>
        </Modal>
      </>
    );
  };

  const [testParams, setTestParams] = useState({
    testDate: null,
    testType: null,
    doctorId: null,
    testTime: null,
  });

  const onTestAppointTypeChange = (value) => {
    // console.log(value)
    setTestParams({
      ...testParams,
      testType: value,
    });
  };

  const onTestAppointDateChange = (date) => {
    // console.log(date)
    setTestParams({
      ...testParams,
      testDate: date.format("DD-MM-YYYY"),
    });
  };

  const onTestSlotFocus = async () => {
    const params = {
      testDate: testParams.testDate,
    };
    // console.log(params)
    const { data } = await getTestAbleAppointTime(params);
    data.sort((a, b) => {
      return dayjs(a.time, "HH:mm").isAfter(dayjs(b.time, "HH:mm")) ? 1 : -1;
    });
    // console.log(data)
    const options = data.map((item, idx) => {
      return {
        id: idx,
        value: `${item.doctorId} ${item.time}`,
        label: `${item.doctor} [${item.time}]`,
      };
    });
    setTestSlot(options);
  };

  const onTestSlotSelected = (value) => {
    const values = value.split(" ");
    setTestParams({
      ...testParams,
      doctorId: values[0],
      testTime: values[1],
    });
    // console.log(testParams)
  };

  const testModal = () => {
    const disabledDate = (current) => {
      // Can not select days before today and today
      return current < dayjs().startOf("day");
    };

    return (
      <>
        <Modal
          open={isTestModalOpen}
          centered
          width={1000}
          onCancel={handleTestCancel}
          title={
            <p className="ongoing-detail-card-content-font1">Additional Test</p>
          }
          footer={[
            <div className="ongoing-detail-button-container">
              <Button
                size={"large"}
                className="ongoing-detail-button"
                onClick={handleTestOk}
              >
                Submit
              </Button>
            </div>,
          ]}
        >
          <div className="ongoing-detail-modal-container">
            <div className="ongoing-detail-select-container" key={1}>
              <p className="ongoing-detail-card-content-font1">Type</p>
              <Select
                defaultValue="--choose test type--"
                className="ongoing-detail-select-tools"
                options={testType}
                onChange={(value) => onTestAppointTypeChange(value)}
                size={"large"}
              />
            </div>
            <div className="ongoing-detail-select-container" key={2}>
              <p className="ongoing-detail-card-content-font1">Date</p>
              <DatePicker
                // defaultValue="--choose test slot--"
                className="ongoing-detail-select-tools"
                // options={testSlot}
                disabledDate={disabledDate}
                size={"large"}
                onChange={(date) => onTestAppointDateChange(date)}
              />
            </div>
            {testParams.testType !== null && testParams.testDate !== null ? (
              <div className="ongoing-detail-select-container" key={3}>
                <p className="ongoing-detail-card-content-font1">Test</p>
                <Select
                  defaultValue="--choose test slot--"
                  className="ongoing-detail-select-tools"
                  options={testSlot}
                  size={"large"}
                  onFocus={onTestSlotFocus}
                  onSelect={onTestSlotSelected}
                />
              </div>
            ) : null}
          </div>
        </Modal>
      </>
    );
  };

  return (
    <div className="ongoing-detail-page-container">
      <ArrowBack className="back-icon" onClick={() => navigate(-1)} />
      <DetailCard
        params={params}
        detailData={detailData}
        result={result}
        practRole={practRole}
        title={title}
        testAppoints={testAppoints}
      />
      <div className="ongoing-detail-content-container">
        <div className="ongoing-detail-button-container">
          <Button
            size={"large"}
            className="ongoing-detail-button"
            onClick={showDiagModal}
          >
            Diagnosis
          </Button>
          {practRole === 0 ? (
            <>
              <Button
                size={"large"}
                className="ongoing-detail-button"
                onClick={showPrescriModal}
              >
                Prescription
              </Button>
              <Button
                size={"large"}
                className="ongoing-detail-button"
                onClick={showTestModal}
              >
                Test
              </Button>
            </>
          ) : null}
        </div>
      </div>
      {diagModal()}
      {prescriModal()}
      {drugModal()}
      {testModal()}
    </div>
  );
};

export default OngoingDetail;
