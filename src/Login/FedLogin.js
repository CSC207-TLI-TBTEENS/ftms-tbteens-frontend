import React from 'react';

const google = {
    textAlign: "center",
    width: "10rem",
    backgroundColor: "#bd5045",
    borderColor: "#ffffff",
    color: "#ffffff",
}

const facebook = {
    textAlign: "center",
    width: "10rem",
    backgroundColor: "#38569E",
    borderColor: "rgb(71, 117, 209)",
    color: "rgb(203, 200, 228)",
}

const fedButton = () => {
    return (
        <div>
            <div className="row justify-content-center mb-1">
                <div className="col-xs-12 col-md-6">
                    <button type="button" className="btn btn-primary" style={google}>
                        Google
                    </button>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-xs-12 col-md-6">
                    <button type="button" className="btn btn-primary" style={facebook}>
                        Facebook
                    </button>
                </div>
            </div>
        </div>
    )
}

export default fedButton;