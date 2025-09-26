// src/components/Notification.jsx
const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  // Use the type prop to determine the CSS class
  const className = `notification ${type}`

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification