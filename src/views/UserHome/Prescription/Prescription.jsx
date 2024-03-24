import {
  Form,
  Select,
  Input,
  Space,
  Button,
  DatePicker,
  TimePicker,
  Table,
} from "antd";
import { useState } from "react";
import "./Prescription.less";
const { Option } = Select;
const { TextArea } = Input;

// dataSource and columns for table

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

const typeOptions = [
  { value: "Surgery", label: "surgery" },
  { value: "test", label: "test" },
  { value: "vaccine", label: "vaccine" },
];

const availableTime = [
  {
    date: "2024-04-03",
    time: "10:00",
    doctor: "John Doe",
    type: "test",
    key: "1",
  },
  {
    date: "2024-04-05",
    time: "11:00",
    doctor: "Jane Doe",
    type: "test",
    key: "2",
  },
  {
    date: "2024-04-05",
    time: "12:00",
    doctor: "Jim Doe",
    type: "test",
    key: "3",
  },
  {
    date: "2024-04-06",
    time: "12:00",
    doctor: "Jim Doe",
    type: "test",
    key: "4",
  },
];

const confirmData = {
  doctor: "John Doe",
  date: "2024-04-03",
  time: "10:00",
  type: "Face to Face",
  location: `SO17 1BJ. University Health Service. 
  Building 48, University of Southampton.`,
  userID: "U123456",
  note: "",
};

const Prescription = () => {
  const [form] = Form.useForm();
  const [searchRes, setSearchRes] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const BookTime = () => {
    console.log("Booked !");
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
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      dataIndex: "book",
      key: "book",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => BookTime()}>
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

  const onDateChange = (value) => {
    // console.log(value);
  };

  const onDoctorChange = (value) => {
    // switch (value) {
    //   case "male":
    //     form.setFieldsValue({
    //       note: "Hi, man!",
    //     });
    //     break;
    //   case "female":
    //     form.setFieldsValue({
    //       note: "Hi, lady!",
    //     });
    //     break;
    //   case "other":
    //     form.setFieldsValue({
    //       note: "Hi there!",
    //     });
    //     break;
    //   default:
    // }
  };

  const onFinish = (values) => {
    console.log(values);
    setSearchRes(true);
  };

  const SubmitAppointment = () => {
    console.log("Appointment Submitted!");
    console.log(confirm);
  };

  const onReset = () => {
    form.resetFields();
  };

  if (confirm) {
    return (
      <div className="book-appointment-page">
        <p className="title">Book for a surgery, test or vaccine</p>
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
                <span>Type:</span> {confirm.type}
              </p>
              <p>
                <span>Location:</span> {confirm.location}
              </p>
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
            <Button type="primary" className="btn" onClick={SubmitAppointment}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="book-appointment-page">
        <p className="title">Book for a surgery, test or vaccine</p>
        <p className="description"> Please select your requirements:</p>
        <div className="content">
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            className="form"
          >
            <Form.Item name="type" label="Type" rules={[]}>
              <Select
                placeholder="Select type"
                onChange={onDateChange}
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
            <Form.Item name="date" label="Date" rules={[{ required: true }]}>
              <DatePicker />
              {/* <TimePicker /> */}
            </Form.Item>
            <Form.Item {...tailLayout} className="btn-group">
              <Space>
                <Button type="primary" htmlType="submit">
                  Search Availability
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
          {searchRes && (
            <Table
              className="available-time"
              dataSource={availableTime}
              columns={columns}
            ></Table>
          )}
        </div>
      </div>
    );
  }
};

export default Prescription;
