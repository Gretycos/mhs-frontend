/**
 * author: Tsong
 * time: 19/03/2024 17:00
 */
import "./Register.less"
import {App, Button, Card, Checkbox, Col, DatePicker, Form, Input, Layout, Modal, Row, Select} from "antd";
import {NavLink, useNavigate} from "react-router-dom";
import {register} from "@/service/user/patient.js";
import {useState} from "react";
import dayjs from "dayjs";
import {sexList, today, ukCity} from "@/common/js/utils.js"
import {
    validateAgreement,
    validateConfirmPassword, validateMobileNum,
    validatePassword,
    validatePostcode
} from "@/common/js/formValidator/validator.js";
import PrivacyPolicies from "@/views/Register/PrivacyPolicies.jsx";
import md5 from 'js-md5'
const {Meta} = Card

const Register = () => {
    const navigate = useNavigate()
    const {message} = App.useApp()

    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [agree, setAgree] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

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
        sex: [
            {
                required: true,
                message: 'Please select your gender',
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
        mobileNum: [
            {
                required: false,
            },
            {
                validator: validateMobileNum
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
                validator: (_, value) => validateConfirmPassword(_, value, form.getFieldValue("password"))
            }
        ],
        agreement: [
            {
                required: true,
                message: 'Please accept our privacy policies',
            },
            {
                validator: validateAgreement
            }
        ],
    }

    // 表单提交
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        setLoading(true)
        const params = {
            ...values,
            dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
            password: md5(values.password)
        }
        console.log(params)
        const {data} = await register(params)
        message.success('Successfully sending register request', 2)
        // 回主页
        navigate('/', {replace: true})
        setLoading(false)
    }

    // 勾选同意条款
    const onChangeCheckAgreement = (e) => {
        setAgree(e.target.checked)
    }

    // terms
    // const openTerms = () => {
    //     setIsModalOpen(true)
    // }

    // privacy
    const openPrivacy = () => {
        setIsModalOpen(true)
    }

    // 关闭对话框
    const handleOk = () => {
        setIsModalOpen(false)
    }

    // const today = () => {
    //     const date = new Date()
    //     const year = date.getFullYear();
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     const day = String(date.getDate()).padStart(2, '0');
    //     return `${year}-${month}-${day}`;
    // }

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
                    </Row>
                    <Row
                        justify="space-between"
                        gutter={{
                            xs: 8,
                            sm: 16,
                            md: 24,
                            lg: 32,
                        }}
                    >
                        <Col span={8}>
                            <Form.Item
                                className="register-form-item"
                                name="sex"
                                rules={rules.sex}
                                validateTrigger="onBlur"
                                label="Gender"
                            >
                                <Select
                                    placeholder="Select gender"
                                    className="register-form-picker"
                                    options={sexList}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={16}>
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
                        </Col>
                    </Row>

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
                        name="address2"
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
                        <Col span={12}>
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
                        <Col span={12}>
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
                        name="mobileNum"
                        rules={rules.mobileNum}
                        validateTrigger="onBlur"
                        label="Mobile Number"
                        validateFirst={true}
                    >
                        <Input
                            placeholder="Mobile Number (Example:+44 1231231234)"
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
                        <Input.Password
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
                        <Input.Password
                            placeholder="Confirm Password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        rules={rules.agreement}
                        valuePropName="checked"
                        validateTrigger="onBlur"
                        validateFirst={true}
                    >
                        <Row>
                            <Checkbox
                                checked={agree}
                                onChange={onChangeCheckAgreement}
                            />
                            {/*<div className="register-form-agreement-desc">*/}
                            {/*    I agree to the <a onClick={openTerms}>Terms & Conditions</a> and <a*/}
                            {/*    onClick={openPrivacy}>Privacy Statement</a>*/}
                            {/*</div>*/}
                            <div className="register-form-agreement-desc">
                                I agree to the <a onClick={openPrivacy}>Privacy Policies</a>
                            </div>
                        </Row>
                    </Form.Item>

                    <Form.Item
                        className="register-form-item"
                    >
                        <Button type="primary" htmlType="submit" loading={loading} className="register-form-button">
                            Sign up
                        </Button>
                        <NavLink to="/login/patient" className="register-form-register">
                            Already have an account? Sign in
                        </NavLink>
                    </Form.Item>
                </Form>
            </Card>
            <Modal
                className="register-modal"
                title="Privacy Policies"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleOk}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <OkBtn />
                    </>
                )}
            >
                <PrivacyPolicies/>
            </Modal>
        </Layout>
    )
}

export default Register
