// Exercises 2.1.-2.5
// src/App.jsx

import Course from './components/Course'

// 2 Curriculum component that handles an arbitrary number of courses.
// It will map over the courses array and renders a Course component for each item
const Curriculum = ({ courses }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

// ** Removed to ./components/Course.jsx **
// // 3. Course component that encapsulates the Header, Content, and Total components.
// // The ({ course }) syntax is a form of destructuring assignment, which is a concise way to 
// // pull the course property directly out of the props object that was passed to it
// const Course = ({ course }) => { 
//   // Returns a div that containing three other components: Header, Content, and Total. 
//   // It passes the course prop down to each of them, so they can access the data they need to render.
//   return (
//     <div>
//       <Header course={course} />
//       <Content course={course} />
//       <Total course={course} />
//     </div>
//   )
// }

// // 4 The Header component now takes a course prop.
// const Header = ({ course }) => {
//   // Accesses the name property from the course object and displays its value
//   return <h2>{course.name}</h2>
// }

// // 5 The Content component maps over the parts array and renders a Part component for each item.
// const Content = ({ course }) => {
//   // course.parts.map(...): The map() method is used to iterate over the parts array within the course object. 
//   // For each item in the array, map() calls a function and creates a new array of the returned values.
//   // part => <Part key={part.id} part={part} />: The arrow function is called for each part object in the array. It returns a Part component.
//   return (
//     <div>
//       {course.parts.map(part => 
//         <Part key={part.id} part={part} />
//       )}
//     </div>
//   )
// }

// // 6 The Part component takes a part prop which is a single object from the parts array.
// // The Part component receives a single part object as a prop. returnes the name and the No of exercises
// const Part = ({ part }) => {
//   return (
//     <p>
//       {part.name} {part.exercises}
//     </p>
//   )
// }

// // 7 The Total component uses the reduce method to calculate the total number of exercises.
// // course.parts.reduce(...): The reduce() method is used to calculate a single value from an array. It iterates through the parts array
// const Total = ({ course }) => {
//   const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
//   return <b>total of {total} exercises</b>;
// }
// // (sum, part) => sum + part.exercises: This is the callback function. It takes the sum (the accumulated value (which starts at 0),
// // from the second argument of reduce) and the current part. It returns the new sum by adding the exercises of the current part.

// 1. The main App component which now uses the Course component.
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  // Pass the course array defined above to the Course component as a prop.
  // This is how data flows from a parent component (App) to a child component (Course)
  return <Curriculum courses={courses} />
}
// Makes the App component the default export of this file.
// This allows it to be imported and used in other files, like index.js, to be rendered on the web page.
export default App

// Additional Notes:

// src/
//  ├─ components/
//  │   ├─ Course/
//  │   │   ├─ Course.jsx
//  │   │   ├─ Header.jsx
//  │   │   ├─ Content.jsx
//  │   │   ├─ Part.jsx
//  │   │   ├─ Total.jsx
//  │   │   └─ index.js
//  │   └─ Curriculum.jsx
//  ├─ App.jsx
//  └─ main.jsx (or index.js, depending on your setup)


// Course/Course.jsx:
// import Header from './Header'
// import Content from './Content'
// import Total from './Total'

// const Course = ({ course }) => {
//   return (
//     <div>
//       <Header course={course} />
//       <Content course={course} />
//       <Total course={course} />
//     </div>
//   )
// }

// export default Course

// Course/Header.jsx:
// const Header = ({ course }) => {
//   return <h2>{course.name}</h2>
// }

// export default Header

// Course/Content.jsx:
// import Part from './Part'

// const Content = ({ course }) => {
//   return (
//     <div>
//       {course.parts.map(part => 
//         <Part key={part.id} part={part} />
//       )}
//     </div>
//   )
// }

// export default Content


// Course/Part.jsx:
// const Part = ({ part }) => {
//   return (
//     <p>
//       {part.name} {part.exercises}
//     </p>
//   )
// }

// export default Part


// Course/Total.jsx:
// const Total = ({ course }) => {
//   const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
//   return <b>total of {total} exercises</b>
// }

// export default Total


// Course/index.js:
// import Course from './Course'
// import Header from './Header'
// import Content from './Content'
// import Part from './Part'
// import Total from './Total'

// export { Course, Header, Content, Part, Total }


// Curriculum.jsx:
// import { Course } from './Course'

// const Curriculum = ({ courses }) => {
//   return (
//     <div>
//       <h1>Web development curriculum</h1>
//       {courses.map(course => (
//         <Course key={course.id} course={course} />
//       ))}
//     </div>
//   )
// }

// export default Curriculum


// App.jsx:
// import Curriculum from './components/Curriculum'

// const App = () => {
//   const courses = [
//     {
//       name: 'Half Stack application development',
//       id: 1,
//       parts: [
//         { name: 'Fundamentals of React', exercises: 10, id: 1 },
//         { name: 'Using props to pass data', exercises: 7, id: 2 },
//         { name: 'State of a component', exercises: 14, id: 3 },
//         { name: 'Redux', exercises: 11, id: 4 },
//       ]
//     }, 
//     {
//       name: 'Node.js',
//       id: 2,
//       parts: [
//         { name: 'Routing', exercises: 3, id: 1 },
//         { name: 'Middlewares', exercises: 7, id: 2 },
//       ]
//     }
//   ]

//   return <Curriculum courses={courses} />
// }

// export default App

