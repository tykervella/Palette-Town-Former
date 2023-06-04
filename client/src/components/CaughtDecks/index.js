import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CaughtDecks = () => {
    return (
        <Container>
            <Row className=''>
                <Col className='border border-black rounded-xl bg-slate-600 mt-10'>
                    <div>  </div>
                </Col>

                <Col className='border border-black rounded-xl bg-slate-600 mt-10'>
                    <div>  </div>
                </Col>

                <Col className='border border-black rounded-xl bg-slate-600 mt-10'>
                    <div>  </div>
                </Col>
            </Row>

        </Container>
    )
}

export default CaughtDecks;