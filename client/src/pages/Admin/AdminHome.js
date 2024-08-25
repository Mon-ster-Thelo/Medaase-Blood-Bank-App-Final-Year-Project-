import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
    const {user} = useSelector((state) => state.auth);
    return (
        <Layout>
            <div className="container">
    
            </div>
        </Layout>
    );
};

export default AdminHome;