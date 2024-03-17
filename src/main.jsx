import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {persistor, store} from "@/redux/store.js";
import {RouterProvider} from "react-router-dom";
import router from "@/router/Router.jsx";
import {App as MsgApp} from "antd";


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <MsgApp>
                <RouterProvider router={router} />
            </MsgApp>
        </PersistGate>
    </Provider>
)
