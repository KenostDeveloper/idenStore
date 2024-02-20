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



export default function DashnoardCardAdd() {
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { data: getSession } = useSession();

  const [user, setUser] = useState<any>([]);

  const [company, setCompany] = useState([]);
  const [category, setCategory] = useState([]);

  const [card, setCard] = useState({
    name: "",
    description: "",
    company: "",
    category: "",
  })

  useEffect(() => {
    if(typeof(getSession) == "object"){
      if(getSession != null){
        setUser(getSession?.user)
      }
      setLoading(false)
    }
  }, [getSession]);

  useEffect(() => {
    axios.get(`/api/card/company`).then(res => {
      setCompany(res.data?.company.map((item: any) => ({ label: item.name, value: item.id })));
    })

    axios.get(`/api/card/category`).then(res => {
      setCategory(res.data?.category.map((item: any) => ({ label: item.name, value: item.id })));
    })

  }, [])

   //Добавить карточку
   const createCard = async() => {
    setLoadingBtn(true)
    const formData = new FormData();
    formData.append("name", card.name);
    formData.append("description", card.description);
    formData.append("company", card.company);
    formData.append("category", card.category);


    axios.post(`/api/card`, formData).then(res => {
        if(res.data.success){
          toast.success(res.data.message)
          setCardList([res.data.card, ...cardList])
        }else{
            toast.error(res.data.message)
        }
    }).finally(() => setLoadingBtn(false))
  }

  //Удаление производитель
  const deleteCard = async(id: number) =>{
    axios.delete(`/api/card?id=${id}`).then(res => {
      if(res.data.success){
        toast.success(res.data.message)
        setCardList(cardList.filter((cardList: any) => cardList?.id !== id))
      }else{
        toast.error(res.data.message)
      }
    })
  }

  //Обновление производитель
  const updateCard = async() =>{
    const formData = new FormData();
    formData.append("id", update.id);
    formData.append("name", update.name);
    formData.append("description", update.description);
    formData.append("category", update.category);
    formData.append("company", update.company);
    
    axios.put(`/api/card`, formData).then(res => {
      if(res.data.success){
        toast.success(res.data.message)
        axios.get(`/api/card`).then(res => {
          setCardList(res.data?.card);
        })
      }else{
        toast.error(res.data.message)
      }
    })
  }

  
  const [cardList, setCardList] = useState<any>([]);
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState({
    id: "",
    name: "",
    description: "",
    company: "",
    category: ""
  })

  useEffect(() => {
    axios.get(`/api/card`).then(res => {
      setCardList(res.data?.card);
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
        <h1>Создать карточку товара</h1>
        <div className={styles.form}>
          <Input style={{ width: 500 }} className={styles.mb} placeholder="Название товара" value={card.name} onChange={(value, e) => setCard({...card, name: value})} />
          <Input style={{ width: 500 }} className={styles.mb} as="textarea" rows={3} placeholder="Описание" value={card.description} onChange={(value, e) => setCard({...card, description: value})} />
          <InputPicker data={company} className={styles.mb} style={{ width: 500 }} placeholder="Производитель" value={card.company} onChange={(value, e) => setCard({...card, company: value})}/>
          <InputPicker data={category} className={styles.mb} style={{ width: 500 }} placeholder="Категория" value={card.category} onChange={(value, e) => setCard({...card, category: value})}/>
          <Button onClick={() => createCard()} loading={loadingBtn} appearance="primary">Добавить</Button>
        </div> 

        <hr/>

        <Table
        wordWrap="break-word"
        height={400}
        data={cardList}
      >
      <Column width={60} align="center" fixed>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={200}>
        <HeaderCell>Наименование</HeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column width={400}>
        <HeaderCell>Описание</HeaderCell>
        <Cell className={styles.mb} dataKey="description" />
      </Column>

      <Column width={150}>
        <HeaderCell>Произодитель</HeaderCell>
        <Cell dataKey="company.name" />
      </Column>

      <Column width={150}>
        <HeaderCell>Категория</HeaderCell>
        <Cell dataKey="category.name" />
      </Column>

      <Column width={150} fixed="right">
        <HeaderCell>Действие</HeaderCell>

        <Cell style={{ padding: '6px' }}>
          {rowData => (
            <Button color="green" appearance="link"onClick={() => {
              setModal(true)
              setUpdate({id: rowData.id, name: rowData.name, description: rowData.description, company: rowData.id_company, category: rowData.id_category})
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
            <Button color="red" appearance="link" onClick={() => deleteCard(rowData.id)}>
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
          <Input style={{ width: 500 }} className={styles.mb} as="textarea" rows={3} placeholder="Описание" value={update.description} onChange={(value, e) => setUpdate({...update, description: value})} />
          <InputPicker data={company} className={styles.mb} style={{ width: 500 }} placeholder="Производитель" value={update.company} onChange={(value, e) => setUpdate({...update, company: value})}/>
          <InputPicker data={category} className={styles.mb} style={{ width: 500 }} placeholder="Категория" value={update.category} onChange={(value, e) => setUpdate({...update, category: value})}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            setModal(false)
            updateCard()
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
