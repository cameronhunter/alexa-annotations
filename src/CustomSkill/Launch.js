import annotation from '../annotation/method';

export default annotation(({ request = {} }) => request.type === 'LaunchRequest');
