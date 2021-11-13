import { ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/* eslint-disable */
const ThemeWrapper = ({ children, theme }: any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

ThemeWrapper.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.any,
};

export default ThemeWrapper;
