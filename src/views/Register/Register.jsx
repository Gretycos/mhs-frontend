/**
 * author: Tsong
 * time: 19/03/2024 17:00
 */
import "./Register.less"
import {App, Button, Card, Col, DatePicker, Form, Input, Layout, Row, Select} from "antd";
import {NavLink, useNavigate} from "react-router-dom";
import {register} from "@/service/user/user.js";
import {useState} from "react";
import dayjs from "dayjs";
import {ukCity} from "@/common/js/utils.js"
const {Meta} = Card

const Register = () => {
    const navigate = useNavigate()
    const {message} = App.useApp()

    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    // 选择器列表
    const cityList = ukCity.map(city => {
        return {
            label: city,
            value: city,
        }
    });

    // 表单验证器
    const validatePostcode = async (_, value) => {
        if (!value){
            return Promise.reject(new Error("Please input your postcode"))
        }
        if (value.match(/^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/) == null){
            return Promise.reject(new Error("Please input valid postcode"))
        }
        return Promise.resolve()
    }
    const validatePassword = async (_, value) => {
        if (!value){
            return Promise.reject(new Error("Please input your password"))
        }
        if (value.length < 8){
            return Promise.reject(new Error("The length must be longer than 8"))
        }
        if (value.length > 16){
            return Promise.reject(new Error("The length must be shorter than 16"))
        }
        if (value.match(/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}$/) == null) {
            return Promise.reject(
                new Error("The password must contain at least 3 kinds of characters: " +
                    "[Uppercase letters, Lowercase letters, Symbols, Numbers]"
                )
            )
        }
        return Promise.resolve()
    }
    const validateConfirmPassword = async (_, value) => {
        if (value && value === form.getFieldsValue().password){
            return Promise.resolve()
        }
        return Promise.reject(new Error('Please confirm your password'))
    }

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
        password: [
            {
                required: true,
                message: 'Please input your password',
            },
            {
                validator: validatePassword
            }
        ],
        confirmPassword: [
            {
                required: true,
                message: 'Please input your password',
            },
            {
                validator: validateConfirmPassword
            }
        ],
    }

    // 表单提交
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        setLoading(true)
        const params = {
            lastName: values.lastName,
            firstName: values.firstName,
            dateOfBirth: values.dateOfBirth,
            address1: values.address1,
            address2: values.address2,
            city: values.city,
            postcode: values.postcode,
            email: values.email,
            password: values.password
        }
        const {data} = await register(params)
        message.success('Successfully sending register request', 2)
        // 回主页
        navigate('/user-home')
        setLoading(false)
    }

    const today = () => {
        const date = new Date()
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        <Layout className="register-page-content">
            <Card bordered={false} className="register-card">
                <Meta title="MHS Register" className="register-title"></Meta>
                <Form
                    form={form}
                    name="normal_register"
                    className="register-form"
                    onFinish={onFinish}
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
                        <Col>
                            <Form.Item
                                className="register-form-item-2"
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
                        </Col>
                        <Col>
                            <Form.Item
                                className="register-form-item-2"
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
                        </Col>
                    </Row>

                    <Form.Item
                        className="register-form-item"
                        name="dateOfBirth"
                        rules={rules.dateOfBirth}
                        validateTrigger="onBlur"
                        label="Date of Birth"
                    >
                        <DatePicker
                            className="register-form-picker"
                            maxDate={dayjs(today(), "YYYY-MM-DD")}
                        />
                    </Form.Item>

                    <Form.Item
                        className="register-form-item"
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
                        className="register-form-item"
                        name="adress2"
                        rules={rules.address2}
                        validateTrigger="onBlur"
                        label="Address 2"
                    >
                        <Input
                               placeholder="Your flat"
                        />
                    </Form.Item>

                    <Row
                        justify="space-between"
                        gutter={{
                            xs: 8,
                            sm: 16,
                            md: 24,
                            lg: 32,
                        }}
                    >
                        <Col>
                            <Form.Item
                                className="register-form-item-2"
                                name="city"
                                rules={rules.city}
                                validateTrigger="onBlur"
                                label="City"
                            >
                                <Select
                                    showSearch
                                    placeholder="Select city"
                                    className="register-form-picker"
                                    options={cityList}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item
                                className="register-form-item-2"
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

                    <Form.Item
                        className="register-form-item"
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

                    <Form.Item
                        className="register-form-item"
                        name="password"
                        rules={rules.password}
                        validateTrigger="onBlur"
                        label="Password"
                        validateFirst={true}
                    >
                        <Input
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item
                        className="register-form-item"
                        name="confirmPassword"
                        rules={rules.confirmPassword}
                        validateTrigger="onBlur"
                        label="Confirm Password"
                        validateFirst={true}
                    >
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                        />
                    </Form.Item>

                    <Form.Item
                        className="register-form-item"
                    >
                        <Button type="primary" htmlType="submit" loading={loading} className="register-form-button">
                            Sign up
                        </Button>
                        <NavLink to="/login" className="register-form-register">
                            Already have an account? Sign in
                        </NavLink>
                    </Form.Item>
                </Form>
            </Card>
        </Layout>
    )
}

export default Register
