import React, { Component } from 'react';
import List, {
    ListItem, ListItemSecondaryAction, ListItemText,
    ListSubheader,
} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Card, { CardHeader, CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Code from '../../code';
import Lang from '../../language';

import CommonAlert from '../../components/CommonAlert';

class Score extends Component {
    state = {
        clazzes: [],
        students: [],
        // 提示状态
        alertOpen: false,
        alertType: "notice",
        alertCode: Code.LOGIC_SUCCESS,
        alertContent: "登录成功"
    }

    componentDidMount() {
        window.currentPage = this;
        this.fresh()
    }

    fresh = () => {
    }


    popUpNotice = (type, code, content) => {
        this.setState({ type: type, code: code, content: content, alertOpen: true });
    }

    render() {
        return <div>
            <div style={{ margin: 10, width: 400, float: "left" }}>
                <List subheader={<ListSubheader>{Lang[window.Lang].pages.com.students.list_title}</ListSubheader>}>
                    {this.state.clazzes.map(clazz =>
                        <Card key={clazz.id} style={{ display: 'flex', }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <CardContent>
                                    <Typography type="body1">
                                    </Typography>
                                    <Typography type="body1" component="h2">
                                    </Typography>
                                    <Typography type="body1">
                                    </Typography>
                                    <Typography component="p">
                                    </Typography>
                                </CardContent>
                            </div>
                            <div>
                                {this.buttonActions()}
                            </div>
                        </Card>
                    )}
                </List>
            </div>
            <div style={{ margin: 10, width: 400, float: "left" }}>
                <List subheader={<ListSubheader>{Lang[window.Lang].pages.com.students.list_title}</ListSubheader>}>
                    {this.state.students.map(student =>
                        <Card key={student.id} style={{ display: 'flex', }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <CardContent>
                                    <Typography type="body1">
                                    </Typography>
                                    <Typography type="body1" component="h2">
                                    </Typography>
                                    <Typography type="body1">
                                    </Typography>
                                    <Typography component="p">
                                    </Typography>
                                    <TextField
                                        id="daily_score"
                                        label={Lang[window.Lang].pages.main.account}
                                        style={{
                                            marginLeft: 200,//styleManager.theme.spacing.unit,
                                            marginRight: 200,//theme.spacing.unit,  
                                            width: 200,
                                        }}
                                        defaultValue={Lang[window.Lang].pages.main.input_your_account}
                                    />
                                    <TextField
                                        id="exam_score"
                                        label={Lang[window.Lang].pages.main.account}
                                        style={{
                                            marginLeft: 200,//styleManager.theme.spacing.unit,
                                            marginRight: 200,//theme.spacing.unit,  
                                            width: 200,
                                        }}
                                        defaultValue={Lang[window.Lang].pages.main.input_your_account}
                                    />
                                    <TextField
                                        id="total_score"
                                        label={Lang[window.Lang].pages.main.account}
                                        style={{
                                            marginLeft: 200,//styleManager.theme.spacing.unit,
                                            marginRight: 200,//theme.spacing.unit,  
                                            width: 200,
                                        }}
                                        defaultValue={Lang[window.Lang].pages.main.input_your_account}
                                    />
                                </CardContent>
                            </div>
                            <div>
                                {this.buttonActions()}
                            </div>
                        </Card>
                    )}
                </List>
            </div>
            <CommonAlert
                show={this.state.alertOpen}
                type={this.state.alertType}
                code={this.state.alertCode}
                content={this.state.alertContent}
                action={this.state.alertAction}
            >
            </CommonAlert>
        </div>
    }

}

export default Score;