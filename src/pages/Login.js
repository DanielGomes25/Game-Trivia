import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { saveTokenInLocalStorage } from '../services/token';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    saveTokenInLocalStorage();
    const { name, email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(addPlayer(name));
    dispatch(addEmail(email));
    history.push('/game');
  };

  render() {
    const { history } = this.props;
    const { name, email } = this.state;
    return (
      <form>
        <div>Login</div>
        <input
          type="text"
          data-testid="input-player-name"
          name="name"
          value={ name }
          onChange={ this.handleChange }
          placeholder="name"
          required
        />
        <input
          type="text"
          data-testid="input-gravatar-email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          placeholder="email"
          required
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !email || !name }
          onClick={ this.handleClick }
        >
          Play
        </button>
        <Link to="/configuracoes">
          <button
            data-testid="btn-settings"

          >
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
