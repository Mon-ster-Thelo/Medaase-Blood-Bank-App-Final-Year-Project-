import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import API from '../../services/API';
import moment from "moment";
import {useState,useEffect} from 'react'

const Consumer = () => {
    const { user} = useSelector(state => state.auth);
    const [data,setData] = useState ([]);
    //find donor records
    const getDonors = async () => {
        try {
            const {data} = await API.post('http://localhost:5001/api/v1/inventory/get-inventory-hospital',{
                filters:{
                    inventoryType:"out",
                    hospital: user?._id,
                },
            });
            if(data?.success){
                setData(data?.inventory);
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDonors();
    }, []);

    return (
    <Layout>
      <div className="container mt-4">
        <table className="table">
            <thead>
                <tr>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Inventory Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Email</th>
                  <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
              {data?.map((record) =>(
                <tr key={record._id}>
                  <td>{record.bloodGroup}</td>
                  <td>{record.inventoryType}</td>
                  <td>{record.quantity}</td>
                  <td>{record.email}</td>
                  <td>{record.phone}</td>
                  <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                </tr>
              
             ))}
 
            </tbody>
         </table>
        </div>
    </Layout>
    )
};

export default Consumer;