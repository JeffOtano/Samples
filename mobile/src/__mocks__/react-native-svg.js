// This file is required to properly mock react-native-svg in Jest.
import mockComponent from 'react-native/jest/mockComponent';

const Svg = mockComponent('react-native-svg/Svg');
const Circle = mockComponent('react-native-svg/Circle');
const Ellipse = mockComponent('react-native-svg/Ellipse');
const G = mockComponent('react-native-svg/G');
const Text = mockComponent('react-native-svg/Text');
const TextPath = mockComponent('react-native-svg/TextPath');
const TSpan = mockComponent('react-native-svg/TSpan');
const Path = mockComponent('react-native-svg/Path');
const Polygon = mockComponent('react-native-svg/Polygon');
const Polyline = mockComponent('react-native-svg/Polyline');
const Line = mockComponent('react-native-svg/Line');
const Rect = mockComponent('react-native-svg/Rect');
const Use = mockComponent('react-native-svg/Use');
const Image = mockComponent('react-native-svg/Image');
const Symbol = mockComponent('react-native-svg/Symbol');
const Defs = mockComponent('react-native-svg/Defs');
const LinearGradient = mockComponent('react-native-svg/LinearGradient');
const RadialGradient = mockComponent('react-native-svg/RadialGradient');
const Stop = mockComponent('react-native-svg/Stop');
const ClipPath = mockComponent('react-native-svg/ClipPath');
const Pattern = mockComponent('react-native-svg/Pattern');
const Mask = mockComponent('react-native-svg/Mask');

export {
  Svg,
  Circle,
  Ellipse,
  G,
  Text,
  TextPath,
  TSpan,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
};

export default Svg;
