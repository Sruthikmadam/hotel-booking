import React from 'react'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import Roomrate from '../components/Roomrate'
// import Review from '../components/Review'


function Room({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user=localStorage.getItem("currentUser")
  return (
    <div className='container2'>
      <div className="boxes bs" >
        <div className='box1'>
          <img src={room.imageurls[0]} className='smallimg' />
        </div>
        <div className='box2'>
          <h1>{room.name}
            <Roomrate roomId={room._id} />
            {/* <Review roomId={room._id}  /> */}
          </h1>
          <b><p>Max Count:{room.maxcount}</p>
            <p>phone Number:{room.phonenumber}</p>
            <p>type:{room.type}</p>
            <p>rent per day:{room.rentperday}</p></b>

            

          <div >
            {(fromdate && todate) &&user&& (
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
              <button className='btn btn-primary'>Book Now </button></Link>)}

              {(fromdate && todate) &&(!user)&& (
            <Link to='/login'>
              <button className='btn btn-primary'>Login Please </button></Link>)}
           
            <button className='btn btn-primary' onClick={handleShow} style={{ float: '' }}>view details</button>
          </div>
        </div>

      </div>

      <>

        <Modal show={show} onHide={handleClose} size='lg' className='model' >
          <Modal.Header style={{ height: '60px' }} >
            <Modal.Title>{room.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Carousel nextLabel="" prevLabel="" >
              {room.imageurls.map((url) => {
                return (
                  <Carousel.Item>
                    <img
                      className='d-block w-100 bigimg' style={{ height: '280px', objectFit: 'cover' }}
                      src={url}

                    />

                  </Carousel.Item>

                )

              })}
            </Carousel>

            <p>{room.description}</p>
          </Modal.Body>
          <Modal.Footer style={{ height: '60px' }}>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
      </>

    </div>
  )

}

export default Room