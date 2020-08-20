import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'

const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 300px;
  height: 35px;
  border: 1px solid #ccc;
  background-color: #fff;
`;
const Button = styled.button`
  width: 300px;
  height: 35px;
  background-color: #5995ef;
  color: #fff;
  border-radius: 3px;
`;
const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const initialValues = {
    title: '',
    director: '',
    metascore: ''
}


export const UpdateForm = () => {
    const [values, setValues] = useState(initialValues)
    const { id } = useParams()
    const history = useHistory()

    useEffect(()=> {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res=>{
            // console.log('youre right', res)
            setValues(res.data)
        })
        .catch(err=> {
            console.warn('youre wrong', err)
        })
    }, [id])

    const onChange = (e) => {
      e.preventDefault()
      const name = e.target.name
      const value = e.target.value 

      setValues({
          ...values,
          [name]: value
      }) 
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${id}`, values)
        .then((res)=>{
            // console.log('it worked', res)
            history.push(`/movies/${id}`)
        })
        .catch((err) => {
            console.log('you suck', err)
        })
    }
    
    return (
        <Center>
            <Form onSubmit={handleSubmit}>
                <h2>Update Movie</h2>
                <label>Title</label>
                <Input 
                type='text'
                placeholder='title'
                name='title'
                value={values.title}
                onChange={onChange}
                />
                <br/>
                <label>Director</label>
                 <Input 
                type='text'
                placeholder='director'
                name='director'
                value={values.director}
                onChange={onChange}
                />
                 <br/>
                 <label>Metascore</label>
                 <Input 
                type='text'
                placeholder='metascore'
                name='metascore'
                value={values.metascore}
                onChange={onChange}
                />
                 <br/>
                <Button type='submit'>Update</Button>
            </Form>
        </Center>
    )
}