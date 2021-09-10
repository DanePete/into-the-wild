import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import './AddHike.css'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import awsExports from "../../aws-exports";
import { useSelector } from 'react-redux';
import { createTodo } from '../../graphql/mutations'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
Amplify.configure(awsExports);

let array = [{name: 'dane'},'asdfasdfa', 'adsfasdfasf', 'asdfasdfasf']
console.log('stringit',JSON.stringify(array));

  let  data = [
      {
        id: 1,
        name: "a",
        age: 29,
        qualification: "B.Com",
        rating: 3,
        gender: "male",
        city: "Kerala"
      },
      {
        id: 2,
        name: "b",
        age: 35,
        qualification: "B.Sc",
        rating: 5,
        gender: "female",
        city: "Mumbai"
      },
      {
        id: 3,
        name: "c",
        age: 42,
        qualification: "B.E",
        rating: 3,
        gender: "female",
        city: "Bangalore"
      }
    ]

    console.log('string it',data);

const initialState = { name: '', description: '', mapdata: JSON.stringify(array)}
/**
 * Add Hike Component
 * Ability for user to add a hike. 
 * Submits to AWS dynamoDB using graphQL queries
 */
function AddHike() {
  const history = useHistory();
  const [formState, setFormState] = useState(initialState)
  const user = useSelector((store) => store.user);
  const [todos, setTodos] = useState([])
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  /**
   * Add HIKE
   */
  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
      history.push("/hikes");
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  const styles = {
    container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
    todo: {  marginBottom: 15 },
    input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
    todoName: { fontSize: 20, fontWeight: 'bold' },
    todoDescription: { marginBottom: 0 },
    button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
  }

  return (
    <div style={styles.container}>
      <h2>Add Hike</h2>
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={event => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addTodo}>Create Todo</button>
    </div>
  );
}

export default withAuthenticator(AddHike)

