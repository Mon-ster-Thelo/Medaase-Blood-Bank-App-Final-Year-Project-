import React , {useEffect,useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import moment from 'moment';
import Sidebar from "../components/shared/Layout/Sidebar";
import Analytics from "./Dashboard/Analytics";

const HomePage = () => {
    const { loading , error , user} = useSelector((state) => state.auth);
    const [data, setData] = useState([]);
    const navigate = useNavigate()

    //get function
    const getBloodRecords = async() => {
      try {
        const {data} = await API.get("http://localhost:5001/api/v1/inventory/get-inventory");
        if(data?.success){
          setData(data?.inventory);
          // console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getBloodRecords();
    }, []);
    
    return(
        <Layout>
            {error && <span>{alert(error)}</span>}
            {loading ? (
               <Spinner/>
            ) : (
                <>
                 <div className="container">

                 {
                  user?.role !=='donor' &&  <h4 
                  className="ms-4"
                  data-bs-toggle="modal" 
                  data-bs-target="#staticBackdrop"
                  style={{ cursor: "pointer"}}
                 >
                   <i className="fa-solid fa-plus text-success py-4"></i>
                   Add Inventory
                 </h4> 
                 }
                  <Modal/> 
                  </div>
                  <Analytics/>
                </>
            )}    
        </Layout>
  
    );
};

export default HomePage;