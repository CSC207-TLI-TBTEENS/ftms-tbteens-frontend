import React from 'react';

const style1 = {
    textAlign: "center",
    width: "10rem",
    margin: "1vh",
    borderColor: "rgb(71, 117, 209)",
    color: "rgb(32, 30, 46)",
}

const style2 = {
    textAlign: "center",
    width: "10rem",
    margin: "1vh",
    backgroundColor: "#38569E",
    borderColor: "rgb(71, 117, 209)",
    color: "rgb(203, 200, 228)",
}

// const imageStyle = {
//     width: '2vw',
//     height: '3.5vh',
//     marginLeft: "6.5vw",
//     display: "flex"
// }

// const imageStyle2 = {
//     width: '2vw',
//     height: '3.5vh',
//     marginLeft: '6.5vw',
//     display: "flex"
// }

const fedButton = () => {
    return (
        <div>
            <button type="button" class="btn" style={style1}>
                Google</button>
            <button type="button" class="btn" style={style2}>
                Facebook
            </button>
        </div>
    )
}

export default fedButton;