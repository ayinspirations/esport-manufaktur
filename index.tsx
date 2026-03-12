
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global suppression and architectural fix for ResizeObserver loop errors
if (typeof window !== 'undefined') {
  // Force scroll to top on refresh
  if (window.history.scrollRestoration) {
    window.history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
  
  window.addEventListener('load', () => {
    window.scrollTo(0, 0);
  });

  // Handle refresh at #home to force top scroll
  if (window.location.hash === '#home' || window.location.hash === '') {
    window.scrollTo(0, 0);
  }

  // 1. Monkey-patch ResizeObserver to prevent the error at the source
  // This wraps the observer callback in requestAnimationFrame to decouple layout changes from the observation turn.
  const RO = window.ResizeObserver;
  window.ResizeObserver = class ResizeObserver extends RO {
    constructor(callback: ResizeObserverCallback) {
      super((entries, observer) => {
        window.requestAnimationFrame(() => {
          if (!Array.isArray(entries) || !entries.length) {
            return;
          }
          callback(entries, observer);
        });
      });
    }
  };

  // 2. Fallback suppression for existing/cached errors or browser-specific edge cases
  const isResizeObserverError = (error: any) => {
    const message = (typeof error === 'string' ? error : error?.message || error?.reason?.message || '').toString();
    return (
      message.includes('ResizeObserver loop completed with undelivered notifications') || 
      message.includes('ResizeObserver loop limit exceeded')
    );
  };

  // Suppress from console.error
  const originalError = console.error;
  console.error = (...args: any[]) => {
    if (args.length > 0 && isResizeObserverError(args[0])) return;
    originalError.apply(console, args);
  };

  // Suppress from window error events
  window.addEventListener('error', (e) => {
    if (isResizeObserverError(e.message) || isResizeObserverError(e.error)) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();
    }
  }, true);

  // Suppress from unhandled promise rejections
  window.addEventListener('unhandledrejection', (e) => {
    if (isResizeObserverError(e.reason)) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();
    }
  }, true);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
