'use client'
import Loading from "@/components/Helps/Loading";
import {useSession } from "next-auth/react";
import {useEffect, useState } from "react";
import styles from './create.module.css'
import DashboardAccess from "@/components/DashboardAccess/DashboardAccess.components";
import { Button, Input, InputPicker, Table, Modal, } from "rsuite";
import axios from "axios";
import toast from "react-hot-toast";
const { Column, HeaderCell, Cell } = Table;

export default function DashnoardCompany() {
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { data: getSession } = useSession();

  const [user, setUser] = useState<any>([]);

  const [color, setColor] = useState({
    name: "",
    code: ""
  })

  useEffect(() => {
    if(typeof(getSession) == "object"){
      if(getSession != null){
        setUser(getSession?.user)
      }
      setLoading(false)
    }
  }, [getSession]);

   //Добавление цвета
   const createColor = async() => {
    setLoadingBtn(true)
    const formData = new FormData();
    formData.append("name", color.name);
    formData.append("code", color.code);

    axios.post(`/api/product/color`, formData).then(res => {
      if(res.data.success){
        toast.success(res.data.message)
        setColorList([res.data.color, ...colorList])
      }else{
        toast.error(res.data.message)
      }
    }).finally(() => setLoadingBtn(false))
  }

  //Удаление цвета
  const deleteColor = async(id: number) =>{
    axios.delete(`/api/product/color?id=${id}`).then(res => {
      if(res.data.success){
        toast.success(res.data.message)
        setColorList(colorList.filter((colorList: any) => colorList?.id !== id))
      }else{
        toast.error(res.data.message)
      }
    })
  }

  //Обновление цвета
  const updateColor = async() =>{
    const formData = new FormData();
    formData.append("id", update.id);
    formData.append("name", update.name);
    formData.append("code", update.code);
    axios.put(`/api/product/color`, formData).then(res => {
      if(res.data.success){
        toast.success(res.data.message)
        axios.get(`/api/product/color`).then(res => {
          setColorList(res.data?.color);
        })
      }else{
        toast.error(res.data.message)
      }
    })
  }

  
  const [colorList, setColorList] = useState<any>([]);
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState({
    id: "",
    name: "",
    code: ""
  })

  useEffect(() => {
    axios.get(`/api/product/color`).then(res => {
      setColorList(res.data?.color);
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
        <h1>Добавить цвет товара</h1>
        <div className={styles.form}>
          <Input style={{ width: 500 }} className={styles.mb} placeholder="Название цвета" value={color.name} onChange={(value, e) => setColor({...color, name: value})} />
          <Input style={{ width: 500 }} className={styles.mb} placeholder="HEX цвета" value={color.code} onChange={(value, e) => setColor({...color, code: value})} />
          <Button onClick={() => createColor()} loading={loadingBtn} appearance="primary">Добавить</Button>
        </div>

        <hr/>

        <Table
        height={700}
        data={colorList}
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

      <Column width={100}>
        <HeaderCell>Цвет</HeaderCell>
        <Cell dataKey="code" />
      </Column>

      <Column width={100}>
        <HeaderCell>Цвет</HeaderCell>
        {/* <Cell dataKey="code"/> */}
        <Cell>
          {rowData => <div style={{ backgroundColor: `#${rowData.code}` }} className={styles.color}></div>}
        </Cell>
      </Column>

      <Column width={150} fixed="right">
        <HeaderCell>Действие</HeaderCell>

        <Cell style={{ padding: '6px' }}>
          {rowData => (
            <Button color="green" appearance="link"onClick={() => {
              setModal(true)
              setUpdate({name: rowData.name, id: rowData.id, code: rowData.code})
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
            <Button color="red" appearance="link" onClick={() => deleteColor(rowData.id)}>
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
          <Input style={{ width: 500 }} className={styles.mb} placeholder="Название цвета" value={update.name} onChange={(value, e) => setUpdate({...update, name: value})} />
          <Input style={{ width: 500 }} className={styles.mb} placeholder="HEX цвета" value={update.code} onChange={(value, e) => setUpdate({...update, code: value})} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            setModal(false)
            updateColor()
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
