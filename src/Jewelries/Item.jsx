import React from 'react'
import { items } from "./images";
import "./item.css"

export const Item = () => {

    return (
        <section className='item-container'>
            {
                items.map((item) => (
                    <div className='block'>
                        <img src={item.img} key={item.id} className='items' alt='jewerly' />
                        <span className='code'>{item.code}</span>
                        <span className='cash'>{item.cash}</span>
                    </div>
                )
                )
            }
        </section>
    )
}