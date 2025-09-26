// components/Course.jsx

// 3. Course component that encapsulates the Header, Content, and Total components.
// The ({ course }) syntax is a form of destructuring assignment, which is a concise way to 
// pull the course property directly out of the props object that was passed to it
const Course = ({ course }) => { 
  // Returns a div that containing three other components: Header, Content, and Total. 
  // It passes the course prop down to each of them, so they can access the data they need to render.
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

// 4 The Header component now takes a course prop.
const Header = ({ course }) => {
  // Accesses the name property from the course object and displays its value
  return <h2>{course.name}</h2>
}

// 5 The Content component maps over the parts array and renders a Part component for each item.
const Content = ({ course }) => {
  // course.parts.map(...): The map() method is used to iterate over the parts array within the course object. 
  // For each item in the array, map() calls a function and creates a new array of the returned values.
  // part => <Part key={part.id} part={part} />: The arrow function is called for each part object in the array. It returns a Part component.
  return (
    <div>
      {course.parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

// 6 The Part component takes a part prop which is a single object from the parts array.
// The Part component receives a single part object as a prop. returnes the name and the No of exercises
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

// 7 The Total component uses the reduce method to calculate the total number of exercises.
// course.parts.reduce(...): The reduce() method is used to calculate a single value from an array. It iterates through the parts array
const Total = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return <b>total of {total} exercises</b>;
}
// (sum, part) => sum + part.exercises: This is the callback function. It takes the sum (the accumulated value (which starts at 0),
// from the second argument of reduce) and the current part. It returns the new sum by adding the exercises of the current part.

// Make the Course component the default export of this file.
export default Course;