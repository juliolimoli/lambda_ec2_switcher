const AWS = require('aws-sdk');
const ec2 = new AWS.EC2();

exports.handler = async (event) => {
    const instanceId = event.instanceId; // The EC2 instance ID
    const action = event.action; // 'start' or 'stop'

    const params = {
        InstanceIds: [instanceId],
    };

    try {
        if (action === 'start') {
            await ec2.startInstances(params).promise();
            return 'EC2 instance ${instanceId} started successfully.';
        } else if (action === 'stop') {
            await ec2.stopInstances(params).promise();
            return 'EC2 instance ${instanceId} stopped successfully.';
        } else {
            return 'Invalid action. Use "start" or "stop".';
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};