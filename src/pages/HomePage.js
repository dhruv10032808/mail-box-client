import React from "react";
import Compose from "../components/Compose";
import Sidebar from "../components/Sidebar";
import Received from "../components/Received";
import Sent from "../components/Sent";
import { useSelector } from "react-redux";

const HomePage=()=>{
const show=useSelector((state)=>state.show)
return(<>
<Sidebar/>
{show.compose && <Compose/>}
{show.received && <Received/>}
{show.sent && <Sent/>}
   </>)
};
export default HomePage;