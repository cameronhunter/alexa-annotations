import annotation from '../annotation/method';

export default annotation(({ header = {} }) => header.namespace === 'Alexa.ConnectedHome.Discovery');
