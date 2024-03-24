/**
 * author: Tsong
 * time: 23/03/2024 23:19
 */
import "./UserInfo.less"
import {ArrowBack} from "@mui/icons-material";
import {App, Button, Col, DatePicker, Form, Input, Row, Select} from "antd";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {updateInfo} from "@/service/user/user.js";
import {useEffect, useState} from "react";
import {today, ukCity} from "@/common/js/utils.js";
import {validatePostcode} from "@/common/js/formValidator/validator.js";

const UserInfo = () => {
    const navigate = useNavigate()
    const {message} = App.useApp()

    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [iniValues, setIniValues] = useState({
        lastName: "",
        firstName: "",
        dateOfBirth: "",
        address1: "",
        address2: "",
        city: "",
        postcode: "",
        email: "",
    })

    useEffect(() => {
        // 查询个人信息
        const values = {
            lastName: "Yaocong",
            firstName: "Huang",
            dateOfBirth: dayjs("2022-01-01", "YYYY-MM-DD"),
            address1: "West Park Road",
            address2: "Mayflower A",
            city: "Southampton",
            postcode: "SO15 1DP",
            email: "yh25n23@soton.ac.uk",
        }
        form.setFieldsValue(values)
        setIniValues({
            ...values,
            dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD")
        })
    }, []);

    // 选择器列表
    const cityList = ukCity.map(city => {
        return {
            label: city,
            value: city,
        }
    });

    // 表单规则
    const rules = {
        lastName: [
            {
                required: true,
                message: 'Please input your last name',
            },
            {
                max: 20,
                message: 'The length should be less than 20',
            },
        ],
        firstName: [
            {
                required: true,
                message: 'Please input your first name',
            },
            {
                max: 20,
                message: 'The length should be less than 20',
            },
        ],
        dateOfBirth: [
            {
                required: true,
                message: 'Please select your date of birth',
            },
        ],
        address1: [
            {
                required: true,
                message: 'Please input your street',
            },
            {
                max: 30,
                message: 'The length should be less than 30',
            },
        ],
        address2: [
            {
                required: false
            },
            {
                max: 30,
                message: 'The length should be less than 30',
            },
        ],
        city: [
            {
                required: true,
                message: 'Please select your city',
            },
        ],
        postcode: [
            {
                required: true,
                message: 'Please input your postcode',
            },
            {
                validator: validatePostcode
            },
        ],
        email: [
            {
                required: true,
                message: 'Please input your email',
            },
            {
                type: 'email',
                message: 'The input is not valid email'
            }
        ],
    }

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        console.log(iniValues)
        values.dateOfBirth = values.dateOfBirth.format("YYYY-MM-DD")
        let isChanged = false
        for (let key in values){
            if (values[key] !== iniValues[key]){
                isChanged = true
                break
            }
        }
        console.log(isChanged)
        if (!isChanged){
            message.error("No information updated", 2)
        }else{
            // setLoading(true)
            // const params = {
            //     lastName: values.lastName,
            //     firstName: values.firstName,
            //     dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
            //     address1: values.address1,
            //     address2: values.address2,
            //     city: values.city,
            //     postcode: values.postcode,
            //     email: values.email,
            // }
            // const {data} = await updateInfo(params)
            message.success('Successfully update your information', 2)
            // // 回主页
            // navigate(0)
            // setLoading(false)
        }
    }

    return (
        <div className="userinfo-container">
            <div className="userinfo-title">
                Personal Information
            </div>
            <ArrowBack className="back-icon" onClick={() => navigate(-1)}/>
            <Form
                form={form}
                name="normal_register"
                className="userinfo-form"
                onFinish={onFinish}
                labelWrap={true}
            >
                <Row
                    justify="space-between"
                    gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                    }}
                >
                    <Col span={12}>
                        <Form.Item
                            className="userinfo-form-item"
                            name="lastName"
                            rules={rules.lastName}
                            validateTrigger="onBlur"
                            label="Last Name"
                            validateFirst={true}
                        >
                            <Input
                                placeholder="Last Name"
                            />
                        </Form.Item>

                        <Form.Item
                            className="userinfo-form-item"
                            name="firstName"
                            rules={rules.firstName}
                            validateTrigger="onBlur"
                            label="First Name"
                            validateFirst={true}
                        >
                            <Input
                                placeholder="First Name"
                            />
                        </Form.Item>

                        <Form.Item
                            className="userinfo-form-item"
                            name="dateOfBirth"
                            rules={rules.dateOfBirth}
                            validateTrigger="onBlur"
                            label="Date of Birth"
                        >
                            <DatePicker
                                className="userinfo-form-picker"
                                maxDate={dayjs(today(), "YYYY-MM-DD")}
                            />
                        </Form.Item>

                        <Form.Item
                            className="userinfo-form-item"
                            name="email"
                            rules={rules.email}
                            validateTrigger="onBlur"
                            label="Email"
                            validateFirst={true}
                        >
                            <Input
                                placeholder="Email"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            className="userinfo-form-item"
                            name="address1"
                            rules={rules.address1}
                            validateTrigger="onBlur"
                            label="Address 1"
                            validateFirst={true}
                        >
                            <Input
                                placeholder="Your street"
                            />
                        </Form.Item>

                        <Form.Item
                            className="userinfo-form-item"
                            name="address2"
                            rules={rules.address2}
                            validateTrigger="onBlur"
                            label="Address 2"
                        >
                            <Input
                                placeholder="Your flat"
                            />
                        </Form.Item>
                        <Form.Item
                            className="userinfo-form-item"
                            name="city"
                            rules={rules.city}
                            validateTrigger="onBlur"
                            label="City"
                        >
                            <Select
                                showSearch
                                placeholder="Select city"
                                className="userinfo-form-picker"
                                options={cityList}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            className="userinfo-form-item"
                            name="postcode"
                            rules={rules.postcode}
                            validateTrigger="onBlur"
                            label="Postcode"
                            validateFirst={true}
                        >
                            <Input
                                placeholder="Postcode"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24} className="userinfo-form-reset">
                        <Button type="primary" danger onClick={() => navigate("/reset/user", {state:{email: form.getFieldValue("email")}})}>
                            Reset Password
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className="userinfo-form-update">
                        <Button type="primary" htmlType="submit" loading={loading} className="userinfo-form-button">
                            Update Information
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default UserInfo
