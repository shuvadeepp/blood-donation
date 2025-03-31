import React from 'react';

const NotFound = () => {
    return (
        <div style={{
            fontFamily: 'sans-serif',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            margin: '0',
            backgroundColor: '#f4f4f4'
        }}>
            <div style={{
                textAlign: 'center',
                padding: '40px',
                backgroundColor: 'white',
                borderRadius: '17px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}>
                <h1 style={{
                    fontSize: '4em',
                    color: '#e74c3c',
                    marginBottom: '10px'
                }}>404</h1>
                <p style={{
                    fontSize: '1.2em',
                    color: '#333',
                    marginBottom: '20px'
                }}>Oops! The page you're looking for could not be found.</p>
                <a href="/" style={{
                    textDecoration: 'none',
                    backgroundColor: '#3498db',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    transition: 'background-color 0.3s ease'
                }} onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'} onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}>Go back to Home</a>
            </div>
        </div>
    );
};

export default NotFound;