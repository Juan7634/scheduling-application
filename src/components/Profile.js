import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getDetailsUser } from "../utils/resource";
import { Header } from "./Header";



export const Profile = () => {

  const {id} = useParams();

  const navigate = useNavigate();

  const [schedule, setSchedule]= useState([]);
  const [timeZone, setTimeZone] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading,setIsLoading] = useState(true);
  

  useEffect(() => {
   
    if(!localStorage.getItem('id')){
        navigate('/');
    }
      
  },[navigate]);

  useEffect(()=>{
      getDetailsUser(id)
        .then(data =>{
          
            setSchedule(data.schedule);
            setTimeZone(data.timeZone.label);
            setUsername(data.username.username);
            setIsLoading(false);
        }).catch(err =>{
          toast.error(err);
        })
  },[id])

  

  return (
    <>
    < Header />
    <main className="profile-main">
        <div className="container-profile">

          {isLoading ? (<p>Loading...</p>) : (<div>
            <h2>
              Hello, {username}
            </h2>
            <p className="spacing-text">Here is your schedule: {timeZone}</p>

            <div className="container__table">
                <table>
                  <tbody>
                  {
                    schedule.map(sch =>(
                      <tr key={sch.day}>
                        <td>{sch.day}</td>
                        <td>{sch.startTime || "Unavailable"}</td>
                        <td>{sch.endTime || "Unavailable"}</td>
                      </tr>
                    ))
                  }

                    {/* <tr>
                      <td>MON</td>
                      <td>8:00 am</td>
                      <td>10:00 pm</td>
                    </tr> */}
                  </tbody>
                </table>
            </div>
            </div>
            )}
        </div>
    </main>
    </>
  )
}
