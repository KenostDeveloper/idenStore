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



export default function DashnoardCategory() {
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

  //Добавление категории
  const createCategory = async() => {
    setLoadingBtn(true)
    const formData = new FormData();
    formData.append("name", name);

    axios.post(`/api/card/category`, formData).then(res => {
        if(res.data.success){
            toast.success(res.data.message)
            setCategory([res.data.category, ...category])
        }else{
            toast.error(res.data.message)
        }
    }).finally(() => setLoadingBtn(false))
    
  }

  //Удаление категории
  const deleteCategory = async(id: number) =>{
    axios.delete(`/api/card/category?id=${id}`).then(res => {
      if(res.data.success){
        toast.success(res.data.message)
        setCategory(category.filter((category: any) => category?.id !== id))
      }else{
        toast.error(res.data.message)
      }
    })
  }

  //Обновление категории
  const updateCategory = async() =>{
    const formData = new FormData();
    formData.append("id", update.id);
    formData.append("name", update.name);
    axios.put(`/api/card/category`, formData).then(res => {
      if(res.data.success){
        toast.success(res.data.message)
        axios.get(`/api/card/category`).then(res => {
          setCategory(res.data?.category);
        })
      }else{
        toast.error(res.data.message)
      }
    })
  }


  const [category, setCategory] = useState<any>([]);
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState({
    id: "",
    name: ""
  })

  useEffect(() => {
    axios.get(`/api/card/category`).then(res => {
      setCategory(res.data?.category);
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
        <h1>Добавить категорию</h1>
        <div className={styles.form}>
          <Input style={{ width: 500 }} className={styles.mb} placeholder="Название категории" value={name} onChange={(value, e) => setName(value)} />
          <Button onClick={() => createCategory()} loading={loadingBtn} appearance="primary">Добавить</Button>
        </div>

        <hr/>

        <Table
        height={700}
        data={category}
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
            <Button color="red" appearance="link" onClick={() => deleteCategory(rowData.id)}>
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
            updateCategory()
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
