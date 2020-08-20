import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import axios from 'axios'

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
        <Container>
           <form onSubmit={onSubmit}>
                <h2>Add Movie</h2>
                <label>Title</label>
                <input 
                type='text'
                placeholder='Home Alone'
                name='title'
                value={values.title}
                onChange={onChange}
                />
                <br/>
                <label>Director</label>
                 <input 
                type='text'
                placeholder='John Hughes'
                name='director'
                value={values.director}
                onChange={onChange}
                />
                 <br/>
                 <label>Metascore</label>
                 <input 
                type='text'
                placeholder='89'
                name='metascore'
                value={values.metascore}
                onChange={onChange}
                />
                 <br/>
                 <label>Stars</label>
                 <input 
                type='text'
                placeholder='Macaulay Culkin'
                name='stars'
                value={values.stars}
                onChange={onChange}
                />
                <br/>
                <button type='submit'>Add Movie</button>
            </form>
        </Container>
    )
}

export default AddMovie
