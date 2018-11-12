import React from 'react';
import { Button } from 'element-react';

const style = {
    borderRadius: '1rem',
    backgroundColor: 'rgb(90, 85, 121)',
    color: 'white',
    margin: '0.3rem',
    width: '7rem',
    height: '2.5rem',
    textAlign: 'left',
    marginLeft: "2rem"
}

const style2 = {
    borderRadius: '1rem',
    backgroundColor: '#38569E',
    color: 'white',
    margin: '0.3rem',
    width: '7rem',
    height: '2.5rem',
    textAlign: 'left',
    marginLeft: '1.5rem'
}

const imageStyle = {
    width: '1.5rem',
    height: '1.5rem',
    marginTop: '0.75rem',
    marginLeft: '6.8rem',
    position: 'absolute'
}

const imageStyle2 = {
    width: '1.5rem',
    height: '1.5rem',
    marginTop: '0.75rem',
    marginLeft: '6.5rem',
    position: 'absolute',
    borderRadius: '30%'
}

const fedButton = () => {
    return (
        <div>
            <img src={require('./google-logo.png')} style={imageStyle}></img>
            <Button type="primary" style={style}>Google </Button>
            <img src={require('./facebook-logo.png')} style={imageStyle2}></img>
            <Button type="primary" style={style2}>Facebook </Button>
        </div>
    )
}

export default fedButton;