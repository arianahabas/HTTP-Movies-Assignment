import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'

const Container = styled.div `
    display: flex;
    justify-content:center;
    border: 1px solid black;
    width: 25vw;
    margin: auto;
    padding: 20px;
    border-radius: 10px;
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
        <Container>
            <form onSubmit={handleSubmit}>
                <h2>Update Movie</h2>
                <label>Title</label>
                <input 
                type='text'
                placeholder='title'
                name='title'
                value={values.title}
                onChange={onChange}
                />
                <br/>
                <label>Director</label>
                 <input 
                type='text'
                placeholder='director'
                name='director'
                value={values.director}
                onChange={onChange}
                />
                 <br/>
                 <label>Metascore</label>
                 <input 
                type='text'
                placeholder='metascore'
                name='metascore'
                value={values.metascore}
                onChange={onChange}
                />
                 <br/>
                <button type='submit'>Update</button>
            </form>
        </Container>
    )
}