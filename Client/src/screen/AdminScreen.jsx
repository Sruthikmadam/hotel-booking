
import React ,{useEffect,useState} from 'react';
import axios from 'axios';

import { Tabs } from 'antd';
const items = [
    {
      key: '1',
      label: 'Bookings',
     children: <Booking/>,
   },
    {
      key: '2',
      label: 'Rooms',
      children: <Room/>,
    },
    {
      key: '3',
      label: 'Add Rooms',
      children: <AddRoom/>,
    },
    {
        key: '4',
        label: 'Users',
        children: <Users/>,
      }

  ];
  
  

function AdminScreen() {

const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user && user.isAdmin) {
      setIsAuthorized(true);
    } else {
      window.location.href = "/home";
    }
  }, []);

 
  if (!isAuthorized) {
    return <div>Loading...</div>; 
  }

  return (
  <div className='mt-3 ml-3 mr-3'>
    <div className='row1'>
      <h1>Admin Panel</h1>
      <Tabs defaultActiveKey="1" items={items} />
   </div>
  </div>
  );
    
  

}
export default AdminScreen


//booking list component
export function Booking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings/getallbookings');
        setBookings(response.data);
      
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();

   
  }, []);

  return (
    <div className="row">
      <div className="col md-6">
        <h1>Bookings</h1>

        {bookings.length==0 ? (
          <h1>There are {bookings.length} bookings</h1>
        ) : (
        <table className='table table-bordered table-dark table-responsive'>
          <thead className=' bs' >
            <tr>
            <th>Booking id</th>
            <th className='d-none d-md-table-cell'>User id</th>
            <th>User name</th>
            <th>Room </th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            
          </tr></thead>
          <tbody>
          {bookings.length>0 && (
          bookings.map(booking=>{
            return(<tr>
              <td className='text-break'>{booking._id}</td>
              <td className='d-none d-md-table-cell'>{booking.userid}</td>
              <td className=''>{booking.username}</td>
              <td>{booking.roomname}</td>
              <td>{booking.fromdate}</td>
              <td>{booking .todate}</td>
              <td className='text-break'>{booking.status}</td>
              </tr>
            )
          })
            
            
            
        )  }
          </tbody>
        </table>)}
 
      </div>
    </div>
  );
}
   
//room list component

export function Room() {
  const [rooms,setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rooms/getallrooms');
        setRooms(response.data);
        console.log(rooms.length)
      } catch (error) {
        console.error(error);
      }
    };

    fetchRooms();

   
  }, []); 

  return (
    <div className="row">
      <div className="col md-6">
        <h1>Rooms</h1>

        {rooms.length==0 ? (
          <h1>There are {rooms.length} rooms</h1>
        ) : (
        <table className='table table-bordered table-dark table-responsive'>
          <thead className=' bs' >
            <tr>
            <th>Room id</th>
            <th>User name</th>
            <th>Room type</th>
            <th>Rent per day</th>
            <th>Max count</th>
            <th>phone number</th>
            
          </tr></thead>
          <tbody>
          {rooms.length>0 && (
          rooms.map(room=>{
            return(<tr>
              <td className='text-break'>{room._id}</td>
              <td>{room.name}</td>
              <td>{room.type}</td>
              <td>{room.rentperday}</td>
              <td>{room.maxcount}</td>
              <td className='text-break'>{room.phonenumber}</td>
              
              </tr>
            )
          })
            
            
            
        )  }
          </tbody>
        </table>)}
 
      </div>
    </div>
  );
}


//users list component
export function Users(){
  const [users,setUsers]=useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/getallusers");
        const data = response.data;
        setUsers(data);
        console.log(data); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers(); 
  }, []);
  return(
    <div className="row ">
      <div className="col-md-12">
        <h1>Users</h1>
        <table className="table table-dark table-bordered table-responsive">
          <thead>
            <tr>
              <th>User id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
              
            </tr>
            </thead>
            <tbody>
              {users &&(users.map(user=>{
                return<tr>
                  <td className='text-break'>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "yes":"no"}</td>
                </tr>
              }))}
            </tbody>
          
        </table>
      </div>
    </div>
  )
}

//add room component
 export function AddRoom(){
  const [name,setName]=useState("")
  const [maxcount,setMaxcount]=useState("")
  const [rentperday,setRentperday]=useState("")
  const [description,setDescription]=useState("")
  const [type,setType]=useState("")
  const [phonenumber,setPhonenumber]=useState("")
  const [imageurl1,setImageurl1]=useState("")
  const [imageurl2,setImageurl2]=useState("")
  const [imageurl3,setImageurl3]=useState("")
 async function add(){
 const newRoom={
  name,
  maxcount,rentperday,description,type,phonenumber,imageurls:[imageurl1,imageurl2,imageurl3]
 }
 try {
  const result=await (await axios.post("http://localhost:5000/api/rooms/addroom",newRoom))
  const newroom=result.data
  alert(newroom)
  setName("");
  setMaxcount("");setRentperday("");setDescription("");setType("")
    ;setPhonenumber("");setImageurl1("");setImageurl2("");setImageurl3("");

 } catch (error) {
  res.sent(error)
 }
} 
  return(
<div className="row  ">
  <div className="col-md-5 ">
    <input type="text" className='form-control' placeholder='room name'
    value={name}  onChange={(e)=>{setName(e.target.value)}}/>

    <input type="text" className='form-control' placeholder='rent per day' 
    value={rentperday}  onChange={(e)=>{setRentperday(e.target.value)}} />
    <input type="text" className='form-control' placeholder='max count' 
    value={maxcount}  onChange={(e)=>{setMaxcount(e.target.value)}}/>
    <input type="text" className='form-control' placeholder='description' 
    value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
    <input type="text" className='form-control' placeholder='phone number' 
    value={phonenumber}  onChange={(e)=>{setPhonenumber(e.target.value)}}/>
  </div>
<div className="col-md-5">
    <input type="text" className='form-control' placeholder='type'
    value={type}  onChange={(e)=>{setType(e.target.value)}} />
    <input type="text" className='form-control' placeholder='image Url 1' 
    value={imageurl1} onChange={(e)=>{setImageurl1(e.targetvalue)}}/>
    <input type="text" className='form-control' placeholder='image Url 2'
    value={imageurl2}   onChange={(e)=>{setImageurl2(e.targetvalue)}} />
    <input type="text" className='form-control' placeholder='image Url 3'
    value={imageurl3}  onChange={(e)=>{setImageurl3(e.targetvalue)}} />
</div>
<div className="text-right">
  <button className='btn btn-primary mt-2' onClick={add}>add</button>
</div>
</div>

) }