import { toast } from "react-toastify";
import axios from "axios";
import emailjs from "@emailjs/browser";

export const time = [
    { id: "null", t: "Select" },
    { id: "7", t: "7:00am" },
    { id: "8", t: "8:00am" },
    { id: "9", t: "9:00am" },
    { id: "10", t: "10:00am" },
    { id: "11", t: "11:00am" },
    { id: "12", t: "12:00pm" },
    { id: "13", t: "13:00pm" },
    { id: "14", t: "14:00pm" },
    { id: "15", t: "15:00pm" },
    { id: "16", t: "16:00pm" },
    { id: "17", t: "17:00pm" },
    { id: "18", t: "18:00pm" },
    { id: "19", t: "19:00pm" },
    { id: "20", t: "20:00pm" },
];

export async function handleRegister(fullName,email, username, password, navigate){
    try{
        
        const response = await axios.post('http://127.0.0.1:4000/api/register',{
            fullName,
            email,
            username,
            password 
        });

        
    
        
        if(response.data.error_message) {
            toast.error(response.data.error_message);
        }else{
            toast.success(response.data.message);
            navigate('/');
        }
        
    }catch(err){
        console.error(err);
        toast.error('Account creation failed');
    }
}


export async function handleLogin(username, password,navigate){
    try{

        const response = await axios.post('http://127.0.0.1:4000/api/login',{
            username,
            password
        });
        // console.log(response);
        if(response.data.error_message) {
            toast.error(response.data.error_message);
        }else{
            toast.success(response.data.message);
            const {id, username} = response.data.data
            localStorage.setItem('id', id);
            localStorage.setItem('username', username);
            navigate('/dashboard');
        }



    }catch(err){
        // console.error(err);
        toast.error('Login failed, refresh page');
    }
}

export async function handleSaveSchedule (selectedTimezone, schedule,navigate){
    try{

        const response = await axios.post('http://127.0.0.1:4000/api/schedule/create',{
            userId: localStorage.getItem('id'),
            timeZone : selectedTimezone,
            schedule
        });

        if(response.data.error_message) {
            toast.error(response.data.error_message);
        }else{
            toast.success(response.data.message);
            navigate(`/profile/${localStorage.getItem('id')}`);
        }
        
    }catch(err){
        console.error(err);
        toast.error('Ocurred Error, refresh page');
    }
}

export async function getDetailsUser(id){
    if(id){
        try{

            const response = await axios.get(`http://127.0.0.1:4000/api/schedule/${id}`);

            if(response.data.message){
                return response.data
            }
            else{
                toast.error('Ocurred Error, refresh page');
            }

        }catch(err){
            console.error(err);
            toast.error('Ocurred Error, refresh page');
        }
    }

}

export async function fetchBookingDetails(user,setError,setTimeZone,setSchedule,setReceiverEmail){

    try{
        
        const response = await axios.post(`http://127.0.0.1:4000/api/schedule/${user}`,{
            userId : localStorage.getItem('id')
        });

        

        if(response.data.message){
            const {timeZone,schedule,receiverEmail} = response.data;
            setTimeZone(timeZone);
            setSchedule(schedule);
            setReceiverEmail(receiverEmail);
        }
        else{
            toast.error('Ocurred Error, refresh page');
            setError(true);
        }




    }catch(err){
        console.error(err);
        setError(true);
        toast.error('Ocurred Error, refresh page');
    }

}


export const sendEmail = (receiverEmail,email,fullName,notes,duration,username) => {
    emailjs.send(
        "service_vt6bu2u",
        "template_pkxadok",{
           myEmail: receiverEmail,
           fromEmail: email,
           fullName,
           duration,
           notes,
           username

        },"huBKHWqG5lCxks8pJ"
    ).then(result => {
        console.log(result.text);
        toast.success('Session booked succesfully');
    },(error)=>{
        console.log(error.text);
        toast.error(error.text);
    }
    )
}