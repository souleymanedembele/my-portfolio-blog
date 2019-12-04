import React from 'react'
import styled from 'styled-components';
const defaultState = {
  theme: 'main',
  toggleTheme: {}
}
const ThemeContext = React.createContext(defaultState)

class ThemeProvider extends React.PureComponent {
  state = {
    theme: 'main',
    TransitionVisible: ''
  };

  componentDidMount () {
    const theme = JSON.parse(window.localStorage.getItem('theme'))
      this.setState({ TransitionVisible: 'visible' })
    if (theme) {
      if (theme === 'main') {
        this.setState({ theme: 'main' })
      } else {
        this.setState({ theme: 'dark' })
      }
    }
  }

  toggleTheme = () => {
    this.setState(prevState => ({ theme: prevState.theme === 'main' ? 'dark' : 'main' }), () => {
      // Update app current theme
      window.localStorage.setItem('theme', JSON.stringify(this.state.theme))
    })
  }

  render () {
    const { TransitionVisible } = this.state
    return (
      <ThemeContext.Provider
        value={{
          theme: this.state.theme,
          toggleTheme: this.toggleTheme,
        }}
      >
        <Transition visible={TransitionVisible}>
        {this.props.children}
        </Transition>
      </ThemeContext.Provider>
    )
  }
}

const Transition = styled.div`
width: 100%;
opacity:  ${props => props.visible ? "1" : "0"};
transition: all 1s ease-out;
`

export default ThemeContext
export { ThemeProvider }
