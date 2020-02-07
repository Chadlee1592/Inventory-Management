import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16)
    }
  }
}));

const Papers = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedB: true
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <Fragment>
      <div className={classes.root}>
        {state.checkedB && (
          <Fragment>
            <Paper elevation={3}>
              {' '}
              <div>Overall</div>
            </Paper>
            <Paper elevation={3} />
            <Paper elevation={3} />
            <Paper elevation={3} />
          </Fragment>
        )}
      </div>
      <FormControlLabel
        control={
          <Switch
            className={classes.display}
            checked={state.checkedB}
            onChange={handleChange('checkedB')}
            value='checkedB'
            color='primary'
          />
        }
        label='Show / Hide'
      />
    </Fragment>
  );
};

export default Papers;
