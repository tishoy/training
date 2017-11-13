import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import GridList from 'material-ui/Grid';
import List, {
    ListItem, ListItemSecondaryAction, ListItemText,
    ListSubheader,
} from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Card, { CardHeader, CardActions, CardContent, CardMedia } from 'material-ui/Card';

import { initCache, getData, getRouter, getCache, getCity, getCourse } from '../../utils/helpers';
import {
    LAST_COUNT, DATA_TYPE_BASE,UPDATE_COUNT, DATA_TYPE_CLAZZ, STATUS_ENROLLED, STATUS_ARRANGED, STATUS_ARRANGED_DOING, STATUS_ARRANGED_UNDO,
    STATUS_ENROLLED_DID, STATUS_EXAMING, STATUS_EXAMING_DID, STATUS_PASSED, STATUS_PASSED_DID, QUERY, DATA_TYPE_STUDENT
} from '../../enum';
import Lang from '../../language';
import Code from '../../code';

import CommonAlert from '../../components/CommonAlert';

class Home extends Component {

    state = {
        // 数据状态
        name: "",
        arranged_nums: 0,
        all_students_nums: 0,
        registered_nums: 0,
        all_registered_nums: 0,
        clazzes: [],
        areas: [],
        // 界面状态

        // 提示状态
        alertOpen: false,
        alertType: "alert",
        alertCode: Code.LOGIC_SUCCESS,
        alertContent: "登录成功"
    };

    componentWillMount() {
        window.currentPage = this;
        this.fresh()
    }

    fresh = () => {
        initCache(this.cacheToState);
    }


    cacheToState() {
        var cb = (router, message, arg) => {
            window.currentPage.setState({
                areas: message.data.info.areas,
                clazzes: window.CacheData.clazzes,
                arranged_nums: message.data.info.sum.all_arrange_count,
                all_students_nums: message.data.info.sum.all_count,
                //已临时登记人数
                registered_nums:  message.data.info.sum.registered_nums,
                all_registered_nums: message.data.info.sum.all_registered_nums
                // arranged_nums: message.data.info.sum.all_student_inlist,
                // all_students_nums: message.data.info.sum.all_student_reg,
            })
            // all_students
        }
        getData(getRouter(LAST_COUNT), { session: sessionStorage.session }, cb, {});
    }

    popUpNotice = (type, code, content) => {
        this.setState({ type: type, code: code, content: content, alertOpen: true });
    }

    render() {
        return (
            <div>
                <div
                    style={{ paddingTop: 80, paddingLeft: 40, justifyContent: 'space-between' }}
                >
                    <div style={{ margin: 10, width: 400, float: "left" }}>
                        <Paper id="companyid" width="500px">
                            <Typography type="headline" component="h5">
                                {this.state.name}
                            </Typography>
                            <Typography type="body1" component="p">
                                {Lang[window.Lang].pages.org.home.arranged + "/" + Lang[window.Lang].pages.org.home.all_students + ":"
                                    + this.state.arranged_nums + Lang[window.Lang].pages.com.home.human + "/" + this.state.all_students_nums + Lang[window.Lang].pages.com.home.human}
                            <br/>{Lang[window.Lang].pages.org.home.registered + "/" + Lang[window.Lang].pages.org.home.all_registered + ":"
                                    + this.state.registered_nums + Lang[window.Lang].pages.com.home.human + "/" + this.state.all_registered_nums + Lang[window.Lang].pages.com.home.human}
                            <button
                            className="nyx-home-button"
                            onClick={()=>{
                                var cb = (router, message, arg) => {
                                    window.currentPage.setState({
                                        areas: message.data.info.areas,
                                        clazzes: window.CacheData.clazzes,
                                        arranged_nums: message.data.info.sum.all_arrange_count,
                                        all_students_nums: message.data.info.sum.all_count,
                                        //已临时登记人数
                                        registered_nums:  message.data.info.sum.registered_nums,
                                        all_registered_nums: message.data.info.sum.all_registered_nums
                                        // arranged_nums: message.data.info.sum.all_student_inlist,
                                        // all_students_nums: message.data.info.sum.all_student_reg,
                                    })
                                    // all_students
                                }
                                 getData(getRouter(UPDATE_COUNT),{ session: sessionStorage.session }, cb, {});
                                //console.log("刷新数据");
                            }}
                            >刷新数据</button>
                            </Typography>

                        </Paper>
                    </div>
                    <div className="nyx-areacount-list">
                        <div className="nyx-areacount-title">各省市报名情况</div>
                        {this.state.areas.map(area => {
                            var all_num = this.state.all_students_nums;
                            var m_all_count = area.m_count ? area.m_count : 0;
                            var m_arrange_count = area.m_arrange_count ? area.m_arrange_count : 0;
                            var h_all_count = area.h_count ? area.h_count : 0;
                            var h_arrange_count = area.h_arrange_count ? area.h_arrange_count : 0;
                            var m_pre_all = 100 * m_all_count / all_num;
                            var m_pre_arr = 100 * m_arrange_count / all_num;
                            var h_pre_all = 100 * h_all_count / all_num;
                            var h_pre_arr = 100 * h_arrange_count / all_num;

                            return (
                                <div key={area.area_id} className="nyx-areacount-list-item">
                                    <div className="nyx-area-name">{area.area_name}</div>
                                    <div className="nyx-area-bar">
                                        <span className="nyx-area-bar-left">中级</span>
                                        <span className="nyx-area-bar-mid">
                                            <span className="nyx-area-bar-bot" style={{ width: m_pre_all + "%" }}> </span>
                                            <span className="nyx-area-bar-top" style={{ width: m_pre_arr + "%" }}> </span>
                                        </span>
                                        <span className="nyx-area-bar-right">{area.m_arrange_count ? area.m_arrange_count : 0}/{area.m_count ? area.m_count : 0}</span>
                                    </div>
                                    <div className="nyx-area-bar">
                                        <span className="nyx-area-bar-left">高级</span>
                                        <span className="nyx-area-bar-mid">
                                            <span className="nyx-area-bar-bot" style={{ width: h_pre_all + "%" }}> </span>
                                            <span className="nyx-area-bar-top" style={{ width: h_pre_arr + "%" }}> </span>
                                        </span>
                                        <span className="nyx-area-bar-right">{area.h_arrange_count ? area.h_arrange_count : 0}/{area.h_count ? area.h_count : 0}</span>
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                    <div style={{ margin: 10, width: 400, float: "left" }}>
                        <Paper elevation={4}>

                            <List subheader={<ListSubheader>{Lang[window.Lang].pages.com.home.clazz_title}</ListSubheader>}>
                                {/* {this.state.clazzes.map(value =>
                                    <ListItem dense button key={value}>
                                        <ListItemText primary={`班级 ${value + 1}`} />
                                        <ListItemSecondaryAction>

                                        </ListItemSecondaryAction>
                                    </ListItem>,
                                )} */}
                            </List>


                        </Paper>

                    </div>
                </div>
                <CommonAlert
                    show={this.state.alertOpen}
                    type={this.state.alertType}
                    code={this.state.alertCode}
                    content={this.state.alertContent}
                    handleCertainClose={() => {
                        this.setState({ alertOpen: false });
                    }}
                    handleCancelClose={() => {
                        this.setState({ alertOpen: false })
                    }}>
                </CommonAlert>
            </div>
        )
    }
}

export default Home;