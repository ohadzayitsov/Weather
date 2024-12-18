import sunny from '../../assets/sunny.png'
import cloudy from '../../assets/cloudy.png'
import rainy from '../../assets/rainy.png'
import rainbow from '../../assets/rainbow.png'

const icons = {
  sunny: (size = '1x') => (
    <img src={sunny} style={{width:size}} />
  ),
  cloudy: (size = "1x") => (
    <img src={cloudy} style={{width:size}} />
  ),
  rainy: (size = "1x") => (
    <img src={rainy} style={{width:size}} />
  ),
  rainbow: (size = "1x") => (
    <img src={rainbow} style={{width:size}} />
  ),
};

export default icons;
