import React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { useTheme } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

interface DialogI{
    title:string;
    content:JSX.Element;
    footer:JSX.Element;
}

export default function MyDialog({title, content, footer}:DialogI) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('md');
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('body');

  return (
    <Dialog
        fullScreen={fullScreen}
        open={true}
        scroll={scroll}
        fullWidth={true}
        maxWidth={maxWidth}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
    >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {content}
        </DialogContent>
        <DialogActions>
          {footer}
        </DialogActions>
    </Dialog>
    
  );
}
