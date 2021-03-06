import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function CreateCourse(props) {
  const [course, setCourse] = useState({ _id: '', courseCode: '', courseName: '', 
                section: '', semester: ''});
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/";

  const saveCourse = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { courseCode: course.courseCode, courseName: course.courseName, 
      section: course.section, semester: course.semester };
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/show/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setCourse({...course, [e.target.courseName]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={saveCourse}>
          <Form.Group>
            <Form.Label>Course Code</Form.Label>
            <Form.Control type="text" name="courseCode" id="courseCode" placeholder="Enter course code" value={course.courseCode} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Course Name</Form.Label>
            <Form.Control type="text" name="courseName" id="courseName" placeholder="Enter course name" value={course.courseName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Section</Form.Label>
            <Form.Control type="text" name="section" id="section"  placeholder="Enter section" value={course.section} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Semester</Form.Label>
            <Form.Control type="text" name="semester" id="semester" placeholder="Enter semester" value={course.semester} onChange={onChange} />
          </Form.Group>
          
          
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CreateCourse);
