import { assets } from '../config';

import Root from '../../client/modules/Root';


const Html = (props) => (
  <html lang="en">
    <head>
      <title>Infernizer</title>
      <meta charset="utf-8" />

      <link href={assets.bundle.css} rel="stylesheet" />
    </head>
    <body>
      <div id="inferno">
        <Root />
      </div>

      <script src={assets.vendor.js} />
      <script src={assets.bundle.js} />
    </body>
  </html>
);

export default Html;
