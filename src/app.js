const { 
    EC2Client, 
    StartInstancesCommand, 
    StopInstancesCommand 
    } = require('@aws-sdk/client-ec2');

exports.handler = async (event) => {
    const client = new EC2Client({ region: "sa-east-1" })
    const instanceId = event.instanceId; // The EC2 instance ID
    const action = event.action; // 'start' or 'stop'
    const stopCommand = new StopInstancesCommand({ InstanceIds: [instanceId] });
    const startCommand = new StartInstancesCommand({ InstanceIds: [instanceId] });

    try {
        if (action === 'start') {
            const data = await client.send(startCommand);
            console.log("Instance started successfully", data);
        } else if (action === 'stop') {
            const data = await client.send(stopCommand);
            console.log("Instance stopped successfully", data);
        } else {
            return 'Invalid action. Use "start" or "stop".';
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};