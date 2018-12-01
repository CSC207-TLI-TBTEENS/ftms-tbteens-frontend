import React from 'react';
import '../css files/Login.css';

// const google = {
//     textAlign: "center",
//     width: "10rem",
//     backgroundColor: "#bd5045",
//     borderColor: "#ffffff",
//     color: "#ffffff",
// }

// const facebook = {
//     textAlign: "center",
//     width: "10rem",
//     backgroundColor: "#38569E",
//     borderColor: "rgb(71, 117, 209)",
//     color: "rgb(203, 200, 228)",
// }

const fedButton = () => {
    return (
        <div>
            <div className="row justify-content-center mb-1">
                <div className="col-xs-12 col-md-6">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-secondary fb-button">
                            <a href="#" className="fa fa-facebook"></a>
                        </button>
                        <button type="button" className="btn btn-secondary gg-button">                    
                            <a href="#" className="fa fa-google"></a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default fedButton;