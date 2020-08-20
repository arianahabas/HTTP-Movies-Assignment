import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import axios from 'axios'


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
  margin:0px 0px 30px 0px;
`;
const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`



const initialValues = {
    title: '',
    director: '',
    metascore: '',
    stars: ['ariana habas']
}



export const AddMovie = ({getMovieList}) => {
    const [newMovie, setNewMovie] = useState([])
    const[values, setValues] = useState(initialValues)
    const history = useHistory()

    const onChange= (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        axios
        .post(`http://localhost:5000/api/movies`, values)
        .then(res => {
            console.log('it worked', res)
            getMovieList()
            history.push('/')
        })

        .catch(err => {
            console.log('it didnt work', err)
        })
    }

    return (
        <Center>
           <Form onSubmit={onSubmit}>
                <h2>Add Movie</h2>
                <label>Title</label>
                <Input 
                type='text'
                placeholder='Home Alone'
                name='title'
                value={values.title}
                onChange={onChange}
                />
                <br/>
                <label>Director</label>
                 <Input 
                type='text'
                placeholder='John Hughes'
                name='director'
                value={values.director}
                onChange={onChange}
                />
                 <br/>
                 <label>Metascore</label>
                 <Input 
                type='text'
                placeholder='89'
                name='metascore'
                value={values.metascore}
                onChange={onChange}
                />
                 <br/>
                 <label>Stars</label>
                 <Input 
                type='text'
                placeholder='Macaulay Culkin'
                name='stars'
                value={values.stars}
                onChange={onChange}
                />
                <br/>
                <Button type='submit'>Add Movie</Button>
            </Form>
        </Center>
    )
}

export default AddMovie
