import './App.less'
import {Layout} from "antd";
import TopBar from "@/component/TopBar/TopBar.jsx";
import {Outlet} from "react-router-dom";
import FootBar from "@/component/FootBar/FootBar.jsx";
const {Content} = Layout
function App() {

  return (
    <Layout>
      <TopBar/>
      <Content>
        <Outlet/>
      </Content>
      <FootBar/>
    </Layout>
  )
}

export default App
