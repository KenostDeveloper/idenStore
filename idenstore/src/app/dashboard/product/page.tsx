"use client";
import Loading from "@/components/Helps/Loading";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./create.module.css";
import DashboardAccess from "@/components/DashboardAccess/DashboardAccess.components";
import {
  Button,
  Input,
  InputPicker,
  Toggle,
  Uploader,
  Table,
  Modal,
  CheckPicker,
  SelectPicker,
} from "rsuite";
import axios from "axios";
import toast from "react-hot-toast";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";
import { FileType } from "rsuite/esm/Uploader";

const { Column, HeaderCell, Cell } = Table;

export default function DashnoardProductAdd() {
  const [loading, setLoading] = useState(true);
  const { data: getSession } = useSession();

  const [loadingBtn, setLoadingBtn] = useState(false);

  const [user, setUser] = useState<any>([]);

  const [card, setCard] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (typeof getSession == "object") {
      if (getSession != null) {
        setUser(getSession?.user);
      }
      setLoading(false);
    }
  }, [getSession]);

  useEffect(() => {
    axios.get(`/api/card`).then((res) => {
      setCard(
        res.data?.card.map((item: any) => ({
          label: item.name,
          value: item.id,
        }))
      );
    });

    axios.get(`/api/product/color`).then((res) => {
      setColor(
        res.data?.color.map((item: any) => ({
          label: item.name,
          value: item.id,
        }))
      );
    });

    axios.get(`/api/product/size`).then((res) => {
      setSize(
        res.data?.size.map((item: any) => ({
          label: item.name,
          value: item.id,
        }))
      );
    });

    axios.get(`/api/product/tag`).then((res) => {
      setTags(
        res.data?.tag?.map((item: any) => ({
          label: item?.name,
          value: item?.id,
        }))
      );
    });
  }, []);

  const [photoList, setPhotoList] = useState<any>([]);

  const [product, setProduct] = useState({
    acticle: "",
    price: "",
    id_card: "",
    isShow: true,
    id_color: "",
    id_size: "",
    id_tag: "",
  });

  //Создание продукта
  const createProduct = async () => {
    setLoadingBtn(true);

    console.log(photoList);

    const formData = new FormData();
    formData.append("acticle", product.acticle);
    formData.append("price", product.price);
    formData.append("id_card", product.id_card);
    formData.append("isShow", `${product.isShow}`);
    formData.append("id_color", product.id_color);
    formData.append("id_size", product.id_size);
    formData.append("id_tag", product.id_tag);
    formData.append("image", photoList);

    axios
      .post(`/api/product`, formData, photoList)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          axios.get(`/api/product?limit=99`).then((res) => {
            setProductList(res.data?.product);
          });
          // setPhotoList([])
        } else {
          toast.error(res.data.message);
        }
      })
      .finally(() => setLoadingBtn(false));
  };

  //Удаление продукта
  const deleteProduct = async (id: number) => {
    axios.delete(`/api/product?id=${id}`).then((res) => {
      if (res.data.success) {
        toast.success(res.data.message);
        setProductList(
          productList.filter((productList: any) => productList?.id !== id)
        );
      } else {
        toast.error(res.data.message);
      }
    });
  };

  //Обновление продукта
  const updateProduct = async () => {
    const formData = new FormData();
    formData.append("id", update.id);
    formData.append("acticle", update.article);
    formData.append("price", update.price);
    formData.append("card", update.card);
    formData.append("color", update.color);
    formData.append("size", update.size);
    formData.append("id_tag", update.id_tag);
    
    axios.put(`/api/product`, formData).then((res) => {
      if (res.data.success) {
        toast.success(res.data.message);
        axios.get(`/api/product?limit=99`).then((res) => {
          setProductList(res.data?.product);
        });
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const [productList, setProductList] = useState<any>([]);
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState<any>({
    id: "",
    article: "",
    price: "",
    card: "",
    color: "",
    size: "",
    isShow: true,
    id_tag: ""
  });

  useEffect(() => {
    axios.get(`/api/product?limit=99`).then((res) => {
      setProductList(res.data?.product);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (user?.role != "ADMIN" || getSession == null) {
    return <DashboardAccess user={user} />;
  } else {
    return (
      <main className={styles.main}>
        <h1>Добавить новый товар</h1>
        <div className={styles.form}>
          <Input
            style={{ width: 500 }}
            className={styles.mb}
            placeholder="Артикул товара"
            value={product.acticle}
            onChange={(value, e) => setProduct({ ...product, acticle: value })}
          />
          <Input
            style={{ width: 500 }}
            className={styles.mb}
            placeholder="Цена товара"
            value={product.price}
            onChange={(value, e) => setProduct({ ...product, price: value })}
          />
          <InputPicker
            data={card}
            className={styles.mb}
            style={{ width: 500 }}
            placeholder="Карточка товара"
            value={product.id_card}
            onChange={(value, e) => setProduct({ ...product, id_card: value })}
          />
          <InputPicker
            data={color}
            className={styles.mb}
            style={{ width: 500 }}
            placeholder="Цвет"
            value={product.id_color}
            onChange={(value, e) => setProduct({ ...product, id_color: value })}
          />
          <SelectPicker data={tags} value={product.id_tag} onChange={(value:any, e) => setProduct({ ...product, id_tag: value })} className={styles.mb} style={{ width: 500 }} appearance="default" placeholder="Теги товара"/>
          <InputPicker
            data={size}
            className={styles.mb}
            style={{ width: 500 }}
            placeholder="Размер памяти"
            value={product.id_size}
            onChange={(value, e) => setProduct({ ...product, id_size: value })}
          />
          <Toggle
            className={styles.mb}
            checked={product.isShow}
            onChange={(value) => setProduct({ ...product, isShow: value })}
            checkedChildren="Отображать на сайте"
            unCheckedChildren="Не отображать"
          />
          <Uploader
            className={styles.mb}
            listType="picture"
            onSuccess={(object, type) =>  {
              if(object.success){
                photoList.push(object?.name)
              }
            }}
            multiple
            action="/api/product/image"
          >
            <button>
              <CameraRetroIcon />
            </button>
          </Uploader>
          <Button
            onClick={() => createProduct()}
            loading={loadingBtn}
            appearance="primary"
          >
            Добавить
          </Button>
        </div>
        <hr />

          <Table wordWrap="break-word" height={400} data={productList}>
            <Column width={60} align="center" fixed>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column width={150}>
              <HeaderCell>Актикул</HeaderCell>
              <Cell dataKey="acticle" />
            </Column>

            <Column width={100}>
              <HeaderCell>Цена</HeaderCell>
              <Cell className={styles.mb} dataKey="price" />
            </Column>

            <Column width={200}>
              <HeaderCell>Привязан к карточке</HeaderCell>
              <Cell dataKey="card.name" />
            </Column>

            <Column width={100}>
              <HeaderCell>Цвет</HeaderCell>
              <Cell dataKey="color.name" />
            </Column>

            <Column width={75}>
              <HeaderCell>Цвет</HeaderCell>
              <Cell>
                {rowData => <div style={{ backgroundColor: `#${rowData?.color?.code}` }} className={styles.color}></div>}
              </Cell>
            </Column>

            <Column width={100}>
              <HeaderCell>Тег</HeaderCell>
              <Cell dataKey="tag.name" />
            </Column>

            <Column width={200}>
              <HeaderCell>Размер памяти</HeaderCell>
              <Cell dataKey="size.name" />
            </Column>

            <Column width={150} fixed="right">
              <HeaderCell>Действие</HeaderCell>

              <Cell style={{ padding: "6px" }}>
                {(rowData) => (
                  <Button
                    color="green"
                    appearance="link"
                    onClick={() => {
                      setModal(true);
                      setUpdate({
                        id: rowData.id,
                        article: rowData.acticle,
                        color: rowData.id_color,
                        size: rowData.id_size,
                        card: rowData.id_card,
                        isShow: rowData.isShow,
                        price: rowData.price,
                        id_tag: rowData.id_tag
                      });
                    }}
                  >
                    Изменить
                  </Button>
                )}
              </Cell>
            </Column>

            <Column width={150} fixed="right">
              <HeaderCell>Действие</HeaderCell>

              <Cell style={{ padding: "6px" }}>
                {(rowData) => (
                  <Button
                    color="red"
                    appearance="link"
                    onClick={() => deleteProduct(rowData.id)}
                  >
                    Удалить
                  </Button>
                )}
              </Cell>
            </Column>
          </Table>

          <Modal
            keyboard={false}
            open={modal}
            onClose={() => {
              setModal(false);
            }}
          >
            <Modal.Header>
              <Modal.Title>Редактировать товар</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Input
                style={{ width: 500 }}
                className={styles.mb}
                placeholder="Артикул товара"
                value={update.article}
                onChange={(value, e) =>
                  setUpdate({ ...update, article: value })
                }
              />
              <Input
                style={{ width: 500 }}
                className={styles.mb}
                placeholder="Цена"
                value={update.price}
                onChange={(value, e) => setUpdate({ ...update, price: value })}
              />
              <InputPicker
                data={card}
                className={styles.mb}
                style={{ width: 500 }}
                placeholder="Производитель"
                value={update.card}
                onChange={(value, e) => setUpdate({ ...update, card: value })}
              />
              <InputPicker
                data={color}
                className={styles.mb}
                style={{ width: 500 }}
                placeholder="Категория"
                value={update.color}
                onChange={(value, e) => setUpdate({ ...update, color: value })}
              />
              <InputPicker
                data={size}
                className={styles.mb}
                style={{ width: 500 }}
                placeholder="Категория"
                value={update.size}
                onChange={(value, e) => setUpdate({ ...update, size: value })}
              />
              <Toggle
                className={styles.mb}
                checked={update.isShow}
                onChange={(value) => setUpdate({ ...update, isShow: value })}
                checkedChildren="Отображать на сайте"
                unCheckedChildren="Не отображать"
              />
            <SelectPicker data={tags} value={update.id_tag} onChange={(value:any, e) => setUpdate({ ...update, id_tag: value })} className={styles.mb} style={{ width: 500 }} appearance="default" placeholder="Теги товара"/>

            

            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  setModal(false);
                  updateProduct();
                }}
                appearance="primary"
              >
                Применить
              </Button>
              <Button
                onClick={() => {
                  setModal(false);
                }}
                appearance="subtle"
              >
                Отмена
              </Button>
            </Modal.Footer>
          </Modal>
      </main>
    );
  }
}
