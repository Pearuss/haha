// // import Button from '@material-ui/core/Button';
// // import CircularProgress from '@material-ui/core/CircularProgress';
// // import _ from 'lodash';

// /* eslint-disable react/jsx-props-no-spreading */
// const ButtonLoading = () => {
//   // const renderContent = () => {
//   //   if (props.isLoading) {
//   //     const loadingProps = props.loading;
//   //     const { messageLoading } = props;
//       return (
//         // <Button {..._.omit(props, ['isLoading', 'messageLoading', 'isSuccess'])} disabled>
//         //   <div className="flex items-center">
//         //     {messageLoading}
//         //     &nbsp;
//         //     <CircularProgress size={20} color="secondary" {...loadingProps} />
//         //   </div>
//         // </Button>
//         <p>s</p>
//       );
//     }

//     return (
//       <Button {..._.omit(props, ['isLoading', 'messageLoading', 'isSuccess'])}>
//         {props.children}
//       </Button>
//     );
//   };

//   return renderContent();
// };

// export default ButtonLoading;

import React, { ReactElement } from 'react';

function ButtonLoading(): ReactElement {
  return <div>s</div>;
}

export default ButtonLoading;
