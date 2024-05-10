/**
 * author: Tsong
 * time: 20/03/2024 18:25
 */
import "./BookAppointment.less";
import {Form, Select, Input, Space, Button, DatePicker, Table, App} from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const { Option } = Select;
const { TextArea } = Input;
import { ArrowBack } from "@mui/icons-material";
import "../../../component/UserFramework/UserFramework.less";
import {createDoctorAppointment, getAbleAppointTime} from "@/service/appointment/doctorAppointment.js";
import {store} from "@/redux/store.js";
import dayjs from "dayjs";

// dataSource
const layout = {
  labelCol: {
    span: 8,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

// const doctorOptions = [
//   {
//     value: "John Doe",
//     label: "John Doe",
//   },
//   {
//     value: "Jane Doe",
//     label: "Jane Doe",
//   },
//   {
//     value: "Jim Doe",
//     label: "Jim Doe",
//   },
// ];

const typeOptions = [
  { value: 0, label: "Face to Face" },
  { value: 1, label: "Phone call" },
];

// const availableTime = [
//   {
//     date: "2024-04-03",
//     time: "10:00",
//     doctor: "John Doe",
//     type: "Face to Face",
//     key: "1",
//   },
//   {
//     date: "2024-04-05",
//     time: "11:00",
//     doctor: "Jane Doe",
//     type: "Face to Face",
//     key: "2",
//   },
//   {
//     date: "2024-04-05",
//     time: "12:00",
//     doctor: "Jim Doe",
//     type: "Face to Face",
//     key: "3",
//   },
//   {
//     date: "2024-04-06",
//     time: "12:00",
//     doctor: "Jim Doe",
//     type: "Face to Face",
//     key: "4",
//   },
// ];

// const confirmData = {
//   doctor: "John Doe",
//   date: "2024-04-03",
//   time: "10:00",
//   type: "Face to Face",
//   location: `SO17 1BJ. University Health Service.
// Building 48, University of Southampton.`,
//   userID: "U123456",
//   note: "",
// };

const BookAppointment = () => {

  const {message} = App.useApp()
  const [form] = Form.useForm();
  const [searchRes, setSearchRes] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [appointType, setAppointType] = useState(0)
  const [availableTimeList, setAvailableTimeList] = useState([])

  const BookTime = (record) => {
    // console.log("Booked !");
    console.log(record)
    const confirmData = {
      doctorId: record.doctorId,
      doctor: record.doctor,
      date: record.date,
      time: record.time,
      type: appointType,
//       location: `SO17 1BJ. University Health Service.
// Building 48, University of Southampton.`,
      patientId: store.getState()?.globalSlice.userId,
      note: "",
    }
    setConfirm(confirmData);
  };

  const columns = [
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
    // {
    //   title: "Type",
    //   dataIndex: "type",
    //   key: "type",
    // },
    {
      dataIndex: "book",
      key: "book",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => BookTime(record)}>
            Book
          </Button>
        </Space>
      ),
    },
  ];

  const inputTxt = (e) => {
    console.log(e.target.value);
    setConfirm({ ...confirm, note: e.target.value });
  };

  // const onDateChange = (value) => {
  //   // console.log(value);
  // };

  // const onDoctorChange = (value) => {
  //   // switch (value) {
  //   //   case "male":
  //   //     form.setFieldsValue({
  //   //       note: "Hi, man!",
  //   //     });
  //   //     break;
  //   //   case "female":
  //   //     form.setFieldsValue({
  //   //       note: "Hi, lady!",
  //   //     });
  //   //     break;
  //   //   case "other":
  //   //     form.setFieldsValue({
  //   //       note: "Hi there!",
  //   //     });
  //   //     break;
  //   //   default:
  //   // }
  // };

  const onFinish = async (values) => {
    // 提交表单
    console.log(values.date.format("DD-MM-YYYY"));
    const params = {
      date: values.date.format("DD-MM-YYYY"),
    }
    const {data} = await getAbleAppointTime(params)
    console.log(data)
    setAvailableTimeList(data)
    setSearchRes(true);
  };

  const SubmitAppointment = async () => {
    console.log(confirm);
    const params = {
      patientId: confirm.patientId,
      practId: confirm.doctorId,
      doctorAppointType: confirm.type,
      doctorAppointTime: `${confirm.date} ${confirm.time}`,
      reason: confirm.note
    }
    console.log(params)
    const {data} = await createDoctorAppointment(params)
    if (data) {
      message.success('book succeeded', 2)
      navigate("/patient")
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const onTypeChange = (e) => {
    console.log(e)
    setAppointType(e)
  }


  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 返回上一页
  };

  const disabledDate = (current) => {
    return current < dayjs().startOf('day');
  }

  if (confirm) {
    return (
      <div className="book-appointment-page user-framework-container">
        <div className="user-framework-title">
          Book for a doctor Appointment
        </div>

        <div className="confirm-box">
          <p className="description"> Please check before booking.</p>
          <div className="box">
            <div className="item">
              <p className="item-title">Details:</p>
              <div className="detail-box">
                <p>
                  <span>Time:</span> {confirm.date} {confirm.time}
                </p>
                <p>
                  <span>Doctor:</span> {confirm.doctor}
                </p>
                <p>
                  <span>Type:</span> {confirm.type === 0? "Face-to-Face" : "Telephone"}
                </p>
                {/*<p>*/}
                {/*  <span>Location:</span> {confirm.location}*/}
                {/*</p>*/}
              </div>
            </div>
            <div className="item">
              <p className="item-title">Have Anything to Say?</p>
              <TextArea
                showCount
                maxLength={120}
                onBlur={inputTxt}
                placeholder="Please leave your message here"
                style={{
                  height: 120,
                  resize: "none",
                }}
              />
              <div className="btn-box">
                <Button htmlType="button" onClick={goBack}>
                  Cancel
                </Button>
                <Button type="primary" className="btn" onClick={SubmitAppointment}>
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="book-appointment-page user-framework-container">
        <div className="user-framework-title">
          Book for a doctor Appointment
        </div>
        <Link to="/patient">
          <ArrowBack className="back-icon" />
        </Link>
        <div className="select-box">
          <p className="description"> Please select your requirements:</p>
          <div className="content">
            <Form
              {...layout}
              form={form}
              name="control-hooks"
              onFinish={onFinish}
              className="form"
            >
              <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                <DatePicker
                    disabledDate={disabledDate}
                />
                {/* <TimePicker /> */}
              </Form.Item>
              <Form.Item name="type" label="Type" rules={[]}>
                <Select
                  placeholder="Select appointment type"
                  onChange={onTypeChange}
                  allowClear
                >
                  {typeOptions.map((type) => {
                    return (
                      <Option value={type.value} key={type.value}>
                        {type.label}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              {/*<Form.Item name="doctor" label="Doctor" rules={[]}>*/}
              {/*  <Select*/}
              {/*    placeholder="Select a doctor"*/}
              {/*    onChange={onDoctorChange}*/}
              {/*    allowClear*/}
              {/*  >*/}
              {/*    {doctorOptions.map((doctor) => {*/}
              {/*      return (*/}
              {/*        <Option key={doctor.value} value={doctor.value}>*/}
              {/*          Dr. {doctor.value}*/}
              {/*        </Option>*/}
              {/*      );*/}
              {/*    })}*/}
              {/*  </Select>*/}
              {/*</Form.Item>*/}

              {/* <Form.Item name="note" label="Note">
                <Input placeholder="What else do you want to say" />
              </Form.Item> */}
              <Form.Item {...tailLayout} className="btn-group">
                <Space>
                  <Button htmlType="button" onClick={onReset}>
                    Reset
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Search Availability
                  </Button>
                </Space>
              </Form.Item>
            </Form>
            {searchRes && (
              <Table
                className="available-time"
                dataSource={availableTimeList}
                columns={columns}
                pagination={{
                  defaultCurrent: 1,
                  pageSize: 5,
                  total: availableTimeList.length,
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default BookAppointment;
