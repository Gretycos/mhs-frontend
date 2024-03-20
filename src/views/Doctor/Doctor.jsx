import './Doctor.less'
import {Layout} from "antd";
import TopBar from "@/component/TopBar/TopBar.jsx";
import {Outlet} from "react-router-dom";
import FootBar from "@/component/FootBar/FootBar.jsx";
import DoctorMenu from "@/component/Menu/DoctorMenu.jsx";
const {Content} = Layout
function Doctor() {

  return (
      <>
          <Layout>
              <TopBar/>
              <DoctorMenu />
              <Content>
                  <Outlet/>
              </Content>
              <FootBar/>
          </Layout>
      </>
  )
}

export default Doctor
