import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import Table from './component/table';
import Tags from './component/tags';
import data from './generated.json';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: '',
      activeUsers: '',
      activeView: 'users',
      data,
      inActiveUsers: '',
      isModalActive: false,
      modalType: '',
      tags: [],
      tag: '',
    }
  }

  componentWillMount() {
    this.checkData();
    this.getUsers();
  }

  getUsers = () => {
    const t = _.sortBy(data, (o) => (
      o.registered
    )).reverse();

    this.setState({
      activeUsers: _.filter(t, (item) => ( item.isActive )),
      inActiveUsers: _.filter(t, (item) => ( !item.isActive )),
    });
  }

  handleSubmit = (tag, index) => {
    const { activeUsers } = this.state;
    activeUsers[index].tags.push(tag);
    this.setState({ tag: '' });
    this.checkData();
  }

  addTag = (e) => {
    this.setState({ tag: e.target.value });
  }

  setActiveItem = (index) => {
    this.setState({ activeItem: index });
  }

  checkData() {
    const { data } = this.state
    let arr = [];
    data.map((item, i) => (
      item.tags.map(i => (
        arr.push(i)
      ))
    ));
    const count = _.countBy(arr);
    this.setState({ tags: _.map(count, (v, k) => ({ tag: k, count: v })) });
  }

  openModal = (i, type) => {
    this.setState({
      activeItem: i,
      isModalActive: true,
      modalType: type,
    });
  }

  closeModal = () => {
    this.setState({isModalActive: false});
  }

  selectView = (view) => {
    this.setState({ activeView: view })
  }

  /* render */

  renderTagInput = () => {
    const { activeItem, tag  } = this.state
    return (
      <div>
        <div className="field">
          <label className="label">Tag</label>
          <div className="control">
            <input
              className="input"
              onChange={this.addTag}
              placeholder="enter tag"
              type="text"
              value={tag} />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button
              className="button is-primary"
              onClick={() => this.handleSubmit(tag, activeItem)}
            >Submit</button>
          </div>
        </div>
      </div>
    )
  }

  renderUserInfo = () => {
    const { activeItem, inActiveUsers } = this.state;
    return (
      <pre>
        {JSON.stringify(inActiveUsers[activeItem]) }
      </pre>
    )
  }

  renderModal = () => {
    const {  isModalActive, modalType } = this.state
    const modalClass = [ isModalActive ? 'modal is-active' : 'modal' ]
    return (
       <div id="modal-bis" className={modalClass}>
        <div className="modal-background"></div>
        <div className="modal-content">
          { modalType === 'tagInput' && this.renderTagInput() }
          { modalType === 'userInfo' && this.renderUserInfo() }
        </div>
        <button
          className="modal-close is-large"
          onClick={() => this.closeModal()}
        >
        </button>
      </div>
    )
  }

  renderNav = () => {
    const { activeView } = this.state;
    return (
      <div className="field is-grouped">
        <div className="control">
          <button className={`${activeView === `users` && `is-primary`}  button`} onClick={() => this.selectView('users')}>Users</button>
        </div>
        <div className="control">
          <button className={`${activeView === `tags` && `is-primary`}  button`} onClick={() => this.selectView('tags')}>Tags</button>
        </div>
        <div className="control">
          <button className={`${activeView === `retention` && `is-primary`}  button`} onClick={() => this.selectView('retention')}>Retention</button>
        </div>
      </div>
    )
  }

  renderUsers = () => {
    const { activeUsers } = this.state;
    return (
      <Table
        openModal={this.openModal}
        setActiveItem={this.setActiveItem}
        type="active"
        users={activeUsers}
      />
    )
  }

  renderTags = () => {
    const { tags } = this.state;
    return (
      <Tags tags={tags} />
    )
  }

  renderRetention = () => {
    const { inActiveUsers } = this.state;
    return (
      <Table
        openModal={this.openModal} 
        type="inactive"
        users={inActiveUsers}
      />
    )
  }

  render() {
    const { activeView } = this.state
    return (
      <div className="App">
        <div className="App-header">
          { this.renderNav() }
        </div>
        
        { activeView === 'retention' && this.renderRetention() }
        { activeView === 'tags' && this.renderTags() }
        { activeView === 'users' && this.renderUsers() }

        { this.renderModal() }
      </div>
    );
  }
}

export default App;