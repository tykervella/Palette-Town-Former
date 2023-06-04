import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CaughtDecks = () => {
    return (
        <Container>
            <Row className=''>
                <Col xs="4" className='border border-black rounded-xl bg-slate-600 mt-10'>
                    <div> .col-4 </div>
                </Col>

                <Col xs="4" className='border border-black rounded-xl bg-slate-600 mt-10'>
                    <div> .col-4 </div>
                </Col>

                <Col xs="4" className='border border-black rounded-xl bg-slate-600 mt-10'>
                    <div> .col-4 </div>
                </Col>
            </Row>

        </Container>
    )
}

export default CaughtDecks;