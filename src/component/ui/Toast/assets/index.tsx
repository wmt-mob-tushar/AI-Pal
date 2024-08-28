/* eslint-disable */
const assets = {
  icons: {
    success: require('./icons/success.png'),
    error: require('./icons/error.png'),
    info: require('./icons/info.png'),
    close: require('./icons/close.png'),
  },
};

type IconsType = typeof assets.icons;
const icons: IconsType = assets.icons;

export {icons};
export default assets;
