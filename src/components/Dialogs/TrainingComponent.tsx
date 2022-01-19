import axios from "axios";
import { useEffect, useState } from "react"



export const TrainingComponent:React.FC<any> = ()=>{

    // const userss = ['Alexey','Ilia','Ckamelot','DonTuan','Chachid','Nigeriec','Archangel','Nika','Nadin']
    const [users,setUsers] = useState<any[]>([]);
    const [oneUser,setOneUser]= useState<any>(null);
    const [valueForm,setValueForm]=useState<any>('');
    const [searchTemp,setTempSearch] = useState<any>();

    const fetchData = (value:any)=>{
        axios
        .get(`https://social-network.samuraijs.com/api/1.0/users?term=${valueForm}`).then(res=>setUsers(res.data.items))
    }

    useEffect(()=>{
        console.log("SYNC DETAILS")
        // axios
        // .get(`https://social-network.samuraijs.com/api/1.0/users?`).then(res=>setUsers(res.data.items))

        fetchData(valueForm)

    },[searchTemp])

  

    
    let onChangeFrom = (event:any)=>{
        setValueForm(event.currentTarget.value)
    }

    let submitAction = ()=>{

        console.log("SYNC DETAILS")
        // fetchData(valueForm)
        setTempSearch(valueForm)
        // setUsers(users.filter((user)=>user))
          console.log(users)
    }

    return <div>
        <div><input onChange={onChangeFrom} placeholder="find name" value={valueForm} type="text" /><button onClick={submitAction}>find</button></div>
        {users.map((user)=><li key={user.id} onClick={()=>{setOneUser(user)}}>{user.name}</li>)}
        <div>
           {oneUser &&  <div><div>photo - <img src={oneUser.photos.small? oneUser.photos.small : oneUser.photos.large } alt="" /></div>
            <div>status - {oneUser.status}</div>
            <div>name - {oneUser.name}</div>
            </div>}
        </div>
    </div>
}