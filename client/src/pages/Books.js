import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List1, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

var list = document.getElementById("list");

API.getBook().then(function (res, req) {
  res.data.forEach(element => {
    console.log(element.author);
    // div.appendChild(element.author);
  });
  console.log(res);
})


class Books extends Component {
  state = {
    books: [],
    author: "",
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, author: "" })
        // res.data.forEach(element => {
        //   console.log(element.author);
        // });
        // console.log(res);
      )
      .catch(err => console.log(err));
  };
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.author) {
      API.saveBook({
        author: this.state.author,
      })
        .then(res => this.loadBooks()).then(
          function(){
            window.location.reload();
          }
          )
        .catch(err => console.log(err));
    }
  };

  render() {
    return (

      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>The Story So Far...</h1>
            </Jumbotron>

            <List1>

            </List1>

          </Col>
          <Col size="md-12">
            <Jumbotron>
              <h1>What Will You Contribute?!?!?!</h1>
            </Jumbotron>
            <form>

              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Your Contribution ;-) (160 characters max)"
              />

              <FormBtn
                disabled={!(this.state.author)}
                onClick={this.handleFormSubmit}
                
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>

        </Row>
      </Container>
    );
  }
}
export default Books;
