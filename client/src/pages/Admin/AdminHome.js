import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
    const {user} = useSelector((state) => state.auth);
    return (
        <Layout>
            <div className="container">
                <div className="d-flex flex-column mt-4">
                    <h1>
                        Welcome Admin<i className="text-success bg-light">{user?.name}</i>
                    </h1>
                    <h3>Manage Medaase Blood Bank App</h3>
                    <hr/>
                    <p>
                        Welcome to the Medaase Blood Bank Admin Panel.
                        As an administrator, your role is pivotal in ensuring the smooth operation of our blood bank system. Let us delve into the key responsibilities and features you will be handling:
                        1. Blood Inventory Management: The beating heart of our blood bank lies in its inventory. You will meticulously track blood types and  quantities. When donations arrive or blood is used, you will promptly update the records. Accuracy here directly impacts lives.
                        2. Donor Management: Our donors are unsung heroes. Your task involves maintaining a comprehensive donor database. Register new donors, verify their eligibility, and encourage regular donations. Effective communication with donors ensures a steady supply of life-saving blood.
                        3. Coordinating Recipient Requests: When hospitals or individuals urgently need blood, you will be the bridge. Match recipients with suitable donors based on blood type and availability. Timeliness is critical—lives depend on it.
                        4. Reports and Insights: Numbers tell stories. Generate reports on blood usage, donor activity, and inventory status. These insights empower you to optimize operations, improve efficiency, and ultimately save more lives.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default AdminHome;