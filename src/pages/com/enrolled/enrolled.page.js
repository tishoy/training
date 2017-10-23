import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import List, {
    ListItem, ListItemSecondaryAction, ListItemText,
    ListSubheader,
} from 'material-ui/List';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';

import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui-icons/ArrowBack';

import StudentCard from '../studentCard.js';

import { initCache, getData, getRouter, getStudent, getCache } from '../../../utils/helpers';
import {
    UPDATE_STUDENT, INSERT_STUDENT, QUERY, ENROLL_STUDENT, EXIT_CLASS, STATUS_ENROLLED, AGREE_ARRANGE, REFUSE_ARRANGE, DATA_TYPE_STUDENT, STATUS_ARRANGED_DOING,
    STATUS_ENROLLED_UNDO, STATUS_ARRANGED_UNDO, STATUS_AGREED_AGREE, STATUS_ENROLLED_DID, STATUS_ARRANGED, STATUS_AGREED,
    CARD_TYPE_ENROLL, CARD_TYPE_ARRANGE, CARD_TYPE_UNARRANGE, STATUS_ARRANGED_DID, ALERT, STATUS_AGREED_REFUSED
} from '../../../enum';
import Lang from '../../../language';
import Code from '../../../code';

import CommonAlert from '../../../components/CommonAlert';

const Style = {
    paper: { margin: 10, width: 400, float: "left" }
}

class Enrolled extends Component {
    state = {
        students: [],
        newStudents: [],
        unarragedStudents: [],
        arrangedStudents: [],
        // 界面状态
        selectedStudentId: undefined,
        selected: {},
        showInfo: false,
        right: false,
        // 提示状态
        alertOpen: false,
        alertType: ALERT,
        alertCode: Code.LOGIC_SUCCESS,
        alertContent: "",
        alertAction: [],
        openNewStudentDialog: false
    };


    componentWillMount() {
        window.currentPage = this;
        this.fresh()
    }

    fresh = () => {
        initCache(this.cacheToState);
    }

    cacheToState() {
        // 设置界面
        var students = getCache(DATA_TYPE_STUDENT);
        window.currentPage.state.students = students === undefined ? [] : students;
        window.currentPage.updateStudents();
    }

    updateStudents = () => {
        let newStudents = [], unarragedStudents = [], arrangedStudents = [];
        for (var i = 0; i < this.state.students.length; i++) {

            if (this.state.students[i].is_inlist == STATUS_ENROLLED_UNDO) {
                newStudents.push(this.state.students[i]);
            }
            if (this.state.students[i].is_inlist == STATUS_ENROLLED_DID) {
                unarragedStudents.push(this.state.students[i]);
            }
            if (this.state.students[i].is_inlist == STATUS_ARRANGED_DID) {
                arrangedStudents.push(this.state.students[i]);
            }
        }
        this.setState({
            newStudents: newStudents,
            unarragedStudents: unarragedStudents,
            arrangedStudents: arrangedStudents
        })
    }

    // 将新加入的学生排队
    erollStudent() {
        var id = this.state.selectedStudentId;
        var cb = (router, message, arg) => {
            if (message.code === 0) {
                let student = getStudent(arg.id);
                student.is_inlist = STATUS_ENROLLED_DID;
                this.updateStudents();
            }
        }
        getData(getRouter(ENROLL_STUDENT), { session: sessionStorage.session, id: id }, cb, { id: id });
    }

    newStudent(student) {
        var cb = (route, message, arg) => {
            if (message.code === Code.LOGIC_SUCCESS) {
                console.log("222")
                window.CacheData.students.push(Object.assign(arg.student, { id: message.id }));
                this.fresh();
            }
            this.handleRequestClose()
        }
        getData(getRouter(INSERT_STUDENT), { session: sessionStorage.session, student: student }, cb, { student: student });
    }

    removeStudent(id) {
        var cb = (route, message, arg) => {
            if (message.code === Code.REMOVE_SUCCESS) {
                for (var i = 0; i < window.CacheData.students.length; i++) {
                    if (window.CacheData.students[i].id === arg.id) {
                        window.CacheData.students.splice(i, 1);
                        // this.setState({
                        //     students: this.state.students
                        // })
                        break;
                    }
                }
                this.fresh();
            }
            this.popUpNotice(NOTICE, message.code, Lang[window.Lang].ErrorCode[message.code]);
        }
        getData(getRouter(UPDATE_COMPANY), { session: sessionStorage.session, id: id }, cb, { id: id });
    }

    kickClazz() {
        var id = this.state.selectedStudentId;
        var cb = (router, message, arg) => {
            if (message.code === Code.LOGIC_SUCCESS) {
                // let student = getStudent(arg.id);
                // student.status[STATUS_ENROLLED].status = STATUS_ENROLLED_DID;
                // student.status[STATUS_ARRANGED].status = STATUS_ARRANGED_UNDO;
                // this.fresh();
            }
        }
        getData(getRouter(EXIT_CLASS), { session: sessionStorage.session, id: id }, cb, { id: id });
    }

    agreeArrange() {
        var id = this.state.selectedStudentId;
        var cb = (router, message, arg) => {
            if (message.code === Code.LOGIC_SUCCESS) {
                getStudent(arg.id).is_inlist = STATUS_ARRANGED_DID;
                this.fresh();
            }
        }
        getData(getRouter(AGREE_ARRANGE), { session: sessionStorage.session, id: id }, cb, { id: id });
    }

    refuseArrange() {
        var id = this.state.selectedStudentId;
        var cb = (router, message, arg) => {
            if (message.code === Code.LOGIC_SUCCESS) {
                let student = getStudent(arg.id);
                student.status[STATUS_AGREED].status = STATUS_AGREED_REFUSED;
                student.status[STATUS_ARRANGED].status = STATUS_ARRANGED_UNDO;
                this.fresh();
            }
        }
        getData(getRouter(REFUSE_ARRANGE), { session: sessionStorage.session, id: id }, cb, { id: id });
    }

    newStudentDialog() {

        return (
            <Dialog open={this.state.openNewStudentDialog} onRequestClose={this.handleRequestClose} >
                <DialogTitle>
                    新增学员
                </DialogTitle>
                <DialogContent>
                    <div>
                        <Typography type="headline" component="h3">
                            {Lang[window.Lang].pages.com.students.title}
                        </Typography>
                        <TextField
                            id="new_name"
                            label={Lang[window.Lang].pages.com.students.name}
                            defaultValue={""}
                            fullWidth
                        />
                        <TextField
                            id="new_tel"
                            label={Lang[window.Lang].pages.com.students.tel}
                            defaultValue={""}
                            fullWidth
                        />
                        <TextField
                            id="new_mail"
                            label={Lang[window.Lang].pages.com.students.email}
                            defaultValue={""}
                            fullWidth
                        />
                        <TextField
                            id="new_level"
                            label={Lang[window.Lang].pages.com.students.level.title}
                            defaultValue={1}
                            fullWidth
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <div>
                        <Button
                            onClick={() => {
                                this.newStudent({
                                    name: document.getElementById("new_name").value === "" ? "未命名" + new Date().getTime() : document.getElementById("new_name").value,
                                    mobile: document.getElementById("new_tel").value,
                                    mail: document.getElementById("new_mail").value,
                                    course_id: document.getElementById("new_level").value,
                                })
                            }}
                        >
                            {Lang[window.Lang].pages.main.certain_button}
                        </Button>
                        <Button
                            onClick={() => {
                                this.handleRequestClose()
                            }}
                        >
                            {Lang[window.Lang].pages.main.cancel_button}
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        )
    }

    handleRequestClose = () => {
        this.setState({
            openNewStudentDialog: false
        })
    }

    closeNotice = () => {
        this.setState({
            alertOpen: false,
        })
    }

    popUpNotice(type, code, content, action = [() => {
        this.setState({
            alertOpen: false,
        })
    }, () => {
        this.setState({
            alertOpen: false,
        })
    }]) {
        this.setState({
            alertType: type,
            alertCode: code,
            alertContent: content,
            alertOpen: true,
            alertAction: action
        });
    }

    toggleDrawer = (open) => () => {
        this.setState({
            showInfo: true,
            right: open,
        });
    };

    render() {
        return (
            <div style={{ paddingTop: 80, paddingLeft: 40, justifyContent: 'space-between' }}>
                <Paper style={Style.paper}>
                    <List subheader={<ListSubheader>{Lang[window.Lang].pages.com.enrolled.unenrolled}
                        <Button fab color="primary" aria-label="add" className={{ marginRight: 10 }}
                            onClick={() => {
                                this.setState({
                                    openNewStudentDialog: true
                                })

                            }}
                        >
                            <AddIcon />

                        </Button>
                    </ListSubheader>}>
                        {this.state.newStudents.map(student =>
                            <StudentCard
                                type={CARD_TYPE_ENROLL}
                                key={student.id}
                                name={student.name.toString()}
                                tel={student.mobile === undefined ? "" : student.mobile}
                                email={student.mail === undefined ? "" : student.mail}
                                level={Number(student.course_id)}
                                city={Number(student.area_id)}
                                action={[() => {
                                    this.state.selected = student;
                                    this.state.showInfo = true;
                                    this.toggleDrawer(true)()
                                }, () => {
                                    this.state.selectedStudentId = student.id;
                                    this.popUpNotice(ALERT, 0, "为" + student.name + "报名", [
                                        () => {
                                            this.erollStudent();
                                            this.closeNotice();
                                        }, () => {
                                            this.closeNotice();
                                        }]);
                                }]}>
                            </StudentCard>
                        )}
                    </List>
                </Paper>
                <Paper style={Style.paper}>
                    <List subheader={<ListSubheader>{Lang[window.Lang].pages.com.enrolled.unarrange}</ListSubheader>}>
                        {this.state.unarragedStudents.map(student =>
                            <StudentCard
                                type={CARD_TYPE_UNARRANGE}
                                key={student.id}
                                name={student.name.toString()}
                                tel={student.mobile === undefined ? "" : student.mobile}
                                email={student.mail === undefined ? "" : student.mail}
                                level={Number(student.course_id)}
                                city={Number(student.area_id)}
                                action={[() => {
                                    this.state.selectedStudentId = student.id;
                                    this.popUpNotice(ALERT, 0, "通过" + student.name + "课程安排？", [
                                        () => {
                                            this.enrolled();
                                            this.closeNotice();
                                        }, () => {
                                            this.closeNotice();
                                        }]);
                                }]}
                            >
                            </StudentCard>
                        )}
                    </List>
                </Paper>
                <Paper style={Style.paper}>
                    <List subheader={<ListSubheader>{Lang[window.Lang].pages.com.enrolled.arranged}</ListSubheader>}>
                        {this.state.arrangedStudents.map(student =>
                            <StudentCard
                                type={CARD_TYPE_ARRANGE}
                                key={student.id}
                                name={student.name.toString()}
                                tel={student.mobile === undefined ? "" : student.mobile}
                                email={student.mail === undefined ? "" : student.mail}
                                level={Number(student.course_id)}
                                city={Number(student.area_id)}
                                action={[
                                    () => {
                                        this.state.selectedStudentId = student.id;
                                        this.popUpNotice(ALERT, 0, "通过" + student.name + "课程安排？", [
                                            () => {
                                                this.agreeArrange();
                                                this.closeNotice();
                                            }, () => {
                                                this.closeNotice();
                                            }]);
                                    },
                                    () => {
                                        this.state.selectedStudentId = student.id;

                                        this.popUpNotice(ALERT, 0, "通过" + student.name + "课程安排？", [
                                            () => {
                                                this.refuseArrange();
                                                this.closeNotice();
                                            }, () => {
                                                this.closeNotice();
                                            }]);
                                    }]}>
                            </StudentCard>
                        )}
                    </List>
                </Paper>
                {this.state.showInfo === true ?
                    <Drawer
                        anchor="right"
                        open={this.state.right}
                        onRequestClose={this.toggleDrawer(false)}
                    >
                        <div
                            tabIndex={0}
                            role="button"
                        // onClick={this.toggleDrawer(false)}
                        // onKeyDown={this.toggleDrawer(false)}
                        >

                            <Paper style={{ margin: 10, width: 800, float: "left" }} elevation={4}>
                                <div>
                                    <Typography type="headline" component="h3">
                                        {Lang[window.Lang].pages.com.students.base_info}
                                    </Typography>
                                    <TextField
                                        id="student_name"
                                        label={Lang[window.Lang].pages.com.students.name}
                                        defaultValue={this.state.selected.name}
                                        fullWidth
                                    />
                                    <TextField
                                        id="tel"
                                        label={Lang[window.Lang].pages.com.students.tel}
                                        defaultValue={this.state.selected.tel}
                                        fullWidth
                                    />
                                    <TextField
                                        id="email"
                                        label={Lang[window.Lang].pages.com.students.email}
                                        defaultValue={this.state.selected.email}
                                        fullWidth
                                    />
                                    <TextField
                                        id="area_id"
                                        label={Lang[window.Lang].pages.com.students.city}
                                        defaultValue={this.state.selected.area_id.toString()}
                                        fullWidth
                                    />
                                    <TextField
                                        id="course_id"
                                        label={Lang[window.Lang].pages.com.students.level.title}
                                        defaultValue={this.state.selected.course_id.toString()}
                                        fullWidth
                                    />
                                </div>
                                <div>
                                    <Typography type="headline" component="h3">
                                        {Lang[window.Lang].pages.com.students.personal_info.title}
                                    </Typography>

                                    <TextField
                                        id="licence.code"
                                        label={Lang[window.Lang].pages.com.students.personal_info.licence_code[1]}
                                        defaultValue={this.state.selected.identity_card}
                                        fullWidth>
                                    </TextField>
                                    <TextField
                                        id="edu"
                                        label={Lang[window.Lang].pages.com.students.personal_info.edu}
                                        defaultValue={this.state.selected.education}
                                        fullWidth>
                                    </TextField>
                                    <TextField
                                        id="working_time"
                                        label={Lang[window.Lang].pages.com.students.personal_info.working_time}
                                        defaultValue={this.state.selected.work_years}
                                        fullWidth>
                                    </TextField>
                                    <TextField
                                        id="total_amount"
                                        label={Lang[window.Lang].pages.com.students.personal_info.total_amount}
                                        defaultValue={this.state.selected.total_amount}
                                        fullWidth>
                                    </TextField>
                                    <TextField
                                        id="soft_amount"
                                        label={Lang[window.Lang].pages.com.students.personal_info.soft_amount}
                                        defaultValue={this.state.selected.soft_amount}
                                        fullWidth>
                                    </TextField>
                                    <Button color="primary" style={{ margin: 10 }} onClick={
                                        (e) => {
                                            var cb = (route, message, arg) => {
                                                if (message.code === Code.LOGIC_SUCCESS) {
                                                    for (var i = 0; i < getCache(student).length; i++) {
                                                        if (getCache(DATA_TYPE_STUDENT)[i].id === arg.id) {
                                                            getCache(DATA_TYPE_STUDENT)[i][arg.key] = info;
                                                            break;
                                                        }
                                                    }
                                                }
                                            }
                                            var obj = {

                                            }
                                            getData(getRouter(UPDATE_STUDENT), { session: sessionStorage.session, id: id, student: obj }, cb, { self: this, data: obj });

                                        }
                                    }>
                                        {Lang[window.Lang].pages.main.certain_button}
                                    </Button>
                                </div>
                                {/* <div>
                                    <Typography type="headline" component="h3">
                                        {Lang[window.Lang].pages.com.students.proj_exp.title}
                                    </Typography>
                                    {
                                        this.state.selected.proj_exp.map(exp =>
                                            <div id={exp.id}>
                                                <Typography type="body1" component="p">
                                                    {exp.name}
                                                </Typography>
                                                <Typography type="body1" component="p">
                                                    {getTimeString(exp.time)}
                                                </Typography>
                                                <Typography type="body1" component="p">
                                                    {exp.actor}
                                                </Typography>
                                                <Typography type="body1" component="p">
                                                    {exp.total_amount}
                                                </Typography>
                                                <Typography type="body1" component="p">
                                                    {exp.soft_amount}
                                                </Typography>
                                                <Button color="primary" style={{ margin: 10 }}>
                                                    {Lang[window.Lang].pages.main.certain_button}
                                                </Button>
                                            </div>)
                                    }
                                    <div>
                                        <TextField
                                            id="proj_name"
                                            label={Lang[window.Lang].pages.com.students.proj_exp.name}
                                            defaultValue={this.state.selected.proj_exp.name}>
                                        </TextField>
                                        <TextField
                                            id="time"
                                            label={Lang[window.Lang].pages.com.students.proj_exp.time}
                                            defaultValue={this.state.selected.proj_exp.time}>
                                        </TextField>
                                        <TextField
                                            id="actor"
                                            label={Lang[window.Lang].pages.com.students.proj_exp.actor}
                                            defaultValue={this.state.selected.proj_exp.actor}>
                                        </TextField>
                                        <TextField
                                            id="exp_total_amount"
                                            label={Lang[window.Lang].pages.com.students.proj_exp.total_amount}
                                            defaultValue={this.state.selected.proj_exp.total_amount}>
                                        </TextField>
                                        <TextField
                                            id="exp_soft_amount"
                                            label={Lang[window.Lang].pages.com.students.proj_exp.soft_amount}
                                            defaultValue={this.state.selected.proj_exp.soft_amount}>
                                        </TextField>
                                    </div>
                                    <Button color="primary" style={{ margin: 10 }}>
                                        {Lang[window.Lang].pages.main.certain_button}
                                    </Button>
                                </div> */}
                            </Paper>


                        </div>
                    </Drawer> : <div />}
                {this.newStudentDialog()}
                <CommonAlert
                    show={this.state.alertOpen}
                    type={this.state.alertType}
                    code={this.state.alertCode}
                    content={this.state.alertContent}
                    action={this.state.alertAction}>
                </CommonAlert>
            </div>
        )
    }
}

export default Enrolled;