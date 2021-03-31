import {
  React,
  Component,
  View
} from '../../library/reactPackage'
import errorLogs from '../../services/ErrorLogs'

import {
  nrLog,
} from '../../../NewRelicRN.js';

class ErrorBoundary extends Component {
  constructor(props){
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo){
    errorLogs(error, errorInfo)
    nrLog(error);
  }
  
  render(){
    return this.state.hasError ? (
      <View />
    ) : (
      this.props.children
    )
  }

}

export default ErrorBoundary

