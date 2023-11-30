import Head from 'next/head';
import styles from '../../styles/Home.module.css'
import { useEffect, useState } from 'react';
import { NextUIProvider, Table, Input, Button } from '@nextui-org/react';
import { useForm } from 'react-hook-form'
import getUsers,{addUsers, deleteUsers, editUsers } from '../../lib/apicall'

export default function Home() {
  const [getData, setData] = useState([])
  const { register, handleSubmit, setValue, reset, formState: { errors }, } = useForm({})
  // GET User data function Call
  async function getUser() {
    const userdata = await getUsers()
    setData(userdata.users)
  }

  // ADD User data function Call
  async function addEditUser(data) {
    data.id === undefined ?addUsers(data):editUsers(data);
    getUser()
    reset()
  }

  // DELETE User data function Call
  async function deleteUser(data) {
    let info = await deleteUsers(data)
      getUser()
  }

  // DELETE User data function Call
  async function editUser(data) {
    setValue("id",data.id)
    setValue("name",data.name)
    setValue("email",data.email)
    setValue("password",data.password)

  }

  useEffect(() => {
    getUser()
  }, []);

  const TableData = () => {
    return (<Table
      bordered
      aria-label="Example table with static content"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header>
        <Table.Column>Sr.no</Table.Column>
        <Table.Column>NAME</Table.Column>
        <Table.Column>Email</Table.Column>
        <Table.Column>password</Table.Column>
        <Table.Column>action</Table.Column>
      </Table.Header>
      <Table.Body>
        {getData.map((data, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>{index+1}</Table.Cell>
              <Table.Cell>{data.name}</Table.Cell>
              <Table.Cell>{data.email}</Table.Cell>
              <Table.Cell>{data.password}</Table.Cell>
              <Table.Cell>
                <div className={styles.rowbtn}>
                  <Button size="xs" auto onPress={() => editUser(data)}>Edit</Button>
                  <Button size="xs" color='error' auto onPress={() => deleteUser(data.id)}>Delete</Button>
                </div>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
      <Table.Pagination
        shadow
        noMargin
        align="center"
        rowsPerPage={3}
        onPageChange={(page) => console.log({ page })}
      />
    </Table>)
  }

  return (
    
    <div>
      <Head><title>Demo</title></Head>
      {/* <h1 className={styles.heading}>Hello</h1> */}
      {/* <h1 className={styles.heading}>{heading}</h1> */}
      <h1 className={styles.heading}>CRUD USING NEXT JS BACkEND</h1>
      <h1 className={styles.heading}>ENV:{process.env.NEXT_PUBLIC_NODE_ENV}</h1>
      <NextUIProvider>
        <TableData />
        <div >
          <form onSubmit={handleSubmit(addEditUser)} className={styles.row}>
            <div><Input clearable label='Name' placeholder="Name"
              {...register("name", {
                required: "Please enter your Name.",
              })} />
              {/* <ErrorMessage className={styles.red} errors={errors} name="name" render={({ message }) => <p>{message}</p>}/> */}
              </div>
            <div><Input clearable label='Email' placeholder="Email" type='email'
              {...register("email", {
                required: "Please enter your Email.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address"
                }
              })} />
              {/* <ErrorMessage className={styles.red} errors={errors} name="email" render={({ message }) => <p>{message}</p>}/> */}
              </div>
            <div><Input clearable label='Password' placeholder="Password" type='password'
              {...register("password", {
                required: "Please enter your Password.",
              })} />
              {/* <ErrorMessage className={styles.red} errors={errors} name="password" render={({ message }) => <p>{message}</p>}/> */}
              </div>
            <Button onPress={handleSubmit(addEditUser)}>Submit</Button>
          </form>
        </div>
      </NextUIProvider>
    </div>
  )
}
