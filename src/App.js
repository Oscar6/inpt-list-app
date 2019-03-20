import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';
import NavBar from './components/NavBar';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: [],
      columns: [
        {
          Header: "Title",
          accessor: "title"
        },
        {
          Header: "Description",
          accessor: "description"
        },
        {
        Header: "Delete",
        id: 'delete',
        accessor: str => "delete",

        Cell: (row) => (
          <Button onClick={() => {
            console.log(row.original._id)
            axios.delete(`http://localhost:3001/toDoList/${row.original._id}`)
            .then((response) => {
              console.log(response)
              // const toDoList = this.state.toDoList
              // toDoList.splice(row.index, 1)
              // this.setState({toDoList})
              this.getToDoList()
            })
            .catch(function (error) {
              console.log(error);
            });
          }}>
            Delete
        </Button>
        )
      }
      ]
    }
  }

  onSubmit = (title, description) => {
    console.log(title)
    console.log(description)

    axios.post('http://localhost:3001/toDoList', {
      title: title,
      description: description
    })
      .then(function (response) {
        console.log(response.data.toDoList);
        this.setState({
          toDoList: response.data.toDoList
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

getToDoList = () => {
  axios.get('http://localhost:3001/toDoList')
  .then((response) => {
    // console.log(response);
    this.setState({
      toDoList: response.data.toDoList
    })
  })
  .catch(function (error) {
    console.log(error);
  });
}

  componentDidMount() {
    this.getToDoList()
  }

  render() {

    return (
      
      <Container>
        <NavBar />

        <Row>
        <Col xs={3} className="inputForm">
          <Form onSubmit={() => this.onSubmit(this.state.title, this.state.description)}>
            <Form.Group
              controlId="title"
              onChange={(event) => this.setState({ title: event.target.value })}
            >
              <Form.Label>Title:</Form.Label>
              <Form.Control type="title" placeholder="Enter a title" />
            </Form.Group>

            <Form.Group
              controlId="description"
              onChange={(event) => this.setState({ description: event.target.value })}
            >
              <Form.Label>Description:</Form.Label>
              <Form.Control placeholder="Enter description" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          </Col>
          <Col className="tableColumn">
          <ReactTable
            data={this.state.toDoList}
            columns={this.state.columns}
            defaultPageSize={5}
          />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App;