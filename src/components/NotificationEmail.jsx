import React from 'react';

export const NotificationEmail = ({ firstName, email, provider }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '30px 20px',
      textAlign: 'center',
      borderRadius: '10px 10px 0 0'
    }}>
      <h1 style={{ color: 'white', margin: '0', fontSize: '24px' }}>
        🚀 New Waitlist Signup!
      </h1>
    </div>
    
    <div style={{ 
      backgroundColor: '#ffffff',
      padding: '30px',
      borderRadius: '0 0 10px 10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ color: '#333', marginTop: '0' }}>
        Someone just joined AutoFollowUp! 🎉
      </h2>
      
      <div style={{ 
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        margin: '20px 0',
        borderLeft: '4px solid #667eea'
      }}>
        <h3 style={{ color: '#333', margin: '0 0 15px 0' }}>New Signup Details:</h3>
        <p style={{ margin: '5px 0', color: '#666' }}>
          <strong>Name:</strong> {firstName}
        </p>
        <p style={{ margin: '5px 0', color: '#666' }}>
          <strong>Email:</strong> {email}
        </p>
        <p style={{ margin: '5px 0', color: '#666' }}>
          <strong>Email Provider:</strong> {provider}
        </p>
        <p style={{ margin: '5px 0', color: '#666' }}>
          <strong>Signed up:</strong> {new Date().toLocaleString()}
        </p>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <p style={{ color: '#999', fontSize: '14px' }}>
          AutoFollowUp Waitlist Notification<br/>
          Keep building! 💪
        </p>
      </div>
    </div>
  </div>
);