import React from 'react';

interface State { hasError: boolean; error: any; }

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      const msg = this.state.error?.message || String(this.state.error);
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#d1dbd2] p-8">
          <div className="bg-red-100 border border-red-400 rounded-2xl p-8 max-w-2xl w-full">
            <h1 className="text-2xl font-black text-red-800 mb-4">DEBUG ERROR</h1>
            <p className="font-mono text-red-700 text-sm break-all">{msg}</p>
            <pre className="mt-4 text-xs text-red-600 overflow-auto">{this.state.error?.stack}</pre>
            <button onClick={() => this.setState({ hasError: false, error: null })} className="mt-6 px-4 py-2 bg-red-600 text-white rounded-full font-bold">Reset</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
