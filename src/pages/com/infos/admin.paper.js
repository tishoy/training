// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import { initCache, getData, getCache, getRouter } from '../../../utils/helpers';
import { DATA_TYPE_BASE, UPDATE_COMPANY, DATA_TYPE_ADMIN, UPDATE_ADMIN } from '../../../enum';
import Code from '../../../code';
import Lang from '../../../language';

class Admin extends Component {
    state = {
        gotData: false,
        show: "all",
        admin: {
            account: "",
            password: ""
        }
    }
    componentDidMount() {
        window.currentPage = this;
        this.fresh()
    }
    fresh = () => {
        initCache(this.cacheToState);
    }
    cacheToState() {
        window.currentPage.setState({
            gotData: true

        });
        if (getCache(DATA_TYPE_ADMIN) !== undefined) {
            var data = getCache(DATA_TYPE_ADMIN);
            window.currentPage.setState({
                admin: data
            });
        }
    }

    subShow = () => {
        switch (this.state.show) {
            default:
                return (
                    <div className="nyx-info">
                        <List style={{
                            height: "100%"
                        }} disablePadding>
                            <Paper
                                className={"nyx-form"}>
                                <TextField
                                    className="nyx-form-div"
                                    key={"account"}
                                    id="account"
                                    label={Lang[window.Lang].pages.com.infos.admin.account}
                                    value={this.state.admin["account"] === null ? "" : this.state.admin["account"]}
                                    onChange={(event, value) => {

                                        this.setState({

                                            admin: this.state.admin

                                        });
                                    }}
                                    fullWidth>
                                </TextField>
                                <TextField
                                    className="nyx-form-div"
                                    key={"password"}
                                    id="password"
                                    type="password"
                                    label={Lang[window.Lang].pages.com.infos.admin.password}
                                    value={this.state.admin["password"] === null ? "" : this.state.admin["password"]}
                                    onChange={event => {
                                        this.state.admin["password"] = event.target.value;

                                        this.setState({
                                            admin: this.state.admin
                                        });
                                    }}
                                    fullWidth>
                                </TextField>
                                <Button
                                    style={{
                                        position: "relative",
                                        marginTop: "0.5rem"
                                    }}
                                    raised
                                    color="accent"
                                    onClick={() => {
                                        this.submit();
                                    }}
                                    className=""
                                >
                                    {Lang[window.Lang].pages.main.certain_button}
                                </Button>
                            </Paper>
                        </List>
                    </div>
                )
        }
    }

    submit = (sendObj) => {
        var cb = (route, message, arg) => {
            if (message.code === Code.LOGIC_SUCCESS) {
                window.CacheData.admin = arg.data;
                // for (var key in this.state.temObj) {
                //     console.log(temObj);
                //     window.CacheData.admin[key] = this.state.temObj[key];
                // }
            }
        }
        var obj = {
            password: this.state.admin["password"],
        }

        getData(getRouter(UPDATE_ADMIN), { session: sessionStorage.session, admin: obj }, cb, { self: this, data: obj });
    }

    render() {
        return (
            <div style={{ marginTop: 20 }} className={'nyx-page'}>
                <div className={'nyx-company-paper'}>
                    <div>
                        {this.subShow()}
                    </div>
                </div>
            </div>
        );
    }



};

export default Admin;
