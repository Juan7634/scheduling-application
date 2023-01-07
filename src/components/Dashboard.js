import {useState,useEffect} from 'react';
import TimezoneSelect from "react-timezone-select";
import { useNavigate } from "react-router-dom";
import { time, handleSaveSchedule,verifySchedule } from '../utils/resource';


import { Header } from './Header';
import { toast } from 'react-toastify';

export const Dashboard = () => {

    const [selectedTimezone, setSelectedTimezone] = useState({});
    const [schedule, setSchedule] = useState([
      { day: "Sun", startTime: "", endTime: "" },
      { day: "Mon", startTime: "", endTime: "" },
      { day: "Tue", startTime: "", endTime: "" },
      { day: "Wed", startTime: "", endTime: "" },
      { day: "Thu", startTime: "", endTime: "" },
      { day: "Fri", startTime: "", endTime: "" },
      { day: "Sat", startTime: "", endTime: "" },
    ])
    const navigate = useNavigate();

    

    useEffect(() => {
      if(!localStorage.getItem('id')){
          navigate('/');
      }

    },[navigate]);

    useEffect(() => {
        if(verifySchedule()){
          navigate(`/profile/${localStorage.getItem('username')}`);
        }
    });

    

    

    const handleTimeChange = (e, id)=>{
        const {name, value} = e.target;

        if(value === "Select") return;
        
        const list = [...schedule];
        list[id][name] = value;
        setSchedule(list);
        
    }

    const handleSaveSch = ()=>{
      if(JSON.stringify(selectedTimezone)!=="{}"){
        handleSaveSchedule(selectedTimezone,schedule,navigate); 
      }
      else{
        toast.error("Select your timezone");
      }
    }


  return (
    <>
      <Header />
      
      <main className="dashboard_main">
        <h2 className='dashboard_heading'>Selecciona tu disponibilidad</h2>

        <div className='timezone__wrapper'>
                    <p>Selecciona tu zona horaria</p>
                    <TimezoneSelect
                        value={selectedTimezone}
                        onChange={setSelectedTimezone}
                    />
        </div>
        
        {

          schedule.map((d, id) => (
            <div className="content-day" key={id}>
                <p>{d.day}</p>
                <div className="selects-content">
                    <label htmlFor='startTime'>Start time</label>
                    <select 
                      name='startTime'
                      id='startTime'
                      onChange={e =>{
                        handleTimeChange(e, id)
                      }}
                    >
                      {
                        time.map((t) =>(
                            <option value={t.t} key={t.id}>
                                {t.t}
                            </option>
                        ))
                      }
                    </select>
                </div>

                <div className="selects-content">
                <label htmlFor='endTime'>End time</label>
                    <select 
                      name='endTime'
                      id='endTime'
                      onChange={e =>{
                        handleTimeChange(e, id)
                      }}
                    >
                      {
                        time.map((t) =>(
                            <option value={t.t} key={t.id}>
                                {t.t}
                            </option>
                        ))
                      }
                    </select>
                </div>

            </div>
          ))
        }

        <button className='btn-f btn-save' onClick={handleSaveSch}>Save Schedule</button>
      </main>
      
    </>
  )
}
