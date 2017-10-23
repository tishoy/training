// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardHeader, CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import {
  CARD_TYPE_COMMON, CARD_TYPE_INFO, CARD_TYPE_ENROLL, CARD_TYPE_ARRANGE, CARD_TYPE_EXAM, CARD_TYPE_UNARRANGE,
  STATUS_AGREED_UNDO, STATUS_AGREED_AGREE, STATUS_AGREED_REFUSED
} from '../../enum';
import Lang from '../../language';

class ComCard extends Component {
  state = {
    type: "",
    status: 0,
    action: []
  }

  static propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tel: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    city: PropTypes.number.isRequired,
    action: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
  };

  static defaultProps = {
    action: [],
    status: ""
  }

  buttonActions() {
    switch (this.state.type) {
      case CARD_TYPE_COMMON:
        return this.getStatusDescribe();
      case CARD_TYPE_INFO:
        return <CardActions>
          <Button
            dense
            onClick={this.state.action[0]}>
            {Lang[window.Lang].pages.com.card.modify}
          </Button>
          <Button
            dense
            onClick={this.state.action[1]}>
            {Lang[window.Lang].pages.com.card.remove}
          </Button>
        </CardActions>
      case CARD_TYPE_ENROLL:
        return <CardActions>
          <Button
            dense
            onClick={this.state.action[0]}>
            {Lang[window.Lang].pages.com.card.modify}
          </Button>
          <Button
            dense
            onClick={this.state.action[1]}>
            {Lang[window.Lang].pages.com.card.enroll}
          </Button>
        </CardActions>
      case CARD_TYPE_ARRANGE:
        return <CardActions>
          {this.state.status === "" ?
            <div>
              <Button
                dense
                id={"left"}
                onClick={this.state.action[0]}>
                {Lang[window.Lang].pages.com.card.agree}
              </Button>
              <br />
              <Button
                dense
                id={"right"}
                onClick={this.state.action[1]}>
                {Lang[window.Lang].pages.com.card.refuse}
              </Button>
            </div> : Lang[window.Lang].pages.com.card.status[1]}
        </CardActions>
      case CARD_TYPE_EXAM:
        return <CardActions>
          <Button
            dense
            id={"left"}
            onClick={this.state.action[0]}>
            {Lang[window.Lang].pages.com.card.retry}
          </Button>
          <Button
            dense
            id={"right"}
            onClick={this.state.action[1]}>
            {Lang[window.Lang].pages.com.card.giveup}
          </Button>
        </CardActions>
      case CARD_TYPE_UNARRANGE:
        return (
          <CardActions>
            <Button
              dense
              onClick={this.state.action[0]}>
            </Button>
          </CardActions>
        )
      default:
        return this.getStatusDescribe();
    }
  }

  getStatusDescribe() {
    if (this.state.type === STATUS_ENROLLED) {
      if (this.state.status === STATUS_ENROLLED_REDO) {
        return <Typography type="body1">
          {"重新排队中"}
        </Typography>
      }
    }
    if (this.state.type === STATUS_AGREED) {
      if (this.state.status === STATUS_AGREED_AGREE) {
        return <Typography type="body1">
          {"已通过"}
        </Typography>
      }
    }
  }

  render() {
    const {
      type,
      name,
      tel,
      email,
      level,
      city,
      action,
      status
    } = this.props;

    this.state.type = type;
    this.state.status = status;
    this.state.action = action;

    return (
      <div>
        <Card style={{ display: 'flex', }}>
          <CardMedia
            style={{
              width: 151,
              height: 151,
            }}
            image="/images/live-from-space.jpg"
            title="Live from space album cover"
          />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <CardContent style={{ flex: '1 0 auto', }}>
              <Typography type="headline">
                {name}
              </Typography>
              <Typography component="p">
                {"联系电话:" + tel}
              </Typography>
              <Typography component="p">
                {"电子邮件:" + email}
              </Typography>
              <Typography component="p">
                {"客户等级:" + level}<br />
              </Typography>
              <Typography component="p">
                {"所在城市:" + city}
              </Typography>
            </CardContent>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: "px",
              paddingBottom: "px"
            }}>
              {this.buttonActions()}
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default ComCard;

