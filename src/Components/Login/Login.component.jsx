import { ServerOptions } from "./../../App";
import { Dropdown } from 'primereact/dropdown';
import { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
export const Login = ({setUser, setServer, server}) => {

    const [loginUser, setLoginUser] = useState(null);
    const [loginPass, setLoginPass] = useState(null);

    return (
    <div class="flex flex-row flex-grow-1 align-items-center justify-content-center" 
        style={{width: '100vw', height: '100vh'}}>
        <div class="flex flex-column flex-grow-1 align-items-center justify-content-center">
            <p style={{width: 400, fontWeight: 500}}>
                Please Login to Continue...
            </p>
            <Dropdown style={{width: 400}} className="mt-2"
                value={server} options={ServerOptions}
                onChange={(e) => setServer(e.value)} optionLabel="label" placeholder="Select a Server" />
            <p style={{width: 400, fontWeight: 500, marginTop: 40}}>
                            User
            </p>
            <InputText value={loginUser} style={{width: 400}} onChange={(e) => setLoginUser(e.target.value)}/>

            <p style={{width: 400, fontWeight: 500}}>
                            Password
            </p>
            <Password value={loginPass} onChange={(e) => setLoginPass(e.target.value)} 
            style={{width: 400}} feedback={false}/>
            <div className="flex flex-column align-items-end justify-content-end" style={{width: 400}}>
                <Button style={{width: 100, marginTop: 40}}>Login</Button>
            </div>
        </div>
    </div>
    )
    
    
}