'use client'
import Loading from "@/components/Helps/Loading";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import styles from './home.module.css'
import DashboardAccess from "@/components/DashboardAccess/DashboardAccess.components";
import DashboardMenu from "@/components/DashboardMenu/DashboardMenu.componets";

export default function DashnoardHome() {
  const [loading, setLoading] = useState(true);
  const { data: getSession } = useSession();

  const [user, setUser] = useState<any>([]);

  useEffect(() => {
    if(typeof(getSession) == "object"){
      if(getSession != null){
        setUser(getSession?.user)
      }
      setLoading(false)
    }
  }, [getSession]);


  if(loading){
    return <Loading/>
  }

  if(user?.role != "ADMIN" || getSession == null){
    return <DashboardAccess user={user}/>
  }else{
    return (
      <main>
        Dashboard
      </main>
    );
  }
}
