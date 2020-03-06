import React, { Component } from "react";
import "./style.scss";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Oops something went wrong!</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
