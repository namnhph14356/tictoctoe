import React from 'react'
import styles from './square.module.css'

export const index = (props) => {
  return (
    <button className="btn" onClick={props.handlePlay}>{props.value}</button>
  )
}
export default index