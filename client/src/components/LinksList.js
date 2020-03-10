import React from 'react'
import { Link } from 'react-router-dom'
export const LinksList = ({ links }) => {
  if (!links.length) {
    return <div> No links yet ....</div>
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Link</th>
          <th>origin</th>
          <th>clicked</th>
          <th>Shortcut</th>
        </tr>
      </thead>

      <tbody>
        {links.map(link => {
          return (
            <tr key={link._id}>
              <td>
                <Link to={`/detail/${link._id}`}>OPEN</Link>
              </td>
              <td>{link.from}</td>
              <td>{link.cliks}</td>
              <td>{link.to}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
