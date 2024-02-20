'use client'
import Loading from "@/components/Helps/Loading";
import {useSession } from "next-auth/react";
import {useEffect, useState } from "react";
import styles from './create.module.css'
import DashboardAccess from "@/components/DashboardAccess/DashboardAccess.components";
import { Button, Input, Table, Modal, ButtonToolbar, Placeholder } from "rsuite";
import axios from "axios";
import toast from "react-hot-toast";
const { Column, HeaderCell, Cell } = Table;



export default function DashnoardCompany() {
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { data: getSession } = useSession();

  const [user, setUser] = useState<any>([]);

  const [name, setName] = useState("")

  useEffect(() => {
    if(typeof(getSession) == "object"){
      if(getSession != null){
        setUser(getSession?.user)
      }
      setLoading(false)
    }
  }, [getSession]);
  

   //Добавление производитель
   const createCompany = async() => {
    setLoadingBtn(true)
    const formData = new FormData();
    formData.append("name", name);


    axios.post(`/api/card/company`, formData).then(res => {
        if(res.data.success){
          toast.success(res.data.message)
          setCompany([res.data.company, ...company])
        }else{
            toast.error(res.data.message)
        }
    }).finally(() => setLoadingBtn(false))
  }

  
  //Удаление производитель
  const deleteCompany = async(id: number) =>{
    axios.delete(`/api/card/company?id=${id}`).then(res => {
      if(res.data.success){
        toast.success(res.data.message)
        setCompany(company.filter((company: any) => company?.id !== id))
      }else{
        toast.error(res.data.message)
      }
    })
  }

  //Обновление производитель
  const updateCompany = async() =>{
    const formData = new FormData();
    formData.append("id", update.id);
    formData.append("name", update.name);
    axios.put(`/api/card/company`, formData).then(res => {
      if(res.data.success){
        toast.success(res.data.message)
        axios.get(`/api/card/company`).then(res => {
          setCompany(res.data?.company);
        })
      }else{
        toast.error(res.data.message)
      }
    })
  }

  
  const [company, setCompany] = useState<any>([]);
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState({
    id: "",
    name: ""
  })

  useEffect(() => {
    axios.get(`/api/card/company`).then(res => {
      setCompany(res.data?.company);
    })
  }, [])

  if(loading){
    return <Loading/>
  }

  if(user?.role != "ADMIN" || getSession == null){
    return <DashboardAccess user={user}/>
  }else{
    return (
      <main className={styles.main}>
        <h1>Добавить производителя</h1>
        <div className={styles.form}>
          <Input style={{ width: 500 }} className={styles.mb} placeholder="Название производителя" value={name} onChange={(value, e) => setName(value)} />
          <Button onClick={() => createCompany()} loading={loadingBtn} appearance="primary">Добавить</Button>
        </div>
        <hr/>

        <Table
        height={700}
        data={company}
        // onRowClick={rowData => {
        //   console.log(rowData);
        // }}
      >
      <Column width={60} align="center" fixed>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={300}>
        <HeaderCell>Наименование</HeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column width={150} fixed="right">
        <HeaderCell>Действие</HeaderCell>

        <Cell style={{ padding: '6px' }}>
          {rowData => (
            <Button color="green" appearance="link"onClick={() => {
              setModal(true)
              setUpdate({name: rowData.name, id: rowData.id})
            }}>
              Изменить
            </Button>
          )}
        </Cell>
      </Column>

      <Column width={150} fixed="right">
        <HeaderCell>Действие</HeaderCell>

        <Cell style={{ padding: '6px' }}>
          {rowData => (
            <Button color="red" appearance="link" onClick={() => deleteCompany(rowData.id)}>
              Удалить
            </Button>
          )}
        </Cell>
      </Column>
    </Table>

      <Modal keyboard={false} open={modal} onClose={() => {setModal(false)}}>
        <Modal.Header>
          <Modal.Title>Редактировать товар</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Input style={{ width: 500 }} className={styles.mb} placeholder="Название категории" value={update.name} onChange={(value, e) => setUpdate({...update, name: value})} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            setModal(false)
            updateCompany()
          }} appearance="primary">
            Применить
          </Button>
          <Button onClick={() => {setModal(false)}} appearance="subtle">
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
      </main>
    );
  }
}
