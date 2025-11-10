import { toast } from 'react-hot-toast';

export function showError(message) {
  toast.custom((t) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '320px',
        width: '100%',
        backgroundColor: '#FF3333',
        color: '#fff',
        padding: '12px 16px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        opacity: t.visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <span>{message || 'Something went wrong!'}</span>
      <button
        onClick={() => toast.dismiss(t.id)}
        style={{
          marginLeft: '12px',
          fontWeight: 'bold',
          background: 'transparent',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        ✖
      </button>
    </div>
  ), {
    position: 'top-right',
    duration: 2500,
  });
}

export function showSuccess(message) {
  toast.custom((t) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '320px',
        width: '100%',
        backgroundColor: '#4BB543',
        color: '#fff',
        padding: '12px 16px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        opacity: t.visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <span>{message || 'Success!'}</span>
      <button
        onClick={() => toast.dismiss(t.id)}
        style={{
          marginLeft: '12px',
          fontWeight: 'bold',
          background: 'transparent',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        ✖
      </button>
    </div>
  ), {
    position: 'top-right',
    duration: 2500,
  });
}
