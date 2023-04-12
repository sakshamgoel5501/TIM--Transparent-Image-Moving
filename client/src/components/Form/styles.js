import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginTop: 10,
  },


  rootOnNext: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paperOnNext: {
    padding: theme.spacing(2),
  },
  formOnNext: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInputOnNext: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmitOnNext: {
    marginTop: 10,
  },
}));



