import {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';
import {fetchBookingDetails} from '../utils/resource';

import { sendEmail } from '../utils/resource';

export const BookUser = () => {

  const {user} = useParams();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const [schedule, setSchedule]= useState([]);
  const [timeZone, setTimeZone] = useState("");
  const [error, setError] = useState(false);
  const [receiverEmail,setReceiverEmail] = useState("");
  const [duration,setDuration] = useState("");
  
  
  useEffect(() => {
    fetchBookingDetails(
      user,
      setError,
      setTimeZone,
      setSchedule,
      setReceiverEmail
    )
  }, [user]);
  

  const handleSubmit = (e)=>{
    e.preventDefault();
    sendEmail(receiverEmail,email,fullName,notes,duration,user);
    setFullName('');
    setNotes('');
    

  }

  if(error){
    return <ErrorPage error = "User doesn't exist" />;
  }

  return (
    <div className="container-Book">
        <h2 className="line-bottom">Book a session with {user}</h2>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full name</label>
          <input 
              type="text" 
              className="input-form" 
              id='fullName' 
              name='fullName'
              value={fullName}
              onChange={e =>{
                setFullName(e.target.value);
              }}
          />
          <label htmlFor="email">Email address</label>
          <input 
              type="text" 
              id='email' 
              name='email'
              className="input-form"
              value={email}
              onChange={(e) =>{
                setEmail(e.target.value);
              }}
          />
          <label htmlFor="notes">Any important note? (optional)</label>
          <textarea id="notes"
                    className="input-text"
                    value={notes}
                    onChange={(e)=>{
                      setNotes(e.target.value);
                    }}
          />
          <label className='text-small'><b>Select your preferred session</b> <br /> {timeZone}</label>

          <select name="duration" className="select-f" onChange={e => setDuration(e.target.value)}>
                  {
                    schedule.map(sch =>(
                      <option 
                        key={sch.day}
                        value={`${sch.day} - ${sch.startTime} : ${sch.endTime}`}
                        >
                          {`${sch.day} - ${sch.startTime} : ${sch.endTime}`}
                      </option>
                    ))
                  }
          </select>
          
            <button type="submit" className="btn-f btn-save">Send</button>
          
        </form>

    </div>
  )
}
