import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AppContext from '../appContext';

const styles = theme => ({
  mainChat: {
    height: '85vh',
    minHeight: '400px',
    overflowX: 'scroll'
  },
  textMessage: {
    margin:'10px 30px'
  }
});

class MainChat extends React.Component {
  constructor() {
    super();
    this.bottomOfChat = React.createRef();
  }

  scrollToBottomOfChat = () => {
    this.bottomOfChat.current.scrollIntoView({ behavior: "instant" });
  }

  componentDidMount() {
    this.scrollToBottomOfChat();
  }

  componentDidUpdate() {
    this.scrollToBottomOfChat();
  }

  render() {
    const { classes } = this.props;
    return (
      <AppContext.Consumer>
        {({ messages }) => (
            <Paper className={classes.mainChat}>
              {
                messages.map((message, idx) =>
                  <Typography
                    key={idx}
                    gutterBottom
                    variant="subtitle2"
                    color="textPrimary"
                    align="left"
                    className={classes.textMessage}
                  >
                    {`${message.displayName}: ${message.text}`}
                  </Typography>
                )
              }
              <div style={{ float:"left", clear: "both" }}
                ref={this.bottomOfChat}>
              </div>
            </Paper>
        )}
      </AppContext.Consumer>
    )
  }
}


export default withStyles(styles)(MainChat);
