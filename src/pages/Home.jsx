import React, { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsActions";
import {Link} from 'react-router-dom'
import { Col, Row , Divider , DatePicker, Checkbox} from 'antd' ;
import moment from 'moment'
import Spinner from '../components/Spinner';

const {RangePicker} = DatePicker

function Home() {

    const {cars} = useSelector(state=>state.carsReducer)
    const {loading} = useSelector(state=>state.alertsReducer)
    const [totalCars , setTotalcars] = useState([])
    const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCars()) ;
  } , [])  

  useEffect(() => {
    setTotalcars(cars) 
  }, [cars]) 

function setFilter(dates , dateStrings) {

    const selectedFrom = moment(dateStrings[0]) ;
    const selectedTo = moment(dateStrings[1]) ;

    console.log(selectedFrom) ;
    console.log(selectedTo) ;
  
    const temp = [] ;
  
    for (const car of cars) {

      let isAvailable = true ;
  
      for (const booking of car.bookedTimeSlots) {
        const bookingFrom = moment(booking.from) ;
        const bookingTo = moment(booking.to) ;
  
        if (
          (selectedFrom.isSameOrBefore(bookingTo) && selectedTo.isSameOrAfter(bookingFrom)) 
        ) {
          isAvailable = false;
          break; // No need to check further bookings
        }
      }
  
      if (isAvailable) {
        temp.push(car);
      }
    }
  
    setTotalcars(temp);
}
  

    return (
        <DefaultLayout>
        
        <Row className='mt-3' justify='center'>
                 
                 <Col lg={20} sm={24} className='d-flex justify-content-left'>

                <RangePicker
                    ranges={{
                    Today: [moment(), moment()],
                    "This Month": [moment(), moment().endOf("month")]
                    }}
                    showTime
                    format="YYYY/MM/DD HH:mm:ss"
                    onChange={setFilter}
                />
                 
                 </Col>

        </Row>

        {loading === true && (<Spinner/>)}
              
        <Row justify='center' gutter={16}>

             {totalCars.map(car=>{ 
                 return <Col lg={5} sm={24} xs={24}>
                      <div className="car p-2 bs1">
                         <img src={car.image} className="carimg"/>

                         <div className="car-content d-flex align-items-center justify-content-between">

                              <div className='text-left pl-2'>
                                  <p>{car.name}</p>
                                  <p> Rent Per Hour {car.rentPerHour} /-</p>
                              </div>

                              <div>
                                  <button className="btn1 mr-2"><Link to={`/booking/${car._id}`}>Book Now</Link></button>
                              </div>

                         </div>
                      </div>
                 </Col>
             })}

        </Row>
        </DefaultLayout>
    )
    
}

export default Home ;

// parallel execution of code happening