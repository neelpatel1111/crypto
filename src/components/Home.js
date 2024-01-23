import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [serach_value,setSearch_value] = useState("");
    const [crypt_data,setCrypt_data] = useState([]);

    useEffect(()=>{
        axios.get(`https://api.coincap.io/v2/assets`)
             .then((res)=>{setCrypt_data(res.data.data)});
    });

    return (
        <div className="container w-75 m-auto">
            <h3 className='text-success my-3'>Cryptocurrencies</h3>
            <div>
                <input className="form-control w-50 my-3" value={serach_value} onChange={(e)=>{setSearch_value(e.target.value)}} placeholder='Search Here...' />
                <div className='table-responsive'>
                    <table className='table table-striped mt-4'>
                        <thead className='table-dark'>
                            <tr >
                                <th scope="col">RANK</th>
                                <th scope="col">Name</th>
                                <th scope="col">Symbol</th>
                                <th scope="col">Price($ USD)</th>
                                <th scope="col">ChangeIn24Hr(%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {crypt_data.filter((val) => {
                                return val.name.toLowerCase().includes(serach_value.toLowerCase());
                            }).map((item)=>(
                                
                                <tr>
                                    <td >{item.rank}</td>
                                    <td><Link to={`/chart/${item.id}`} >{item.name}</Link></td>
                                    <td>{item.symbol}</td>
                                    <td>{parseFloat(item.priceUsd).toFixed(3)}</td>
                                    <td>{parseFloat(item.changePercent24Hr).toFixed(3)}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            </div>
    )
}

export default Home
