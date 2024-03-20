import './Doctor.less'
import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import DoctorMenu from "@/component/Menu/DoctorMenu.jsx";
const {Content} = Layout
function Doctor() {

  return (
      <>
          <DoctorMenu />
          <Content>
              <Outlet/>
          </Content>
      </>
  )
}

export default Doctor
