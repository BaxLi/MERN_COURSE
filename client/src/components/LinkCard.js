import React from 'react'
export const LinkCard = ({ link }) => {
    console.log("LinkCard link=", link)
  return (
    <div>
      <h1>{`LinkCard.js Goes->to =`}</h1>
      <p>Ваша ссылка: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
      <p>Откуда: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
      <p>Количество кликов по ссылке: <strong>{link.cliks}</strong></p>
      <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
    </div>
  )
}
