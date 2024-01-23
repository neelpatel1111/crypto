import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from "react-chartjs-2";
import { Chart as Chartjs, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js/auto';
import { Link } from 'react-router-dom';

Chartjs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const Chart = () => {
  const { id } = useParams();
  const [chartdata, setChartdata] = useState({});
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [timeframe, setTimeframe] = useState('m15');

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.coincap.io/v2/assets/${id}/history?interval=${timeframe}`);
      const data = response.data.data;

      if (data !== undefined && data.length > 0) {
        setChartdata({
          labels: data.map((item) => item.date.slice(0,19)),
          datasets: [
            {
              label: "Price(USD)",
              data: data.map((item) => item.priceUsd),
              backgroundColor: 'dodger',
              borderWidth: 3,
              borderColor :'dodgerblue',
            }
          ]
        });
      } 
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const fetchInfo = async () => {
    try {
      const response = await axios.get(`https://api.coincap.io/v2/assets/${id}`);
      const data = response.data.data;

      if (data !== undefined) {
        setInfo(data)
      } 
    } catch (error) {
      console.log(error)
    } 
  };

  useEffect(() => {
    fetchData();
    fetchInfo();
  }); 
  return (
    <>
      <Link to="/" className='btn btn-outline-dark mt-3 mx-3'>Back</Link>

      <div className='container'>   
        <div className='row'>

            <div className='col-lg-8'>
              <div className='m-2'>
                  <h3 className='text-primary mx-4'>Chart of {id}({timeframe})</h3>
                  {loading ? (
                    <div>Loading...</div>
                  ) : (

                    <Line data={chartdata} 
                      options={ {
                        elements: { 
                          point:{ 
                            radius: 0 
                          } 
                        },
                        plugins: {
                          legend: {
                            display: false
                          }
                        }
                      }}/>

                  )}

                  {/* //Timeline Controller */}
                  <div className='mx-5'>
                      <button className='btn btn-primary mx-1' onClick={(e)=>{setTimeframe('m15')}}>15m</button>
                      <button className='btn btn-primary mx-1' onClick={(e)=>{setTimeframe('h1')}}>1h</button>
                      <button className='btn btn-primary mx-1' onClick={(e)=>{setTimeframe('h6')}}>6h</button>
                      <button className='btn btn-primary mx-1' onClick={(e)=>{setTimeframe('d1')}}>1d</button>
                  </div>
              </div>
            </div>


            <div className='col-lg-4'>
                <div className='m-2 mt-5 p-2 border rounded'>
                  <h5><b className=' text-success '>Name: </b>{info.name}</h5>
                  <h5><b className=' text-success '>Symbol: </b>{info.symbol}</h5>
                  <h5><b className=' text-success '>Market Cap. (USD) : </b>{parseFloat(info.marketCapUsd).toFixed(3)}</h5>
                  <h5><b className=' text-success '>Current Price(USD): </b>{parseFloat(info.priceUsd).toFixed(3)}</h5>
                  <h5><b className=' text-success '>Change % 24hr: </b>{parseFloat(info.changePercent24Hr).toFixed(3)}</h5>
                  <h5><b className=' text-success '>Volume USD 24hr: </b>{parseFloat(info.volumeUsd24Hr).toFixed(3)}</h5>
                  <h5><b className=' text-success '>export: </b><a href={`https://www.blockchain.com/explorer/assets/${info.symbol}`}>Click here...</a></h5>
                </div>
            </div>

        </div>
      </div>
    </>
  );
};

export default Chart;