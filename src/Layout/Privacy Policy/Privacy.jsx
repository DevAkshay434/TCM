import React from 'react'
import Container from '../../Component/Container'

const Privacy = ({pages}) => {
  return (
    <section className='privacy-policy'>
      <Container heading={pages.heading} paragraph={pages.content}  />
      </section>
  )
}

export default Privacy
