import { cookies } from "next/headers";

export async function login(formData: any) {

    const cookieStore = await cookies();

    const body = {
        email: formData.email,
        password: formData.password
    };
    

    const res = await fetch('http://localhost:3000/login', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    });

    const data = await res.json();
    
    if(!res.ok || data.err){        
        return data;
    }

    cookieStore.set("token", data.token, { maxAge: 24*60*60, httpOnly: true });

    return data;
    
}