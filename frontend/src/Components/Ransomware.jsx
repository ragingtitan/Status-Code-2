import React from 'react'
import { AppContext } from './AppContext';
import { useContext } from 'react';
const Ransomware = () => {
  const { isRansomwareActive, setIsRansomwareActive } = useContext(AppContext);
  React.useEffect(() => {
    // Trigger a simulated ransomware notification on mount
    const sendSimulation = () => {
      // toast notification (if available)
      if (typeof window.toasts === 'function') {
        try {
          window.toasts('Your files are locked. THIS IS A SIMULATION ONLY!', { type: 'error' })
        } catch (e) {
          // fallback
          console.warn('toasts call failed', e)
        }
      } else {
        // fallback for projects without toasts util
        console.info('SIMULATION TOAST: Your files are locked. THIS IS A SIMULATION ONLY!')
      }

      // popup modal (if available)
      if (typeof window.popupMsg === 'function') {
        try {
          window.popupMsg({
            title: 'Files Encrypted (SIMULATION)',
            message: 'All your files have been locked. THIS IS A SIMULATION ONLY!',
            buttons: [{ text: 'Close' }]
          })
        } catch (e) {
          console.warn('popupMsg call failed', e)
        }
      } else {
        // basic fallback alert
        alert('SIMULATION: All your files have been locked. THIS IS A SIMULATION ONLY!')
      }
    }

    if(isRansomwareActive) {
      sendSimulation()
    }
  }, [isRansomwareActive])

  const triggerSimulation = () => {
    if (typeof window.toasts === 'function') {
      window.toasts('Files locked (simulation)', { type: 'warning' })
    } else {
      console.info('SIMULATION TOAST: Files locked')
    }
    if (typeof window.popupMsg === 'function') {
      window.popupMsg({
        title: 'Simulation: Files Locked',
        message: 'This is only a demonstration message. No real files were harmed.',
        buttons: [{ text: 'Understood' }]
      })
    } else {
      alert('SIMULATION: Files locked. This is only a demonstration.')
    }
  }

  return (
    <div>
      <h3>Ransomware Simulation</h3>
      <p>This component demonstrates popupMsg and toasts usage. THIS IS A SIMULATION ONLY!</p>
      <button onClick={triggerSimulation}>Simulate Lock</button>
    </div>
  )
}

export default Ransomware