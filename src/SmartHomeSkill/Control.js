import annotation from '../annotation/method';

const isControlRequest = (...names) => (event = {}) => {
    const { header = {} } = event;
    const { namespace, name } = header;
    return namespace === 'Alexa.ConnectedHome.Control' && (!names.length || names.indexOf(name) >= 0);
};

export const ControlRequest = (name) => annotation(
    isControlRequest(name),
    ({ payload = {} }) => [payload]
);

export default (...names) => annotation(
    isControlRequest(...names),
    ({ header = {}, payload = {} }) => [header.name, payload]
);
