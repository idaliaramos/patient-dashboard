// import React from 'react';
// import NavComponent from './NavComponent';
//
// export default function OrderPageLayout(prop) {
//   return (
//     <div>
//       <NavComponent />
//       <div className="row">
//         <div className="col s12 m7 l7">
//           {prop.children[0]}
//         </div>
//         <div className="col s12 m5 l5">
//           {prop.children[1]}
//           {prop.children[2]}
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";

export default function PageLayout(prop) {
  return (
    <div className="container">
      <div className="table">
        {" "}{prop.children[0]}
      </div>
      <div className="buttons-right">
        {prop.children[1]}
        {prop.children[2]}
      </div>
    </div>
  );
}
