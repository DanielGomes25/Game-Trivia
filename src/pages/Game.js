import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { returnTokenLocalStorge } from '../services/token';
import Header from '../components/Header';
import { addAssertions } from '../redux/actions';

class Game extends Component {
  state = {
    questions: [],
    answeredQuestions: false,
  };

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = async () => {
    const { history } = this.props;

    try {
      const token = returnTokenLocalStorge();
      const { results } = await (await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)).json();
      if (results.length === 0) {
        throw new Error('Token inválido!');
      }
      this.setState({ questions: results });
    } catch (error) {
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  handleClick = (param) => {
    this.setState({
      answeredQuestions: true,
    });
    const { dispatch } = this.props;
    if (param === 'correto') {
      const number = 1;
      dispatch(addAssertions(number));
    } else {
      const number = 0;
      dispatch(addAssertions(number));
    }
  };

  renderQuestion = (index) => {
    const { questions, answeredQuestions } = this.state;
    const question = questions[index] || {};

    const newArrayIncorrectAnswers = new Set(question.incorrect_answers);
    const incorrectAnswers = [...newArrayIncorrectAnswers];

    const allAnswers = [question.correct_answer, ...incorrectAnswers];

    const answersBtns = allAnswers.map((answer, indexAnswers) => {
      if (indexAnswers === 0) {
        return (
          <button
            key="#"
            data-testid="correct-answer"
            id={ indexAnswers }
            className={ answeredQuestions ? '' : 'correct-answer' }
            onClick={ () => this.handleClick('correto') }
          >
            {answer}
          </button>
        );
      }
      return (
        <button
          key={ indexAnswers }
          data-testid={ `wrong-answer-${indexAnswers - 1}` }
          id={ indexAnswers }
          className={ answeredQuestions ? '' : 'wrong-answer' }
          onClick={ () => this.handleClick('errado') }
        >
          {answer}
        </button>
      );
    });

    const matchRandomParamNumber = 0.5;

    return (
      <div>
        <h1 data-testid="question-category">{ question.category }</h1>
        <h2 data-testid="question-text">{ question.question }</h2>
        <div data-testid="answer-options">
          { answersBtns.sort(() => Math.random() - matchRandomParamNumber) }
        </div>
      </div>
    );
  };

  render() {
    return (
      <main>
        <Header />
        { this.renderQuestion(0) }
      </main>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(null, null)(Game);
