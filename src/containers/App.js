import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import { setSearchField, requestRobots } from '../actions.js';

const mapStateToProps = (state) => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
}

class App extends Component {

componentDidMount(){
	this.props.onRequestRobots();

}

	render(){
		const filterRobot = this.props.robots.filter(robots =>{
			return robots.name.toLowerCase().includes(this.props.searchField.toLowerCase())
		})
		return this.props.isPending ?
			<h1>Loading</h1>:
			(
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={this.props.onSearchChange}/>
				<Scroll>
					<CardList robots={filterRobot}/>
				</Scroll>
			</div>
		);
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);