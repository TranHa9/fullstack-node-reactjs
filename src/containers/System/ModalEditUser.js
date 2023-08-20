import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';


class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            roleId: '',
        }
    }


    componentDidMount() {
        let user = this.props.userEdit;
        if (user && !_.isEmpty(user))//check có user và user không rỗng
        {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phonenumber: user.phonenumber,
                gender: user.gender,
                roleId: user.roleId,
            })
        }
    }

    toggle = () => {
        this.props.toggleUserModal()
    }

    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValideInput = () => {
        this.setState({
            errMessage: ""
        })
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber', 'gender', 'roleId'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                this.setState({
                    errCode: arrInput[i],
                    errMessage: "miss parameter: " + arrInput[i]
                })
                //alert('miss parameter:' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveUser = async () => {
        let isValid = this.checkValideInput();

        if (isValid === true) {
            this.props.editUser(this.state)
        }
    }

    render() {

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()}>Edit a user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email:</label>
                            <input type='email'
                                // onChange={(event) => this.handleOnchangeEmail(event)}
                                onChange={(event) => this.handleOnchangeInput(event, "email")}
                                value={this.state.email}
                                disabled
                            />
                            <div className='col-12' style={{ color: 'red' }}>
                                {

                                    this.state.errCode === "email" ? this.state.errMessage : ''
                                }
                                {this.props.errMessage}
                            </div>
                        </div>

                        <div className='input-container'>
                            <label>Password:</label>
                            <input type='password'
                                onChange={(event) => this.handleOnchangeInput(event, "password")}
                                value={this.state.password}
                                disabled
                            />
                            <div className='col-12' style={{ color: 'red' }}>
                                {
                                    this.state.errCode === "password" ? this.state.errMessage : ''
                                }
                            </div>
                        </div>
                        <div className='input-container'>
                            <label>First Name:</label>
                            <input type='text'
                                onChange={(event) => this.handleOnchangeInput(event, "firstName")}
                                value={this.state.firstName}
                            />
                            <div className='col-12' style={{ color: 'red' }}>
                                {
                                    this.state.errCode === "firstName" ? this.state.errMessage : ''
                                }
                            </div>
                        </div>
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input type='text'
                                onChange={(event) => this.handleOnchangeInput(event, "lastName")}
                                value={this.state.lastName}
                            />
                            <div className='col-12' style={{ color: 'red' }}>
                                {
                                    this.state.errCode === "lastName" ? this.state.errMessage : ''
                                }
                            </div>
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address:</label>
                            <input type='text'
                                onChange={(event) => this.handleOnchangeInput(event, "address")}
                                value={this.state.address}
                            />
                            <div className='col-12' style={{ color: 'red' }}>
                                {
                                    this.state.errCode === "address" ? this.state.errMessage : ''
                                }
                            </div>
                        </div>
                        <div className='input-container'>
                            <label>Phone Number:</label>
                            <input type='text'
                                onChange={(event) => this.handleOnchangeInput(event, "phonenumber")}
                                value={this.state.phonenumber}
                            />
                            <div className='col-12' style={{ color: 'red' }}>
                                {
                                    this.state.errCode === "phonenumber" ? this.state.errMessage : ''
                                }
                            </div>
                        </div>
                        <div className='input-container min-width-input'>
                            <label htmlFor="inputState">Sex</label>
                            <select name="gender"
                                onChange={(event) => this.handleOnchangeInput(event, "gender")}
                            >
                                {/* <option value={this.state.gender}></option> */}
                                <option value="">
                                    {this.state.gender === '1' ? 'Male' : 'Female'}
                                </option>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>
                            <div className='col-12' style={{ color: 'red' }}>
                                {
                                    this.state.errCode === "gender" ? this.state.errMessage : ''
                                }
                            </div>
                        </div>
                        <div className='input-container min-width-input'>
                            <label htmlFor="inputZip">Role</label>
                            <select name="roleId"
                                onChange={(event) => this.handleOnchangeInput(event, "roleId")}
                                disabled
                            >
                                {/* <option value={this.state.roleId}></option> */}
                                <option value="">
                                    {this.state.roleId === '1' && 'Admin'}
                                    {this.state.roleId === '2' && 'Doctor'}
                                    {this.state.roleId === '3' && 'Patient'}
                                </option>
                                <option value="1">Admin</option>
                                <option value="2">Doctor</option>
                                <option value="3">Patient</option>
                            </select>
                            <div className='col-12' style={{ color: 'red' }}>
                                {
                                    this.state.errCode === "roleId" ? this.state.errMessage : ''
                                }
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => this.handleSaveUser()}>Save Changes</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => this.toggle()}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



